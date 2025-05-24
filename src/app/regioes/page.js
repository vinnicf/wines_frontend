"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
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

export default function RegioesPage() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadRegions();
  }, [searchTerm, sortBy]);

  const loadRegions = async () => {
    try {
      setLoading(true);
      const params = {
        ordering: sortBy,
        ...(searchTerm && { search: searchTerm }),
      };
      const data = await apiService.getRegions(params);
      setRegions(data.results || data);
    } catch (error) {
      console.error('Erro ao carregar regiões:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadWines();
  };

  // Group regions by country
  const regionsByCountry = regions.reduce((acc, region) => {
    const countryName = region.country?.name || 'Outros';
    if (!acc[countryName]) {
      acc[countryName] = [];
    }
    acc[countryName].push(region);
    return acc;
  }, {});

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
              <BreadcrumbPage>Regiões</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Regiões Vinícolas
          </h1>
          <p className="text-lg text-gray-600">
            Explore as famosas regiões produtoras de vinho ao redor do mundo
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Regiões
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome da região, país..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="name">Nome A-Z</option>
                  <option value="-name">Nome Z-A</option>
                  <option value="country__name">País A-Z</option>
                  <option value="-country__name">País Z-A</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando regiões...</p>
          </div>
        )}

        {/* Regions grouped by country */}
        {!loading && (
          <div className="space-y-8">
            {Object.entries(regionsByCountry).map(([countryName, countryRegions]) => (
              <div key={countryName} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="mr-3">🌍</span>
                    {countryName}
                    <span className="ml-3 bg-white/20 px-3 py-1 rounded-full text-sm">
                      {countryRegions.length} {countryRegions.length === 1 ? 'região' : 'regiões'}
                    </span>
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {countryRegions.map((region) => (
                      <RegionCard key={region.slug} region={region} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && regions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma região encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros de busca
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSortBy('name');
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function RegionCard({ region }) {
  return (
    <Link href={`/regioes/${region.slug}`}>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-purple-300 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {region.name}
          </h3>
          <span className="text-2xl">📍</span>
        </div>

        {/* Description */}
        {region.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {region.description}
          </p>
        )}

        {/* Statistics */}
        <div className="space-y-2">
          {region.winery_count !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Vinícolas:</span>
              <span className="font-medium text-purple-600">
                {region.winery_count}
              </span>
            </div>
          )}
          
          {region.wine_count !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Vinhos:</span>
              <span className="font-medium text-purple-600">
                {region.wine_count}
              </span>
            </div>
          )}
        </div>

        {/* Action indicator */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600 font-medium">
              Explorar região
            </span>
            <span className="text-purple-600 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 