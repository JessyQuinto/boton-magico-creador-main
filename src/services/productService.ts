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
    try {
      return await apiClient.get<PaginatedResponse<ProductDto>>(
        API_CONFIG.ENDPOINTS.PRODUCTS.BASE,
        filters
      );
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('No se pudieron cargar los productos.');
    }
  }

  async getProductById(id: number): Promise<ProductDto> {
    console.log(`Fetching product with ID: ${id}`);
    try {
      return await apiClient.get<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS.BASE}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw new Error('No se pudo cargar el producto.');
    }
  }

  async getProductBySlug(slug: string): Promise<ProductDto> {
    console.log(`Fetching product with slug: ${slug}`);
    try {
      return await apiClient.get<ProductDto>(`${API_CONFIG.ENDPOINTS.PRODUCTS.BY_SLUG}/${slug}`);
    } catch (error) {
      console.error(`Failed to fetch product by slug ${slug}:`, error);
      throw new Error('No se pudo encontrar el producto.');
    }
  }

  async getFeaturedProducts(): Promise<ProductDto[]> {
    console.log('Fetching featured products');
    try {
      return await apiClient.get<ProductDto[]>(API_CONFIG.ENDPOINTS.PRODUCTS.FEATURED);
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      throw new Error('No se pudieron cargar los productos destacados.');
    }
  }

  async searchProducts(params: SearchParams): Promise<PaginatedResponse<ProductDto>> {
    console.log('Searching products:', params);
    try {
      return await apiClient.get<PaginatedResponse<ProductDto>>(
        API_CONFIG.ENDPOINTS.PRODUCTS.SEARCH,
        params
      );
    } catch (error) {
      console.error('Failed to search products:', error);
      throw new Error('Error en la búsqueda de productos.');
    }
  }

  async getProductsByCategory(categoryId: number, filters?: ProductFilters): Promise<PaginatedResponse<ProductDto>> {
    console.log(`Fetching products for category: ${categoryId}`);
    try {
      return await apiClient.get<PaginatedResponse<ProductDto>>(
        `${API_CONFIG.ENDPOINTS.PRODUCTS.BY_CATEGORY}/${categoryId}`,
        filters
      );
    } catch (error) {
      console.error(`Failed to fetch products for category ${categoryId}:`, error);
      throw new Error('No se pudieron cargar los productos de la categoría.');
    }
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

  async getProductReviews(productId: number): Promise<any[]> {
    console.log(`Fetching reviews for product: ${productId}`);
    try {
      const endpoint = API_CONFIG.ENDPOINTS.PRODUCTS.REVIEWS.replace('{id}', productId.toString());
      return await apiClient.get<any[]>(endpoint);
    } catch (error) {
      console.error(`Failed to fetch reviews for product ${productId}:`, error);
      throw new Error('No se pudieron cargar las reseñas del producto.');
    }
  }

  async addProductReview(productId: number, review: { rating: number; comment: string }): Promise<any> {
    console.log(`Adding review for product: ${productId}`);
    try {
      const endpoint = API_CONFIG.ENDPOINTS.PRODUCTS.REVIEWS.replace('{id}', productId.toString());
      return await apiClient.post<any>(endpoint, review);
    } catch (error) {
      console.error(`Failed to add review for product ${productId}:`, error);
      throw new Error('No se pudo añadir la reseña.');
    }
  }

  async getProductsByProducer(producerId: number, filters?: ProductFilters): Promise<PaginatedResponse<ProductDto>> {
    console.log(`Fetching products for producer: ${producerId}`);
    try {
      return await apiClient.get<PaginatedResponse<ProductDto>>(
        `${API_CONFIG.ENDPOINTS.PRODUCERS}/${producerId}/products`,
        filters
      );
    } catch (error) {
      console.error(`Failed to fetch products for producer ${producerId}:`, error);
      throw new Error('No se pudieron cargar los productos del productor.');
    }
  }
}

export const productService = new ProductService();
