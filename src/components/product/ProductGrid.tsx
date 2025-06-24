import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { useProducts, useProductsByCategory, useProductSearch } from '@/hooks/api/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  categoryId?: number;
  searchQuery?: string;
}

interface LocalFilterState {
  priceRange: [number, number];
  rating: number | null;
  availability: 'all' | 'in-stock' | 'out-of-stock';
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
}

const PRODUCTS_PER_PAGE = 12;

const ProductGrid: React.FC<ProductGridProps> = ({ 
  categoryId,
  searchQuery = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<LocalFilterState>({
    priceRange: [0, 500000],
    rating: null,
    availability: 'all',
    sortBy: 'newest'
  });

  // Choose appropriate hook based on props
  const productsQuery = categoryId 
    ? useProductsByCategory(categoryId)
    : searchQuery 
      ? useProductSearch({ query: searchQuery })
      : useProducts();

  const { data: productsResponse, isLoading, error } = productsQuery;
  
  // Handle different response types
  const products = useMemo(() => {
    if (!productsResponse) return [];
    
    // If it's a paginated response
    if ('data' in productsResponse && Array.isArray(productsResponse.data)) {
      return productsResponse.data;
    }
    
    // If it's a direct array
    if (Array.isArray(productsResponse)) {
      return productsResponse;
    }
    
    return [];
  }, [productsResponse]);

  // Apply local filtering and pagination
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply price filter
    if (filters.priceRange) {
      result = result.filter(product => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
      );
    }

    // Apply rating filter
    if (filters.rating) {
      result = result.filter(product => 
        product.rating && product.rating >= filters.rating!
      );
    }

    // Apply availability filter
    if (filters.availability === 'in-stock') {
      result = result.filter(product => product.stock > 0);
    } else if (filters.availability === 'out-of-stock') {
      result = result.filter(product => product.stock === 0);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar productos</h2>
        <p className="text-gray-600">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {categoryId ? `Productos` : searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los Productos'}
        </h2>
      </div>

      {/* Sort Options */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {isLoading ? 'Cargando...' : `Mostrando ${paginatedProducts.length} de ${filteredProducts.length} productos`}
        </p>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as LocalFilterState['sortBy'] }))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="newest">Más recientes</option>
          <option value="price-low">Precio: menor a mayor</option>
          <option value="price-high">Precio: mayor a menor</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && (
        <>
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-900 mb-4">No se encontraron productos</h3>
              <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => 
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 2 && page <= currentPage + 2)
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg border ${
                        currentPage === page
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
