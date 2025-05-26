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

export default function PaisesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadCountries();
  }, [searchTerm, sortBy]);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const params = {
        ordering: sortBy,
        ...(searchTerm && { search: searchTerm }),
      };
      const data = await apiService.getCountries(params);
      setCountries(data.results || data);
    } catch (error) {
      console.error('Erro ao carregar países:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadCountries();
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
              <BreadcrumbPage>Países</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Países Produtores de Vinho
          </h1>
          <p className="text-lg text-gray-600">
            Descubra os países que produzem os melhores vinhos do mundo
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Países
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome do país..."
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
                  <option value="-regions_count">Mais Regiões</option>
                  <option value="regions_count">Menos Regiões</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando países...</p>
          </div>
        )}

        {/* Countries Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {countries.map((country) => (
              <CountryCard key={country.slug} country={country} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && countries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum país encontrado
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

function CountryCard({ country }) {
  return (
    <Link href={`/paises/${country.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {country.name}
            </h3>
            <CountryFlag countryName={country.name} size="w-8 h-8" />
          </div>
        </div>

        {/* Country Details */}
        <div className="p-6">
          {/* Statistics */}
          <div className="space-y-3 mb-4">
            {country.regions_count !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center">
                  <span className="mr-2">🗺️</span>
                  Regiões vinícolas:
                </span>
                <span className="font-semibold text-blue-600">
                  {country.regions_count}
                </span>
              </div>
            )}

            {country.wineries_count !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center">
                  <span className="mr-2">🏭</span>
                  Vinícolas:
                </span>
                <span className="font-semibold text-blue-600">
                  {country.wineries_count}
                </span>
              </div>
            )}

            {country.wines_count !== undefined && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center">
                  <span className="mr-2">🍷</span>
                  Vinhos:
                </span>
                <span className="font-semibold text-blue-600">
                  {country.wines_count}
                </span>
              </div>
            )}
          </div>

          {/* Vivino Link */}
          {country.vivino_url && (
            <div className="mb-4">
              <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                <span className="mr-1">🔗</span>
                Disponível no Vivino
              </span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600 font-medium group-hover:text-blue-800">
                Explorar país
              </span>
              <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 