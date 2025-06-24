
import React, { useState } from 'react';
import { Filter, X, Star, DollarSign, Package } from 'lucide-react';
import { Category } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  onFiltersChange: (filters: ProductFilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface ProductFilterState {
  category: number | null;
  priceRange: [number, number];
  rating: number | null;
  availability: 'all' | 'in-stock' | 'low-stock';
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating' | 'newest';
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  categories, 
  onFiltersChange, 
  isOpen, 
  onToggle 
}) => {
  const [filters, setFilters] = useState<ProductFilterState>({
    category: null,
    priceRange: [0, 500000],
    rating: null,
    availability: 'all',
    sortBy: 'default'
  });

  const handleFilterChange = (newFilters: Partial<ProductFilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const defaultFilters: ProductFilterState = {
      category: null,
      priceRange: [0, 500000],
      rating: null,
      availability: 'all',
      sortBy: 'default'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full px-4 py-2 bg-choco-brown text-white rounded-md hover:bg-opacity-90 transition-colors dark:bg-choco-gold dark:text-gray-900"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`${
        isOpen ? 'block' : 'hidden'
      } lg:block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6`}>
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-choco-brown dark:text-white">Filtros</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-choco-brown dark:text-gray-400 dark:hover:text-choco-gold transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={onToggle}
              className="lg:hidden text-gray-500 hover:text-choco-brown dark:text-gray-400 dark:hover:text-choco-gold"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordenar por
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ sortBy: e.target.value as ProductFilterState['sortBy'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-choco-brown dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
            <option value="rating">Mejor Calificación</option>
            <option value="newest">Más Recientes</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Categoría
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={filters.category === null}
                onChange={() => handleFilterChange({ category: null })}
                className="h-4 w-4 text-choco-brown focus:ring-choco-brown"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Todas</span>
            </label>
            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category.id}
                  onChange={() => handleFilterChange({ category: category.id })}
                  className="h-4 w-4 text-choco-brown focus:ring-choco-brown"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Rango de Precio
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [parseInt(e.target.value), filters.priceRange[1]] 
                })}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                })}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <Star className="w-4 h-4 inline mr-1" />
            Calificación mínima
          </label>
          <div className="space-y-2">
            {[null, 5, 4, 3, 2, 1].map((rating) => (
              <label key={rating || 'all'} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleFilterChange({ rating })}
                  className="h-4 w-4 text-choco-brown focus:ring-choco-brown"
                />
                <span className="ml-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
                  {rating ? (
                    <>
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current text-yellow-400" />
                      ))}
                      <span className="ml-1">& más</span>
                    </>
                  ) : (
                    'Todas'
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <Package className="w-4 h-4 inline mr-1" />
            Disponibilidad
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === 'all'}
                onChange={() => handleFilterChange({ availability: 'all' })}
                className="h-4 w-4 text-choco-brown focus:ring-choco-brown"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Todos</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === 'in-stock'}
                onChange={() => handleFilterChange({ availability: 'in-stock' })}
                className="h-4 w-4 text-choco-brown focus:ring-choco-brown"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">En Stock</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="availability"
                checked={filters.availability === 'low-stock'}
                onChange={() => handleFilterChange({ availability: 'low-stock' })}
                className="h-4 w-4 text-choco-brown focus:ring-choco-brown"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Stock Limitado</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
