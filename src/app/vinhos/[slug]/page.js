import Link from 'next/link';
import Image from 'next/image';
import { apiService } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import WineDetailClient from './WineDetailClient';

export async function generateMetadata({ params }) {
  try {
    const wine = await apiService.getWine(params.slug);
      
    const title = `Vinho ${wine.name} - ${wine.winery?.name || 'Vinho'} | ${wine.wine_type}`;
    const description = wine.description 
      ? wine.description.slice(0, 160) + (wine.description.length > 160 ? '...' : '')
      : `${wine.name} é um ${wine.wine_type.toLowerCase()} ${wine.winery?.name ? `da vinícola ${wine.winery.name}` : ''} ${wine.winery?.region ? `da região de ${wine.winery.region.name}` : ''}. ${wine.rating ? `Avaliação: ${wine.rating}/5.` : ''} ${wine.price ? `Preço: R$ ${wine.price}.` : ''}`;

    const imageUrl = wine.vivino_id ? apiService.getWineImageUrl(wine.vivino_id) : null;
    
    const keywords = [
      wine.name,
      wine.wine_type,
      wine.winery?.name,
      wine.winery?.region?.name,
      wine.winery?.region?.country?.name,
      ...(wine.grapes || []).map(grape => grape.name),
      'vinho', 'wine'
    ].filter(Boolean);

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `/vinhos/${params.slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `/vinhos/${params.slug}`,
        images: imageUrl ? [
          {
            url: imageUrl,
            width: 400,
            height: 600,
            alt: wine.name,
          }
        ] : [
          {
            url: '/wine-placeholder.jpg',
            width: 400,
            height: 600,
            alt: wine.name,
          }
        ],
        siteName: 'VinhoApp',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: imageUrl ? [imageUrl] : ['/wine-placeholder.jpg'],
      },
      other: {
        'product:price:amount': wine.price || undefined,
        'product:price:currency': wine.price ? 'BRL' : undefined,
        'product:availability': 'in stock',
        'product:category': wine.wine_type,
        'product:brand': wine.winery?.name || undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for wine:', error);
    return {
      title: 'Vinho não encontrado',
      description: 'O vinho solicitado não foi encontrado.',
    };
  }
}

// JSON-LD structured data
function generateWineJsonLd(wine) {
  if (!wine) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: wine.name,
    description: wine.description || `${wine.name} é um ${wine.wine_type.toLowerCase()}`,
    image: wine.vivino_id ? apiService.getWineImageUrl(wine.vivino_id) : undefined,
    brand: wine.winery ? {
      '@type': 'Brand',
      name: wine.winery.name,
    } : undefined,
    manufacturer: wine.winery ? {
      '@type': 'Organization',
      name: wine.winery.name,
      address: wine.winery.region ? {
        '@type': 'PostalAddress',
        addressRegion: wine.winery.region.name,
        addressCountry: wine.winery.region.country?.name,
      } : undefined,
    } : undefined,
    offers: wine.price ? {
      '@type': 'Offer',
      price: wine.price,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
    } : undefined,
    aggregateRating: wine.rating ? {
      '@type': 'AggregateRating',
      ratingValue: wine.rating,
      ratingCount: 1,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Tipo de Vinho',
        value: wine.wine_type,
      },
      wine.alcohol_content ? {
        '@type': 'PropertyValue',
        name: 'Teor Alcoólico',
        value: `${wine.alcohol_content}%`,
      } : null,
      wine.vintage ? {
        '@type': 'PropertyValue',
        name: 'Safra',
        value: wine.vintage,
      } : null,
      wine.volume ? {
        '@type': 'PropertyValue',
        name: 'Volume',
        value: `${wine.volume}ml`,
      } : null,
    ].filter(Boolean),
  };
}

export default async function WineDetailPage({ params }) {
  let wine = null;
  try {
    wine = await apiService.getWine(params.slug);
  } catch (error) {
    console.error('Error loading wine for JSON-LD:', error);
  }

  return (
    <>
      {wine && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWineJsonLd(wine)),
          }}
        />
      )}
      <WineDetailClient params={params} />
    </>
  );
} 