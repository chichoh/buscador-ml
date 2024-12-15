import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Search } from 'lucide-react';
import ProductSearch from './components/ProductSearch';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Search size={24} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Buscador de Productos MercadoLibre BY Acun arielsacol@gmail.com
            </h1>
          </div>
        </div>
      </header>

      <main className="py-8">
        <ProductSearch />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600">
          © {new Date().getFullYear()} Buscador de Productos MercadoLibre BY Acun arielsacol@gmail.com
        </div>
      </footer>
    </div>
  );
}

export default App;