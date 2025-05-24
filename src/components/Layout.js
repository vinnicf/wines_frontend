import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  );
}

function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-800">
            🍷 VinhoApp
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink href="/vinhos">Vinhos</NavLink>
            <NavLink href="/vinicolas">Vinícolas</NavLink>
            <NavLink href="/regioes">Regiões</NavLink>
            <NavLink href="/paises">Países</NavLink>
            <NavLink href="/uvas">Uvas</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-purple-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
    >
      {children}
    </Link>
  );
} 