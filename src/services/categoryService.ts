import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { CategoryDto } from '@/types/api';

class CategoryService {
  async getAllCategories(): Promise<CategoryDto[]> {
    console.log('Fetching all categories');
    try {
      return await apiClient.get<CategoryDto[]>(API_CONFIG.ENDPOINTS.CATEGORIES);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw new Error('No se pudieron cargar las categorías.');
    }
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    console.log(`Fetching category with ID: ${id}`);
    try {
      return await apiClient.get<CategoryDto>(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch category ${id}:`, error);
      throw new Error('No se pudo cargar la categoría.');
    }
  }

  async getCategoryBySlug(slug: string): Promise<CategoryDto> {
    console.log(`Fetching category with slug: ${slug}`);
    try {
      return await apiClient.get<CategoryDto>(`${API_CONFIG.ENDPOINTS.CATEGORIES}/slug/${slug}`);
    } catch (error) {
      console.error(`Failed to fetch category by slug ${slug}:`, error);
      throw new Error('No se pudo encontrar la categoría.');
    }
  }

  async createCategory(category: Omit<CategoryDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<CategoryDto> {
    console.log('Creating new category:', category.name);
    try {
      return await apiClient.post<CategoryDto>(API_CONFIG.ENDPOINTS.CATEGORIES, category);
    } catch (error) {
      console.error('Failed to create category:', error);
      throw new Error('No se pudo crear la categoría.');
    }
  }

  async updateCategory(id: number, category: Partial<CategoryDto>): Promise<CategoryDto> {
    console.log(`Updating category with ID: ${id}`);
    try {
      return await apiClient.put<CategoryDto>(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`, category);
    } catch (error) {
      console.error(`Failed to update category ${id}:`, error);
      throw new Error('No se pudo actualizar la categoría.');
    }
  }

  async deleteCategory(id: number): Promise<void> {
    console.log(`Deleting category with ID: ${id}`);
    try {
      await apiClient.delete(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`);
    } catch (error) {
      console.error(`Failed to delete category ${id}:`, error);
      throw new Error('No se pudo eliminar la categoría.');
    }
  }
}

export const categoryService = new CategoryService();
