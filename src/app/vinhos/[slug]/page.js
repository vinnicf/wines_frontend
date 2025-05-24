"use client";

import { useState, useEffect } from 'react';
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

export default function WineDetailPage({ params }) {
  const [wine, setWine] = useState(null);
  const [relatedWines, setRelatedWines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWineDetails();
  }, [params.slug]);

  const loadWineDetails = async () => {
    try {
      setLoading(true);
      const wineData = await apiService.getWine(params.slug);
      setWine(wineData);

      // Load related wines from the same winery
      if (wineData.winery?.slug) {
        const relatedData = await apiService.getWinesByWinery(wineData.winery.slug, {
          limit: 4,
        });
        setRelatedWines((relatedData.results || relatedData).filter(w => w.slug !== params.slug));
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes do vinho:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes do vinho...</p>
        </div>
      </div>
    );
  }

  if (!wine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🍷</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Vinho não encontrado</h2>
          <Link href="/vinhos">
            <Button>Voltar aos Vinhos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = apiService.getWineImageUrl(wine.vivino_id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-purple-800">
              🍷 VinhoApp
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/vinhos" className="text-purple-600 font-semibold">
                Vinhos
              </Link>
              <Link href="/vinicolas" className="text-gray-700 hover:text-purple-600 transition-colors">
                Vinícolas
              </Link>
              <Link href="/regioes" className="text-gray-700 hover:text-purple-600 transition-colors">
                Regiões
              </Link>
              <Link href="/paises" className="text-gray-700 hover:text-purple-600 transition-colors">
                Países
              </Link>
              <Link href="/uvas" className="text-gray-700 hover:text-purple-600 transition-colors">
                Uvas
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {wine.breadcrumbs && wine.breadcrumbs.map((crumb, index) => (
              <div key={crumb.slug} className="flex items-center">
                <BreadcrumbItem>
                  {index === wine.breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/${crumb.type === 'country' ? 'paises' : crumb.type === 'region' ? 'regioes' : crumb.type === 'winery' ? 'vinicolas' : 'vinhos'}/${crumb.slug}`}>
                      {crumb.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < wine.breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
            {(!wine.breadcrumbs || wine.breadcrumbs.length === 0) && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/vinhos">Vinhos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{wine.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Wine Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Wine Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-96 rounded-lg flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={wine.name}
                    width={200}
                    height={320}
                    className="object-contain max-h-full max-w-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center text-8xl text-gray-300" style={{display: imageUrl ? 'none' : 'flex'}}>
                  🍷
                </div>
              </div>
            </div>

            {/* Wine Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {wine.name}
                </h1>
                {wine.winery && (
                  <Link href={`/vinicolas/${wine.winery.slug}`} className="text-xl text-purple-600 hover:text-purple-800 font-semibold">
                    {wine.winery.name}
                  </Link>
                )}
              </div>

              {/* Rating and Type */}
              <div className="flex items-center space-x-4">
                {wine.rating && (
                  <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                    <span className="text-yellow-500 mr-2 text-xl">⭐</span>
                    <span className="text-lg font-bold">{wine.rating}</span>
                    <span className="text-sm text-gray-600 ml-1">/5</span>
                  </div>
                )}
                <span className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg font-medium">
                  {wine.wine_type}
                </span>
              </div>

              {/* Price */}
              {wine.price && (
                <div className="text-3xl font-bold text-green-600">
                  R$ {wine.price}
                </div>
              )}

              {/* Location */}
              {wine.winery?.region && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">Localização</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/regioes/${wine.winery.region.slug}`} className="text-blue-600 hover:text-blue-800">
                      📍 {wine.winery.region.name}
                    </Link>
                    {wine.winery.region.country && (
                      <Link href={`/paises/${wine.winery.region.country.slug}`} className="text-blue-600 hover:text-blue-800">
                        🌍 {wine.winery.region.country.name}
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Grapes */}
              {wine.grapes && wine.grapes.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">Uvas</h3>
                  <div className="flex flex-wrap gap-2">
                    {wine.grapes.map((grape) => (
                      <Link 
                        key={grape.slug} 
                        href={`/uvas/${grape.slug}`}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
                      >
                        🍇 {grape.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-4 pt-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Adicionar à Lista de Desejos
                </Button>
                <Button variant="outline">
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Wine Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalhes Técnicos</h2>
            <div className="space-y-3">
              {wine.alcohol_content && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Teor Alcoólico:</span>
                  <span className="font-semibold">{wine.alcohol_content}%</span>
                </div>
              )}
              {wine.vintage && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Safra:</span>
                  <span className="font-semibold">{wine.vintage}</span>
                </div>
              )}
              {wine.volume && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Volume:</span>
                  <span className="font-semibold">{wine.volume}ml</span>
                </div>
              )}
              {wine.serving_temperature && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Temperatura de Serviço:</span>
                  <span className="font-semibold">{wine.serving_temperature}°C</span>
                </div>
              )}
            </div>
          </div>

          {/* Winery Information */}
          {wine.winery && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Vinícola</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-purple-600">
                  {wine.winery.name}
                </h3>
                {wine.winery.description && (
                  <p className="text-gray-600 text-sm">{wine.winery.description}</p>
                )}
                <Link href={`/vinicolas/${wine.winery.slug}`}>
                  <Button variant="outline" size="sm">
                    Ver todos os vinhos desta vinícola
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Wine Description */}
        {wine.description && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição</h2>
            <p className="text-gray-600 leading-relaxed">{wine.description}</p>
          </div>
        )}

        {/* Related Wines */}
        {relatedWines.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Outros vinhos desta vinícola</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedWines.map((relatedWine) => (
                <RelatedWineCard key={relatedWine.slug} wine={relatedWine} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RelatedWineCard({ wine }) {
  const imageUrl = apiService.getWineImageUrl(wine.vivino_id);
  
  return (
    <Link href={`/vinhos/${wine.slug}`}>
      <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
        <div className="relative h-32 bg-gradient-to-br from-purple-50 to-red-50 rounded-md flex items-center justify-center mb-3">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={wine.name}
              width={60}
              height={80}
              className="object-contain max-h-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-3xl text-gray-300" style={{display: imageUrl ? 'none' : 'flex'}}>
            🍷
          </div>
        </div>
        <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
          {wine.name}
        </h4>
        <p className="text-xs text-gray-600">{wine.wine_type}</p>
        {wine.rating && (
          <div className="flex items-center mt-1">
            <span className="text-yellow-500 text-xs mr-1">⭐</span>
            <span className="text-xs font-medium">{wine.rating}</span>
          </div>
        )}
      </div>
    </Link>
  );
} 