import React, { useEffect, useState } from 'react';
import { Category } from '../types';
import { Search } from 'lucide-react';

interface CategorySelectProps {
  onCategorySelect: (categoryId: string | null) => void;
}

export default function CategorySelect({ onCategorySelect }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Categoría (opcional)
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg bg-white">
        <div 
          className={`p-2 cursor-pointer hover:bg-gray-100 ${
            selectedCategory === null ? 'bg-blue-50' : ''
          }`}
          onClick={() => handleCategorySelect(null)}
        >
          Todas las categorías
        </div>
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              selectedCategory === category.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}