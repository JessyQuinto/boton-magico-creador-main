// DEPRECATED: This file has been deprecated in favor of hooks API approach.
// 
// Migration Instructions:
// - Replace fetchCategories() with useCategories() from hooks/api/useCategories.ts
// - Replace fetchFeaturedProducts() with useFeaturedProducts() from hooks/api/useProducts.ts  
// - Replace fetchProductBySlug() with useProductBySlug() from hooks/api/useProducts.ts
//
// The new hooks API provides:
// - Better error handling
// - Loading states
// - React Query caching
// - Automatic type conversion
// - Optimistic updates
//
// Example migration:
// Before: const products = await fetchFeaturedProducts();
// After:  const { data: products, isLoading } = useFeaturedProducts();

import type { Product, Category, ProductWithStory } from '@/types';

// Placeholder exports to prevent breaking changes during migration
export const fetchCategories = async (): Promise<Category[]> => {
  throw new Error('fetchCategories is deprecated. Use useCategories() hook from hooks/api/useCategories.ts');
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  throw new Error('fetchFeaturedProducts is deprecated. Use useFeaturedProducts() hook from hooks/api/useProducts.ts');
};

export const fetchProductBySlug = async (slug: string): Promise<ProductWithStory | null> => {
  throw new Error('fetchProductBySlug is deprecated. Use useProductBySlug() hook from hooks/api/useProducts.ts');
};
