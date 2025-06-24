
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import type { 
  ProductDto, 
  ProductFilters, 
  SearchParams,
  PaginatedResponse 
} from '@/types/api';

class ProductService {
  async getAllProducts(filters?: ProductFilters): Promise<PaginatedResponse<ProductDto>> {
    console.log('Fetching products with filters:', filters);
    return apiClient.get<PaginatedResponse<ProductDto>>(
      API_CONFIG.ENDPOINTS.PRODUCTS.BASE,
      filters
    );
  }

  async getProductById(id: number): Promise<ProductDto> {
    console.log(`Fetching product with ID: ${id}`);
    return apiClient.get<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS.BASE}/${id}`);
  }

  async getProductBySlug(slug: string): Promise<ProductDto> {
    console.log(`Fetching product with slug: ${slug}`);
    return apiClient.get<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS.BY_SLUG}/${slug}`);
  }

  async getFeaturedProducts(): Promise<ProductDto[]> {
    console.log('Fetching featured products');
    return apiClient.get<ProductDto[]>(API_CONFIG.ENDPOINTS.PRODUCTS.FEATURED);
  }

  async searchProducts(params: SearchParams): Promise<PaginatedResponse<ProductDto>> {
    console.log('Searching products:', params);
    return apiClient.get<PaginatedResponse<ProductDto>>(
      API_CONFIG.ENDPOINTS.PRODUCTS.SEARCH,
      params
    );
  }

  async getProductsByCategory(categoryId: number, filters?: ProductFilters): Promise<PaginatedResponse<ProductDto>> {
    console.log(`Fetching products for category: ${categoryId}`);
    return apiClient.get<PaginatedResponse<ProductDto>>(
      `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_CATEGORY}/${categoryId}`,
      filters
    );
  }

  // Admin methods
  async createProduct(product: Omit<ProductDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductDto> {
    console.log('Creating new product:', product.name);
    return apiClient.post<ProductDto>(API_CONFIG.ENDPOINTS.PRODUCTS.BASE, product);
  }

  async updateProduct(id: number, product: Partial<ProductDto>): Promise<ProductDto> {
    console.log(`Updating product with ID: ${id}`);
    return apiClient.put<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS.BASE}/${id}`, product);
  }

  async deleteProduct(id: number): Promise<void> {
    console.log(`Deleting product with ID: ${id}`);
    await apiClient.delete(`${API_CONFIG.ENDPOINTS.PRODUCTS.BASE}/${id}`);
  }
}

export const productService = new ProductService();
