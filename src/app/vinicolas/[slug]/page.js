import { apiService } from '@/lib/api';
import WineryDetailClient from './WineryDetailClient';

export async function generateMetadata({ params }) {
  try {
    const winery = await apiService.getWinery(params.slug);
    
    const title = `${winery.name} - Vinícola ${winery.region?.name ? `em ${winery.region.name}` : ''}`;
    const description = winery.description 
      ? winery.description.slice(0, 160) + (winery.description.length > 160 ? '...' : '')
      : `${winery.name} é uma vinícola ${winery.region?.name ? `localizada em ${winery.region.name}` : ''} ${winery.region?.country?.name ? `, ${winery.region.country.name}` : ''}. ${winery.established_year ? `Fundada em ${winery.established_year}.` : ''} ${winery.wines?.length ? `Produz ${winery.wines.length} ${winery.wines.length === 1 ? 'vinho' : 'vinhos'}.` : ''}`;

    const keywords = [
      winery.name,
      'vinícola',
      'winery',
      winery.region?.name,
      winery.region?.country?.name,
      ...(winery.wines || []).map(wine => wine.name),
      'vinho', 'wine'
    ].filter(Boolean);

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `/vinicolas/${params.slug}`,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `/vinicolas/${params.slug}`,
        images: [
          {
            url: '/winery-placeholder.jpg',
            width: 1200,
            height: 630,
            alt: winery.name,
          }
        ],
        siteName: 'VinhoApp',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/winery-placeholder.jpg'],
      },
      other: {
        'place:location:latitude': winery.latitude || undefined,
        'place:location:longitude': winery.longitude || undefined,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for winery:', error);
    return {
      title: 'Vinícola não encontrada',
      description: 'A vinícola solicitada não foi encontrada.',
    };
  }
}

// JSON-LD structured data
function generateWineryJsonLd(winery) {
  if (!winery) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Winery',
    name: winery.name,
    description: winery.description || `${winery.name} é uma vinícola`,
    foundingDate: winery.established_year || undefined,
    address: winery.region ? {
      '@type': 'PostalAddress',
      addressRegion: winery.region.name,
      addressCountry: winery.region.country?.name,
    } : undefined,
    geo: (winery.latitude && winery.longitude) ? {
      '@type': 'GeoCoordinates',
      latitude: winery.latitude,
      longitude: winery.longitude,
    } : undefined,
    hasOfferCatalog: winery.wines && winery.wines.length > 0 ? {
      '@type': 'OfferCatalog',
      name: 'Vinhos',
      numberOfItems: winery.wines.length,
      itemListElement: winery.wines.map((wine, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: wine.name,
        description: wine.description || `${wine.name} é um ${wine.wine_type.toLowerCase()}`,
        category: wine.wine_type,
        brand: {
          '@type': 'Brand',
          name: winery.name,
        },
        offers: wine.price ? {
          '@type': 'Offer',
          price: wine.price,
          priceCurrency: 'BRL',
        } : undefined,
        aggregateRating: wine.rating ? {
          '@type': 'AggregateRating',
          ratingValue: wine.rating,
          bestRating: 5,
          worstRating: 1,
        } : undefined,
      })),
    } : undefined,
  };
}

export default async function WineryDetailPage({ params }) {
  let winery = null;
  try {
    winery = await apiService.getWinery(params.slug);
  } catch (error) {
    console.error('Error loading winery for JSON-LD:', error);
  }

  return (
    <>
      {winery && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWineryJsonLd(winery)),
          }}
        />
      )}
      <WineryDetailClient params={params} />
    </>
  );
}

function WineCard({ wine }) {
  const imageUrl = apiService.getWineImageUrl(wine.vivino_id);
  
  return (
    <Link href={`/vinhos/${wine.slug}`}>
      <div className="bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300 overflow-hidden">
        {/* Wine Image */}
        <div className="relative h-48 bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={wine.name}
              width={80}
              height={120}
              className="object-contain max-h-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-300" style={{display: imageUrl ? 'none' : 'flex'}}>
            🍷
          </div>
        </div>

        {/* Wine Details */}
        <div className="p-4">
          <h4 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {wine.name}
          </h4>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-600 font-medium">
              {wine.wine_type}
            </span>
            {wine.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="text-sm font-medium">{wine.rating}</span>
              </div>
            )}
          </div>

          {wine.price && (
            <p className="text-lg font-bold text-green-600">
              R$ {wine.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
} 