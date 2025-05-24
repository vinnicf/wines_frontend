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

export default function VinhosPage() {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('-rating');

  const wineTypes = [
    'Vinho Tinto',
    'Vinho Branco',
    'Vinho Rosé',
    'Champagne',
    'Vinho Espumante',
    'Vinho Doce',
    'Vinho Fortificado'
  ];

  useEffect(() => {
    loadWines();
  }, [searchTerm, selectedType, sortBy]);

  const loadWines = async () => {
    try {
      setLoading(true);
      const params = {
        ordering: sortBy,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType && { wine_type: selectedType }),
      };
      const data = await apiService.getWines(params);
      setWines(data.results || data);
    } catch (error) {
      console.error('Erro ao carregar vinhos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadWines();
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
            <BreadcrumbItem>
              <BreadcrumbPage>Vinhos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Nossos Vinhos
          </h1>
          <p className="text-lg text-gray-600">
            Descubra uma seleção cuidadosa de vinhos de todo o mundo
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Vinhos
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome do vinho, vinícola..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Wine Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Vinho
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Todos os tipos</option>
                  {wineTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
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
                  <option value="-rating">Maior Avaliação</option>
                  <option value="rating">Menor Avaliação</option>
                  <option value="name">Nome A-Z</option>
                  <option value="-name">Nome Z-A</option>
                  <option value="-price">Maior Preço</option>
                  <option value="price">Menor Preço</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando vinhos...</p>
          </div>
        )}

        {/* Wine Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wines.map((wine) => (
              <WineCard key={wine.slug} wine={wine} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && wines.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍷</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum vinho encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros de busca
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setSortBy('-rating');
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

function WineCard({ wine }) {
  const imageUrl = apiService.getWineImageUrl(wine.vivino_id);
  
  return (
    <Link href={`/vinhos/${wine.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Wine Image */}
        <div className="relative h-64 bg-gradient-to-br from-purple-50 to-red-50 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={wine.name}
              width={120}
              height={200}
              className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-300" style={{display: imageUrl ? 'none' : 'flex'}}>
            🍷
          </div>
        </div>

        {/* Wine Details */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {wine.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2">
            {wine.winery?.name}
          </p>

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

          {wine.region && (
            <p className="text-xs text-gray-500">
              {wine.region.name}, {wine.region.country?.name}
            </p>
          )}

          {wine.price && (
            <p className="text-lg font-bold text-green-600 mt-2">
              R$ {wine.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
} 