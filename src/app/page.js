import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-red-50">
      {/* Header/Navigation */}
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
              <Link href="/uvas" className="text-gray-700 hover:text-purple-600 transition-colors">
                Uvas
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Descubra o Mundo dos Vinhos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore uma vasta coleção de vinhos de todo o mundo, das melhores vinícolas e regiões mais prestigiadas.
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/vinhos">
              Explorar Vinhos
            </Link>
          </Button>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <Link href="/vinhos" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:bg-purple-50">
              <div className="text-3xl mb-3">🍷</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vinhos</h3>
              <p className="text-gray-600">Explore nossa coleção completa de vinhos</p>
            </div>
          </Link>

          <Link href="/vinicolas" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:bg-red-50">
              <div className="text-3xl mb-3">🏭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vinícolas</h3>
              <p className="text-gray-600">Conheça as melhores vinícolas do mundo</p>
            </div>
          </Link>

          <Link href="/regioes" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:bg-green-50">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Regiões</h3>
              <p className="text-gray-600">Descubra regiões vinícolas famosas</p>
            </div>
          </Link>

          <Link href="/paises" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:bg-blue-50">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Países</h3>
              <p className="text-gray-600">Explore países produtores de vinho</p>
            </div>
          </Link>

          <Link href="/uvas" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group-hover:bg-yellow-50">
              <div className="text-3xl mb-3">🍇</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Uvas</h3>
              <p className="text-gray-600">Aprenda sobre diferentes tipos de uvas</p>
            </div>
          </Link>
        </div>

        {/* Featured Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Destaques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Vinhos Premiados</h3>
              <p className="text-gray-600">Descubra vinhos com as melhores avaliações</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Vinhos do Mundo</h3>
              <p className="text-gray-600">Explore vinhos de diferentes países e regiões</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Aprenda</h3>
              <p className="text-gray-600">Informações detalhadas sobre cada vinho</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
