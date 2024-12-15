import React, { useState } from 'react';
import { Search, FileDown, BarChart2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SearchCriteria, Product } from '../types';
import { exportToExcel, exportToPDF } from '../utils/export';
import { ProductTable } from './ProductTable/ProductTable';
import ProductChart from './ProductChart';
import CategorySelect from './CategorySelect';

export default function ProductSearch() {
  const [products, setProducts] = useState<string>('');
  const [criteria, setCriteria] = useState<SearchCriteria>('lowest');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productList = products
        .split(/[\n,]/)
        .map(p => p.trim())
        .filter(p => p);

      const searchPromises = productList.map(async (product) => {
        const baseUrl = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(product)}&limit=50`;
        const url = selectedCategory 
          ? `${baseUrl}&category=${selectedCategory}`
          : baseUrl;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.results?.length) return null;

        if (criteria === 'all') {
          const lowest = data.results.reduce((min, item) => item.price < min.price ? item : min);
          const highest = data.results.reduce((max, item) => item.price > max.price ? item : max);
          const avgPrice = data.results.reduce((sum, item) => sum + item.price, 0) / data.results.length;
          const average = data.results.reduce((closest, item) => 
            Math.abs(item.price - avgPrice) < Math.abs(closest.price - avgPrice) ? item : closest
          );
          return [lowest, average, highest];
        }

        let result;
        switch (criteria) {
          case 'lowest':
            result = data.results.reduce((min, item) => item.price < min.price ? item : min);
            break;
          case 'highest':
            result = data.results.reduce((max, item) => item.price > max.price ? item : max);
            break;
          case 'average':
            const avgPrice = data.results.reduce((sum, item) => sum + item.price, 0) / data.results.length;
            result = data.results.reduce((closest, item) => 
              Math.abs(item.price - avgPrice) < Math.abs(closest.price - avgPrice) ? item : closest
            );
            break;
        }
        return [result];
      });

      const searchResults = (await Promise.all(searchPromises))
        .filter(Boolean)
        .flat() as Product[];

      setResults(searchResults);
      
      if (searchResults.length > 0) {
        toast.success('Búsqueda completada');
      } else {
        toast.error('No se encontraron resultados');
      }
    } catch (error) {
      toast.error('Error al buscar productos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Productos (separados por comas o líneas)
          </label>
          <textarea
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Ejemplo:&#10;iPhone 13&#10;Samsung Galaxy S21,&#10;Motorola Edge"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Criterio de búsqueda
            </label>
            <select
              value={criteria}
              onChange={(e) => setCriteria(e.target.value as SearchCriteria)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="lowest">Precio más bajo</option>
              <option value="highest">Precio más alto</option>
              <option value="average">Precio promedio</option>
              <option value="all">Más bajo + Promedio + Más alto</option>
            </select>
          </div>
          
          <CategorySelect onCategorySelect={setSelectedCategory} />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Search size={20} />
            {loading ? 'Buscando...' : 'Buscar'}
          </button>

          {results.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => exportToExcel(results)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FileDown size={20} />
                Excel
              </button>
              <button
                type="button"
                onClick={() => exportToPDF(results)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <FileDown size={20} />
                PDF
              </button>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'table' ? 'chart' : 'table')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <BarChart2 size={20} />
                {viewMode === 'table' ? 'Ver gráfico' : 'Ver tabla'}
              </button>
            </>
          )}
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          {viewMode === 'table' ? (
            <ProductTable products={results} />
          ) : (
            <ProductChart products={results} />
          )}
        </div>
      )}
    </div>
  );
}