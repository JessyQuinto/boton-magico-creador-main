
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'newest';
}

const AdvancedSearch: React.FC = () => {
  const { searchQuery, filters, setSearchQuery, updateFilters } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<SearchFilters>({
    query: searchQuery,
    category: filters.category,
    minPrice: 0,
    maxPrice: 500000,
    sortBy: 'name',
  });

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'tejidos', name: 'Tejidos' },
    { id: 'ceramicas', name: 'Cerámicas' },
    { id: 'joyeria', name: 'Joyería' },
    { id: 'madera', name: 'Madera' },
  ];

  const handleSearch = () => {
    setSearchQuery(localFilters.query);
    updateFilters({ 
      category: localFilters.category,
      sortBy: localFilters.sortBy 
    });
    setIsOpen(false);
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      query: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 500000,
      sortBy: 'name',
    };
    setLocalFilters(defaultFilters);
    setSearchQuery('');
    updateFilters({ category: 'all', sortBy: 'name' });
  };

  return (
    <div className="relative">
      {/* Barra de búsqueda básica */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#608a7c] w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={localFilters.query}
          onChange={(e) => setLocalFilters({ ...localFilters, query: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full pl-12 pr-16 py-3 border border-[#f0f5f3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-[#f0f5f3] text-[#111816]"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-[#608a7c] hover:text-[#0cf2a5] transition-colors"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Panel de filtros avanzados */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-[#f0f5f3] dark:border-gray-700 rounded-xl p-6 shadow-lg z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
              Búsqueda Avanzada
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#608a7c] hover:text-[#111816] dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                Categoría
              </label>
              <select
                value={localFilters.category}
                onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
                className="w-full px-3 py-2 border border-[#f0f5f3] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-[#111816] dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ordenar por */}
            <div>
              <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                Ordenar por
              </label>
              <select
                value={localFilters.sortBy}
                onChange={(e) => setLocalFilters({ ...localFilters, sortBy: e.target.value as SearchFilters['sortBy'] })}
                className="w-full px-3 py-2 border border-[#f0f5f3] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-[#111816] dark:text-white"
              >
                <option value="name">Nombre A-Z</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="newest">Más Recientes</option>
              </select>
            </div>

            {/* Rango de precios */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                Rango de Precio: ${localFilters.minPrice.toLocaleString()} - ${localFilters.maxPrice.toLocaleString()}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={localFilters.minPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, minPrice: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={localFilters.maxPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: parseInt(e.target.value) })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSearch}
              className="flex-1 bg-[#0cf2a5] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#0ae195] transition-colors"
            >
              Buscar
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-[#f0f5f3] dark:border-gray-600 text-[#608a7c] dark:text-gray-300 rounded-lg font-medium hover:bg-[#f0f5f3] dark:hover:bg-gray-700 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
