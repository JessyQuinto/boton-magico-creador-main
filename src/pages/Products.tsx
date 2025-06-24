
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Contenedor from '@/components/layout/Container';
import ProductCard from '@/components/product/ProductCard';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import { fetchFeaturedProducts } from '@/services/productApi';
import { Product } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from '@/store/useStore';

const categories = [
  { id: 'all', name: 'Todos', slug: 'all' },
  { id: 'tejidos', name: 'Tejidos', slug: 'tejidos' },
  { id: 'ceramicas', name: 'Cerámicas', slug: 'ceramicas' },
  { id: 'joyeria', name: 'Joyería', slug: 'joyeria' },
  { id: 'madera', name: 'Madera', slug: 'madera' }
];

const Products = () => {
  const { searchQuery, filters, setSearchQuery, updateFilters } = useStore();

  const { 
    data: products = [], 
    isLoading, 
    isError 
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchFeaturedProducts,
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || 
      product.categoryId.toString() === filters.category;
    
    return matchesSearch && matchesCategory;
  });

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
            <AdvancedSearch />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => updateFilters({ category: category.slug })}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filters.category === category.slug
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
              <p>Error al cargar los productos. Por favor, intenta de nuevo.</p>
            </div>
          )}

          {!isLoading && !isError && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && !isError && filteredProducts.length === 0 && (
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
