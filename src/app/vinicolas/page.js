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

export default function VinicolasPage() {
  const [wineries, setWineries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadWineries();
  }, [searchTerm, sortBy]);

  const loadWineries = async () => {
    try {
      setLoading(true);
      const params = {
        ordering: sortBy,
        ...(searchTerm && { search: searchTerm }),
      };
      const data = await apiService.getWineries(params);
      setWineries(data.results || data);
    } catch (error) {
      console.error('Erro ao carregar vinícolas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadWineries();
  };

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
              <BreadcrumbPage>Vinícolas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vinícolas do Mundo
          </h1>
          <p className="text-lg text-gray-600">
            Conheça as melhores vinícolas e suas tradições vinícolas
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Vinícolas
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome da vinícola, região..."
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
                  <option value="-wine_count">Mais Vinhos</option>
                  <option value="wine_count">Menos Vinhos</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando vinícolas...</p>
          </div>
        )}

        {/* Wineries Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wineries.map((winery) => (
              <WineryCard key={winery.slug} winery={winery} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && wineries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma vinícola encontrada
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

function WineryCard({ winery }) {
  return (
    <Link href={`/vinicolas/${winery.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header with location */}
        <div className="bg-gradient-to-r from-red-500 to-purple-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {winery.region?.country?.name || 'País'}
            </span>
            <span className="text-2xl">🏭</span>
          </div>
        </div>

        {/* Winery Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {winery.name}
          </h3>

          {/* Region Information */}
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <span className="mr-1">📍</span>
            {winery.region && (
              <span>
                {winery.region.name}
                {winery.region.country && `, ${winery.region.country.name}`}
              </span>
            )}
          </div>

          {/* Description */}
          {winery.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {winery.description}
            </p>
          )}

          {/* Wine Count */}
          {winery.wines_count !== undefined && (
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Vinhos disponíveis:</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                {winery.wines_count} {winery.wines_count === 1 ? 'vinho' : 'vinhos'}
              </span>
            </div>
          )}

          {/* Additional Information */}
          {winery.established_year && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="mr-1">📅</span>
              <span>Fundada em {winery.established_year}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-600 font-medium">
                Ver detalhes
              </span>
              <span className="text-purple-600">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 