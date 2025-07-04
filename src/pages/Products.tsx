
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Contenedor from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import ProductCard from '@/components/product/ProductCard';
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories, useProducts } from '@/hooks/useApi';
import { ProductFilters } from '@/types/api';
import { useEffect, useState } from 'react';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilters>({
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    featured: undefined
  });

  const {
    products,
    searchProducts,
    fetchProducts,
    searchProductsCall
  } = useProducts();

  const {
    list: categoriesState,
    fetchCategories
  } = useCategories();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleSearch = (query: string, newFilters: ProductFilters) => {
    setSearchQuery(query);
    setFilters(newFilters);
    if (query) {
      searchProductsCall({ query, ...newFilters });
    } else {
      fetchProducts(newFilters);
    }
  };

  const handleCategoryFilter = (categorySlug: string) => {
    const newFilters = { ...filters, category: categorySlug === 'all' ? '' : categorySlug };
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  const categories = [
    { id: 'all', name: 'Todos', slug: 'all' },
    ...(categoriesState.data || []).map(cat => ({
      id: cat.slug,
      name: cat.name,
      slug: cat.slug
    }))
  ];

  const productsData = searchQuery ? searchProducts.data : products.data;
  const isLoading = searchQuery ? searchProducts.loading : products.loading;
  const isError = searchQuery ? searchProducts.error : products.error;

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <Skeleton className="h-[300px] w-full rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Navbar />

      <main>
        <Contenedor className="py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111816] dark:text-white mb-4">
              Artesanías del Chocó
            </h1>
            <p className="text-lg text-[#608a7c] dark:text-gray-300 max-w-2xl mx-auto">
              Descubre nuestra colección completa de productos artesanales hechos a mano por maestros artesanos del Pacífico colombiano
            </p>
          </div>

          {/* Búsqueda Avanzada */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e.currentTarget.value, filters)}
                className="w-full pl-12 pr-4 py-3 border border-[#f0f5f3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-[#f0f5f3] text-[#111816]"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#608a7c]">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryFilter(category.slug)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${filters.category === category.slug || (category.slug === 'all' && !filters.category)
                    ? 'bg-[#0cf2a5] text-white'
                    : 'bg-[#f0f5f3] dark:bg-gray-700 text-[#111816] dark:text-white hover:bg-[#0cf2a5] hover:text-white'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading && renderSkeletons()}

          {isError && (
            <div className="text-center text-red-500 py-12">
              <p>Error al cargar los productos: {isError}</p>
            </div>
          )}

          {!isLoading && !isError && productsData && productsData.data && productsData.data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && !isError && (!productsData || !productsData.data || productsData.data.length === 0) && (
            <div className="text-center text-[#608a7c] dark:text-gray-400 py-12">
              <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </Contenedor>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
