import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { CategoryDto } from '@/types/api';

class CategoryService {
  async getAllCategories(): Promise<CategoryDto[]> {
    console.log('Fetching all categories');
    return apiClient.get<CategoryDto[]>(API_CONFIG.ENDPOINTS.CATEGORIES);
  }

  async getCategoryById(id: number): Promise<CategoryDto> {
    console.log(`Fetching category with ID: ${id}`);
    return apiClient.get<CategoryDto>(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`);
  }

  async getCategoryBySlug(slug: string): Promise<CategoryDto> {
    console.log(`Fetching category with slug: ${slug}`);
    return apiClient.get<CategoryDto>(`${API_CONFIG.ENDPOINTS.CATEGORIES}/slug/${slug}`);
  }

  async createCategory(category: Omit<CategoryDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<CategoryDto> {
    console.log('Creating new category:', category.name);
    return apiClient.post<CategoryDto>(API_CONFIG.ENDPOINTS.CATEGORIES, category);
  }

  async updateCategory(id: number, category: Partial<CategoryDto>): Promise<CategoryDto> {
    console.log(`Updating category with ID: ${id}`);
    return apiClient.put<CategoryDto>(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`, category);
  }

  async deleteCategory(id: number): Promise<void> {
    console.log(`Deleting category with ID: ${id}`);
    await apiClient.delete(`${API_CONFIG.ENDPOINTS.CATEGORIES}/${id}`);
  }
}

export const categoryService = new CategoryService();
