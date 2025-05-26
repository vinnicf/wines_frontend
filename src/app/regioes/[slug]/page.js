"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiService } from '@/lib/api';
import CountryFlag from '@/components/CountryFlag';
import { Button } from '@/components/ui/button';
import WineryCard from '@/components/WineryCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function RegionDetailPage({ params }) {
  const [region, setRegion] = useState(null);
  const [wineries, setWineries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegionDetails();
  }, [params.slug]);

  const loadRegionDetails = async () => {
    try {
      setLoading(true);
      const regionData = await apiService.getRegion(params.slug);
      setRegion(regionData);

      // The region detail endpoint should include wineries
      setWineries(regionData.wineries || []);
    } catch (error) {
      console.error('Erro ao carregar detalhes da região:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes da região...</p>
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Região não encontrada</h2>
          <Link href="/regioes">
            <Button>Voltar às Regiões</Button>
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
              <Link href="/vinicolas" className="text-gray-700 hover:text-purple-600 transition-colors">
                Vinícolas
              </Link>
              <Link href="/regioes" className="text-purple-600 font-semibold">
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
              <BreadcrumbLink href="/regioes">Regiões</BreadcrumbLink>
            </BreadcrumbItem>
            {region.country && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/paises/${region.country.slug}`}>
                    {region.country.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{region.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Region Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{region.name}</h1>
              
              {/* Country */}
              {region.country && (
                <div className="flex items-center text-lg mb-4">
                  <span className="mr-2">
                    <CountryFlag countryName={region.country.name} size="w-5 h-5" />
                  </span>
                  <Link href={`/paises/${region.country.slug}`} className="hover:underline">
                    {region.country.name}
                  </Link>
                </div>
              )}

              {/* Statistics */}
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center">
                  <span className="mr-2">🏭</span>
                  <span>{wineries.length} {wineries.length === 1 ? 'vinícola' : 'vinícolas'}</span>
                </div>
                {region.wineries_count && (
                  <div className="flex items-center">
                    <span className="mr-2">📊</span>
                    <span>{region.wineries_count} vinícolas totais</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="text-8xl mb-4">🗺️</div>
            </div>
          </div>
        </div>

        {/* Region Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Região</h2>
              {region.description ? (
                <div className="text-gray-600 leading-relaxed space-y-4">
                  {region.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Informações detalhadas sobre esta região não estão disponíveis no momento.
                </p>
              )}

              {/* Vivino Link */}
              {region.vivino_url && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a 
                    href={region.vivino_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Ver no Vivino
                    <span className="ml-1">↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            {/* Country Details */}
            {region.country && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">País</h3>
                <Link href={`/paises/${region.country.slug}`} className="block text-blue-600 hover:text-blue-800">
                  <div className="flex items-center">
                    <span className="mr-2">
                      <CountryFlag countryName={region.country.name} size="w-5 h-5" />
                    </span>
                    <span className="font-medium">{region.country.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {region.country.regions_count} regiões vinícolas
                  </p>
                </Link>
              </div>
            )}

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vinícolas:</span>
                  <span className="font-semibold">{wineries.length}</span>
                </div>
                {region.wines_count && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vinhos:</span>
                    <span className="font-semibold">{region.wines_count}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wineries Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Vinícolas da {region.name}
            </h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {wineries.length} {wineries.length === 1 ? 'vinícola' : 'vinícolas'}
            </span>
          </div>

          {wineries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wineries.map((winery) => (
                <WineryCard key={winery.slug} winery={winery} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏭</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhuma vinícola disponível
              </h3>
              <p className="text-gray-600">
                Esta região ainda não possui vinícolas cadastradas em nossa base de dados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 