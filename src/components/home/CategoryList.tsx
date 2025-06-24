
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/productApi';
import { Category } from '@/types';
import { getImageFallback } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";

const CategoryList: React.FC = () => {
  const { 
    data: categories, 
    isLoading, 
    isError,
    error 
  } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  const mainCategories = categories?.slice(0, 3) || [];

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="group">
          <Skeleton className="w-full h-80 rounded-2xl" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-white dark:bg-modern-gray-900 transition-colors duration-200">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-modern-gray-100 dark:bg-modern-gray-800 text-modern-gray-700 dark:text-modern-gray-300 font-medium text-sm mb-6">
            Categorías Destacadas
          </div>
          <h2 className="section-modern text-center">
            Explora Nuestras Categorías
          </h2>
          <p className="text-lg text-modern-gray-600 dark:text-modern-gray-400 max-w-2xl mx-auto font-body">
            Descubre la diversidad de productos artesanales del Pacífico colombiano
          </p>
        </div>
        
        {isLoading && renderSkeletons()}

        {isError && (
          <div className="text-center text-red-500 dark:text-red-400">
            <p>Error al cargar las categorías: {error?.message}</p>
          </div>
        )}

        {!isLoading && !isError && mainCategories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/productos?categoria=${category.slug}`}
                className="group"
              >
                <div className="card-modern h-80 relative overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0">
                    <img 
                      src={category.image || getImageFallback(category.name)} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm font-body">Explorar productos</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!isLoading && !isError && categories && categories.length > 0 && (
          <div className="mt-12 text-center">
            <Link 
              to="/productos" 
              className="inline-flex items-center text-modern-green-600 dark:text-modern-green-400 hover:text-modern-green-700 dark:hover:text-modern-green-300 transition-colors font-medium text-lg group"
            >
              Ver todas las categorías
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryList;
