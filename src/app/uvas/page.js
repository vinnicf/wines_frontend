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

export default function UvasPage() {
  const [grapes, setGrapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadGrapes();
  }, [searchTerm, sortBy]);

  const loadGrapes = async () => {
    try {
      setLoading(true);
      const params = {
        ordering: sortBy,
        ...(searchTerm && { search: searchTerm }),
      };
      const data = await apiService.getGrapes(params);
      setGrapes(data.results || data);
    } catch (error) {
      console.error('Erro ao carregar uvas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadGrapes();
  };

  // Group grapes by color/type
  const grapesByType = grapes.reduce((acc, grape) => {
    let type = 'Outras';
    
    if (grape.color) {
      if (grape.color.toLowerCase().includes('red') || grape.color.toLowerCase().includes('tinta')) {
        type = 'Uvas Tintas';
      } else if (grape.color.toLowerCase().includes('white') || grape.color.toLowerCase().includes('branca')) {
        type = 'Uvas Brancas';
      } else if (grape.color.toLowerCase().includes('rosé') || grape.color.toLowerCase().includes('rosa')) {
        type = 'Uvas Rosé';
      }
    }
    
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(grape);
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
              <Link href="/regioes" className="text-gray-700 hover:text-purple-600 transition-colors">
                Regiões
              </Link>
              <Link href="/paises" className="text-gray-700 hover:text-purple-600 transition-colors">
                Países
              </Link>
              <Link href="/uvas" className="text-purple-600 font-semibold">
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
              <BreadcrumbPage>Uvas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Variedades de Uvas
          </h1>
          <p className="text-lg text-gray-600">
            Descubra as diferentes variedades de uvas utilizadas na produção de vinhos
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Variedades
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nome da variedade de uva..."
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
                  <option value="color">Cor</option>
                  <option value="-wine_count">Mais Vinhos</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando variedades de uvas...</p>
          </div>
        )}

        {/* Grapes grouped by type */}
        {!loading && (
          <div className="space-y-8">
            {Object.entries(grapesByType).map(([grapeType, typeGrapes]) => (
              <div key={grapeType} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`p-4 text-white ${getTypeColor(grapeType)}`}>
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="mr-3">🍇</span>
                    {grapeType}
                    <span className="ml-3 bg-white/20 px-3 py-1 rounded-full text-sm">
                      {typeGrapes.length} {typeGrapes.length === 1 ? 'variedade' : 'variedades'}
                    </span>
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {typeGrapes.map((grape) => (
                      <GrapeCard key={grape.slug} grape={grape} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && grapes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍇</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma variedade encontrada
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

function getTypeColor(grapeType) {
  switch (grapeType) {
    case 'Uvas Tintas':
      return 'bg-gradient-to-r from-red-600 to-red-800';
    case 'Uvas Brancas':
      return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    case 'Uvas Rosé':
      return 'bg-gradient-to-r from-pink-500 to-pink-600';
    default:
      return 'bg-gradient-to-r from-purple-600 to-purple-800';
  }
}

function GrapeCard({ grape }) {
  return (
    <Link href={`/uvas/${grape.slug}`}>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-purple-300 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {grape.name}
          </h3>
          <span className="text-2xl">🍇</span>
        </div>

        {/* Color indicator */}
        {grape.color && (
          <div className="mb-3">
            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {grape.color}
            </span>
          </div>
        )}

        {/* Description */}
        {grape.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {grape.description}
          </p>
        )}

        {/* Wine count */}
        {grape.wine_count !== undefined && (
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-gray-500">Vinhos com esta uva:</span>
            <span className="font-medium text-purple-600">
              {grape.wine_count}
            </span>
          </div>
        )}

        {/* Characteristics */}
        {grape.characteristics && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {grape.characteristics.split(',').slice(0, 3).map((char, index) => (
                <span key={index} className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {char.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action indicator */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600 font-medium">
              Ver vinhos
            </span>
            <span className="text-purple-600 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 