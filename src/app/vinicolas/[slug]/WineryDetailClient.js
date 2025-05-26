"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiService } from '@/lib/api';
import CountryFlag from '@/components/CountryFlag';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function WineryDetailClient({ params }) {
  const [winery, setWinery] = useState(null);
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWineryDetails();
  }, [params.slug]);

  const loadWineryDetails = async () => {
    try {
      setLoading(true);
      const wineryData = await apiService.getWinery(params.slug);
      setWinery(wineryData);

      // The winery detail endpoint includes wines directly
      setWines(wineryData.wines || []);
    } catch (error) {
      console.error('Erro ao carregar detalhes da vinícola:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes da vinícola...</p>
        </div>
      </div>
    );
  }

  if (!winery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🏭</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Vinícola não encontrada</h2>
          <Link href="/vinicolas">
            <Button>Voltar às Vinícolas</Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/vinhos" className="text-gray-700 hover:text-purple-600 transition-colors">
                Vinhos
              </Link>
              <Link href="/vinicolas" className="text-purple-600 font-semibold">
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
            <BreadcrumbItem>
              <BreadcrumbLink href="/vinicolas">Vinícolas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{winery.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Winery Header */}
        <div className="bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{winery.name}</h1>
              
              {/* Location */}
              {winery.region && (
                <div className="flex items-center text-lg mb-4">
                  <span className="mr-2">📍</span>
                  <span>
                    <Link href={`/regioes/${winery.region.slug}`} className="hover:underline">
                      {winery.region.name}
                    </Link>
                    {winery.region.country && (
                      <>
                        {', '}
                        <Link href={`/paises/${winery.region.country.slug}`} className="hover:underline">
                          {winery.region.country.name}
                        </Link>
                      </>
                    )}
                  </span>
                </div>
              )}

              {/* Established Year */}
              {winery.established_year && (
                <div className="flex items-center text-lg mb-4">
                  <span className="mr-2">📅</span>
                  <span>Fundada em {winery.established_year}</span>
                </div>
              )}

              {/* Wine Count */}
              <div className="flex items-center text-lg">
                <span className="mr-2">🍷</span>
                <span>{wines.length} {wines.length === 1 ? 'vinho disponível' : 'vinhos disponíveis'}</span>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="text-8xl mb-4">🏭</div>
            </div>
          </div>
        </div>

        {/* Winery Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Vinícola</h2>
              {winery.description ? (
                <div className="text-gray-600 leading-relaxed space-y-4">
                  {winery.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Informações detalhadas sobre esta vinícola não estão disponíveis no momento.
                </p>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            {/* Location Details */}
            {winery.region && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Localização</h3>
                <div className="space-y-3">
                  <Link href={`/regioes/${winery.region.slug}`} className="block text-blue-600 hover:text-blue-800">
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>{winery.region.name}</span>
                    </div>
                  </Link>
                  {winery.region.country && (
                    <Link href={`/paises/${winery.region.country.slug}`} className="block text-blue-600 hover:text-blue-800">
                      <div className="flex items-center">
                        <span className="mr-2">
                          <CountryFlag countryName={winery.region.country.name} size="w-4 h-4" />
                        </span>
                        <span>{winery.region.country.name}</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de Vinhos:</span>
                  <span className="font-semibold">{wines.length}</span>
                </div>
                {winery.established_year && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Anos de Tradição:</span>
                    <span className="font-semibold">{new Date().getFullYear() - winery.established_year}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wines Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Vinhos da {winery.name}
            </h2>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {wines.length} {wines.length === 1 ? 'vinho' : 'vinhos'}
            </span>
          </div>

          {wines.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wines.map((wine) => (
                <WineCard key={wine.slug} wine={wine} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🍷</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhum vinho disponível
              </h3>
              <p className="text-gray-600">
                Esta vinícola ainda não possui vinhos cadastrados em nossa base de dados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
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