
import Container from '@/components/layout/Container';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCategories } from '@/hooks/api/useCategories';
import type { CategoryDto } from '@/types/api';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryShowcase: React.FC = () => {
  const {
    data: categories,
    isLoading,
    error
  } = useCategories();

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <Container>
          <div className="text-center">
            <LoadingSpinner />
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <Container>
          <div className="text-center text-red-600">
            Error loading categories: {error.message}
          </div>
        </Container>
      </section>
    );
  }

  const categoriesList = (categories as CategoryDto[]) || [];
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <Container>
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111816] mb-3 sm:mb-4">
            Explore Our Collections
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#608a7c] max-w-2xl mx-auto">
            Each piece tells a story of tradition, skill, and the vibrant culture of the Colombian Pacific
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
          {categoriesList.map((category) => (
            <Link
              key={category.slug}
              to={`/productos?categoria=${category.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl aspect-square mb-3 sm:mb-4">
                <img
                  src={category.image || 'https://images.unsplash.com/photo-1604782206219-3b9b64d6e689?q=80&w=1974&auto=format&fit=crop'}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#111816] mb-1 sm:mb-2">
                {category.name}
              </h3>
              <p className="text-[#608a7c] text-xs sm:text-sm">
                {category.description || 'Artesanías tradicionales de alta calidad'}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryShowcase;
