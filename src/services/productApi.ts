import { productService } from './productService';
import { categoryService } from './categoryService';
import type { Product, Category, ProductWithStory } from '@/types';

// Utility function to convert API DTO to frontend types
const convertProductDto = (dto: any): Product => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  price: dto.price,
  image: dto.image,
  description: dto.description,
  categoryId: dto.categoryId,
  producerId: dto.producerId,
  stock: dto.stock,
  featured: dto.featured,
  rating: dto.rating,
  createdAt: dto.createdAt,
  artisan: dto.artisan || 'Artesano Tradicional',
  origin: dto.origin || 'Chocó',
});

const convertCategoryDto = (dto: any): Category => ({
  id: dto.id,
  name: dto.name,
  slug: dto.slug,
  image: dto.image,
  description: dto.description,
});

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const data = await categoryService.getAllCategories();
    return data.map(convertCategoryDto);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const data = await productService.getFeaturedProducts();
    return data.map(convertProductDto);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug: string): Promise<ProductWithStory | null> => {
  try {
    const product = await productService.getProductBySlug(slug);
    return {
      ...convertProductDto(product),
      story: {
        id: product.id,
        title: `La Historia de ${product.name}`,
        content: product.description,
        author: product.artisan || 'Artesano Tradicional',
        readTime: '5 min lectura',
        culturalSignificance: `Esta pieza representa la tradición cultural del ${product.origin || 'Chocó'}.`,
      }
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
};
