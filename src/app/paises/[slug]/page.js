"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

export default function CountryDetailPage({ params }) {
  const [country, setCountry] = useState(null);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountryDetails();
  }, [params.slug]);

  const loadCountryDetails = async () => {
    try {
      setLoading(true);
      const countryData = await apiService.getCountry(params.slug);
      setCountry(countryData);

      // The country detail endpoint should include regions
      setRegions(countryData.regions || []);
    } catch (error) {
      console.error('Erro ao carregar detalhes do país:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes do país...</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🌍</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">País não encontrado</h2>
          <Link href="/paises">
            <Button>Voltar aos Países</Button>
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
              <Link href="/regioes" className="text-gray-700 hover:text-purple-600 transition-colors">
                Regiões
              </Link>
              <Link href="/paises" className="text-purple-600 font-semibold">
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
              <BreadcrumbLink href="/paises">Países</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{country.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Country Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{country.name}</h1>
              
              {/* Statistics */}
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center">
                  <span className="mr-2">🗺️</span>
                  <span>{regions.length} {regions.length === 1 ? 'região vinícola' : 'regiões vinícolas'}</span>
                </div>
                {country.regions_count && (
                  <div className="flex items-center">
                    <span className="mr-2">📊</span>
                    <span>{country.regions_count} regiões totais</span>
                  </div>
                )}
                {country.wineries_count && (
                  <div className="flex items-center">
                    <span className="mr-2">🏭</span>
                    <span>{country.wineries_count} vinícolas</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="mb-4">
                <CountryFlag countryName={country.name} size="w-20 h-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Country Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o {country.name}</h2>
              {country.description ? (
                <div className="text-gray-600 leading-relaxed space-y-4">
                  {country.description.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 leading-relaxed space-y-4">
                  <p>
                    O {country.name} é um país reconhecido por sua tradição vinícola, 
                    com {regions.length} {regions.length === 1 ? 'região' : 'regiões'} vinícolas 
                    {country.wineries_count && ` e ${country.wineries_count} vinícolas`} 
                    que produzem vinhos de qualidade excepcional.
                  </p>
                  <p>
                    Explore as diferentes regiões vinícolas do {country.name} para descobrir 
                    a diversidade de terroirs, estilos de vinho e tradições que fazem deste 
                    país um destino imperdível para os amantes do vinho.
                  </p>
                </div>
              )}

              {/* Vivino Link */}
              {country.vivino_url && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a 
                    href={country.vivino_url} 
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
            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Regiões Vinícolas:</span>
                  <span className="font-semibold">{regions.length}</span>
                </div>
                {country.wineries_count && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vinícolas:</span>
                    <span className="font-semibold">{country.wineries_count}</span>
                  </div>
                )}
                {country.wines_count && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vinhos:</span>
                    <span className="font-semibold">{country.wines_count}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Wine Regions Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Principais Regiões</h3>
              <div className="space-y-2">
                {regions.slice(0, 5).map((region, index) => (
                  <Link 
                    key={region.slug} 
                    href={`/regioes/${region.slug}`}
                    className="block text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {index + 1}. {region.name}
                  </Link>
                ))}
                {regions.length > 5 && (
                  <p className="text-xs text-gray-500 mt-2">
                    +{regions.length - 5} outras regiões
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Regions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Regiões Vinícolas do {country.name}
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {regions.length} {regions.length === 1 ? 'região' : 'regiões'}
            </span>
          </div>

          {regions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regions.map((region) => (
                <RegionCard key={region.slug} region={region} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nenhuma região disponível
              </h3>
              <p className="text-gray-600">
                Este país ainda não possui regiões vinícolas cadastradas em nossa base de dados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RegionCard({ region }) {
  return (
    <Link href={`/regioes/${region.slug}`}>
      <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 border border-gray-200 hover:border-blue-300">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {region.name}
          </h3>
          <span className="text-2xl">🗺️</span>
        </div>

        {/* Description */}
        {region.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {region.description}
          </p>
        )}

        {/* Statistics */}
        <div className="space-y-2 mb-3">
          {region.wineries_count !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Vinícolas:</span>
              <span className="font-medium text-blue-600">
                {region.wineries_count}
              </span>
            </div>
          )}
          
          {region.wines_count !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Vinhos:</span>
              <span className="font-medium text-blue-600">
                {region.wines_count}
              </span>
            </div>
          )}
        </div>

        {/* Action indicator */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-600 font-medium">
              Explorar região
            </span>
            <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 