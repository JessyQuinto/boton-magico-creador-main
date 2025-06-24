
import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../product/ProductCard';
import { fetchFeaturedProducts } from '@/services/productApi';
import { Product } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";
import Container from '@/components/layout/Container';

const FeaturedProducts: React.FC = () => {
  const { 
    data: allFeaturedProducts, 
    isLoading, 
    isError,
    error
  } = useQuery<Product[], Error>({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts,
    staleTime: 60000,
  });

  const displayedFeaturedProducts = allFeaturedProducts?.slice(0, 3) || [];

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: 3 }).map((_, index) => (
         <div key={index} className="flex flex-col space-y-3 sm:space-y-4">
           <Skeleton className="h-[250px] sm:h-[300px] w-full rounded-2xl" />
           <div className="space-y-2">
             <Skeleton className="h-5 sm:h-6 w-3/4" />
             <Skeleton className="h-3 sm:h-4 w-1/2" />
             <Skeleton className="h-3 sm:h-4 w-full" />
           </div>
         </div>
      ))}
    </div>
  );

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-12 px-4 sm:px-0">
          <div className="text-center md:text-left mb-4 sm:mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111816] mb-3 sm:mb-4">
              Featured Treasures
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#608a7c] max-w-xl">
              Discover our curated selection of exceptional handcrafted pieces from the Pacific
            </p>
          </div>
          <Link 
            to="/productos" 
            className="btn-modern flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
          >
            View All Products
            <ArrowRight size={16} className="sm:w-5 sm:h-5" />
          </Link>
        </div>

        <div className="px-4 sm:px-0">
          {isLoading && renderSkeletons()}

          {isError && (
            <div className="text-center text-red-500">
              <p className="text-sm sm:text-base">Error loading featured products: {error?.message}</p>
            </div>
          )}
          
          {!isLoading && !isError && displayedFeaturedProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {displayedFeaturedProducts.map((producto) => (
                <ProductCard key={producto.id} product={producto} />
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-12 sm:mt-16 text-center px-4 sm:px-0">
          <div className="inline-block bg-[#f0f5f3] rounded-2xl p-6 sm:p-8 max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-[#0cf2a5]/10 p-3 sm:p-4 rounded-2xl mb-4 sm:mb-6">
                <ShoppingBag size={24} className="sm:w-8 sm:h-8 text-[#0cf2a5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#111816] mb-2 sm:mb-3 text-center">
                Are you an artisan from Chocó?
              </h3>
              <p className="text-[#608a7c] mb-4 sm:mb-6 text-center leading-relaxed text-sm sm:text-base">
                Join our platform and share your creations with the world
              </p>
              <Link 
                to="/contact" 
                className="btn-modern-primary flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              >
                Contact Us
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
