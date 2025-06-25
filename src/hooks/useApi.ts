import { useCallback } from 'react';
import { authService } from '@/services/authService';
import { productService } from '@/services/productService';
import { cartService } from '@/services/cartService';
import { categoryService } from '@/services/categoryService';
import { orderService } from '@/services/orderService';
import { producerService } from '@/services/producerService';
import { wishlistService } from '@/services/wishlistService';
import { useApiCall, useCrudApi, usePaginatedApi } from './useApiCall';
import type { 
  LoginRequestDto, 
  RegisterRequestDto, 
  ProductDto, 
  ProductFilters,
  CartDto,
  CategoryDto,
  OrderDto,
  CreateOrderRequestDto,
  ProducerDto,
  WishlistDto,
  SearchParams
} from '@/types/api';

// Auth hooks
export function useAuth() {
  const login = useApiCall<any>();
  const register = useApiCall<any>();
  const logout = useApiCall<void>();
  const getCurrentUser = useApiCall<any>();
  const updateProfile = useApiCall<any>();
  const refreshToken = useApiCall<boolean>();

  const handleLogin = useCallback(async (credentials: LoginRequestDto) => {
    return login.execute(() => authService.login(credentials));
  }, [login]);

  const handleRegister = useCallback(async (userData: RegisterRequestDto) => {
    return register.execute(() => authService.register(userData));
  }, [register]);

  const handleLogout = useCallback(async () => {
    return logout.execute(() => authService.logout());
  }, [logout]);

  const handleGetCurrentUser = useCallback(async () => {
    return getCurrentUser.execute(() => authService.getCurrentUser());
  }, [getCurrentUser]);

  const handleUpdateProfile = useCallback(async (userData: any) => {
    return updateProfile.execute(() => authService.updateProfile(userData));
  }, [updateProfile]);

  const handleRefreshToken = useCallback(async () => {
    return refreshToken.execute(() => authService.refreshToken());
  }, [refreshToken]);

  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  return {
    login: { ...login, execute: handleLogin },
    register: { ...register, execute: handleRegister },
    logout: { ...logout, execute: handleLogout },
    getCurrentUser: { ...getCurrentUser, execute: handleGetCurrentUser },
    updateProfile: { ...updateProfile, execute: handleUpdateProfile },
    refreshToken: { ...refreshToken, execute: handleRefreshToken },
    isAuthenticated
  };
}

// Product hooks
export function useProducts() {
  const products = usePaginatedApi<ProductDto>();
  const singleProduct = useApiCall<ProductDto>();
  const featuredProducts = useApiCall<ProductDto[]>();
  const searchProducts = usePaginatedApi<ProductDto>();
  const productsByCategory = usePaginatedApi<ProductDto>();
  const productsByProducer = usePaginatedApi<ProductDto>();
  const productReviews = useApiCall<any[]>();
  const addReview = useApiCall<any>();

  const fetchProducts = useCallback(async (filters?: ProductFilters, page = 1, size = 10) => {
    return products.fetchPage((p, s) => productService.getAllProducts({ ...filters, page: p, pageSize: s }), page, size);
  }, [products]);

  const fetchProductById = useCallback(async (id: number) => {
    return singleProduct.execute(() => productService.getProductById(id));
  }, [singleProduct]);

  const fetchProductBySlug = useCallback(async (slug: string) => {
    return singleProduct.execute(() => productService.getProductBySlug(slug));
  }, [singleProduct]);

  const fetchFeaturedProducts = useCallback(async () => {
    return featuredProducts.execute(() => productService.getFeaturedProducts());
  }, [featuredProducts]);

  const searchProductsCall = useCallback(async (params: SearchParams, page = 1, size = 10) => {
    return searchProducts.fetchPage((p, s) => productService.searchProducts({ ...params, page: p, pageSize: s }), page, size);
  }, [searchProducts]);

  const fetchProductsByCategory = useCallback(async (categoryId: number, filters?: ProductFilters, page = 1, size = 10) => {
    return productsByCategory.fetchPage((p, s) => productService.getProductsByCategory(categoryId, { ...filters, page: p, pageSize: s }), page, size);
  }, [productsByCategory]);

  const fetchProductsByProducer = useCallback(async (producerId: number, filters?: ProductFilters, page = 1, size = 10) => {
    return productsByProducer.fetchPage((p, s) => productService.getProductsByProducer(producerId, { ...filters, page: p, pageSize: s }), page, size);
  }, [productsByProducer]);

  const fetchProductReviews = useCallback(async (productId: number) => {
    return productReviews.execute(() => productService.getProductReviews(productId));
  }, [productReviews]);

  const addProductReview = useCallback(async (productId: number, review: { rating: number; comment: string }) => {
    return addReview.execute(() => productService.addProductReview(productId, review));
  }, [addReview]);

  return {
    products,
    singleProduct,
    featuredProducts,
    searchProducts,
    productsByCategory,
    productsByProducer,
    productReviews,
    addReview,
    fetchProducts,
    fetchProductById,
    fetchProductBySlug,
    fetchFeaturedProducts,
    searchProductsCall,
    fetchProductsByCategory,
    fetchProductsByProducer,
    fetchProductReviews,
    addProductReview
  };
}

// Cart hooks
export function useCart() {
  const cart = useApiCall<CartDto>();
  const addToCart = useApiCall<CartDto>();
  const updateItem = useApiCall<CartDto>();
  const removeItem = useApiCall<CartDto>();
  const clearCart = useApiCall<void>();
  const syncCart = useApiCall<CartDto>();

  const fetchCart = useCallback(async () => {
    return cart.execute(() => cartService.getCart());
  }, [cart]);

  const addToCartCall = useCallback(async (productId: number, quantity = 1) => {
    return addToCart.execute(() => cartService.addToCart(productId, quantity));
  }, [addToCart]);

  const updateCartItem = useCallback(async (productId: number, quantity: number) => {
    return updateItem.execute(() => cartService.updateCartItem(productId, quantity));
  }, [updateItem]);

  const removeFromCart = useCallback(async (productId: number) => {
    return removeItem.execute(() => cartService.removeFromCart(productId));
  }, [removeItem]);

  const clearCartCall = useCallback(async () => {
    return clearCart.execute(() => cartService.clearCart());
  }, [clearCart]);

  const syncCartCall = useCallback(async (items: any[]) => {
    return syncCart.execute(() => cartService.syncCart(items));
  }, [syncCart]);

  return {
    cart,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
    syncCart,
    fetchCart,
    addToCartCall,
    updateCartItem,
    removeFromCart,
    clearCartCall,
    syncCartCall
  };
}

// Category hooks
export function useCategories() {
  const categories = useCrudApi<CategoryDto>();

  const fetchCategories = useCallback(async () => {
    return categories.list.execute(() => categoryService.getAllCategories());
  }, [categories.list]);

  const fetchCategoryById = useCallback(async (id: number) => {
    return categories.single.execute(() => categoryService.getCategoryById(id));
  }, [categories.single]);

  const fetchCategoryBySlug = useCallback(async (slug: string) => {
    return categories.single.execute(() => categoryService.getCategoryBySlug(slug));
  }, [categories.single]);

  return {
    ...categories,
    fetchCategories,
    fetchCategoryById,
    fetchCategoryBySlug
  };
}

// Order hooks
export function useOrders() {
  const orders = useApiCall<OrderDto[]>();
  const singleOrder = useApiCall<OrderDto>();
  const createOrder = useApiCall<OrderDto>();
  const cancelOrder = useApiCall<OrderDto>();
  const orderHistory = useApiCall<OrderDto[]>();

  const fetchOrders = useCallback(async (params?: any) => {
    return orders.execute(() => orderService.getOrders(params));
  }, [orders]);

  const fetchOrderById = useCallback(async (id: number) => {
    return singleOrder.execute(() => orderService.getOrderById(id));
  }, [singleOrder]);

  const createOrderCall = useCallback(async (orderData: CreateOrderRequestDto) => {
    return createOrder.execute(() => orderService.createOrder(orderData));
  }, [createOrder]);

  const cancelOrderCall = useCallback(async (id: number, reason?: string) => {
    return cancelOrder.execute(() => orderService.cancelOrder(id, reason));
  }, [cancelOrder]);

  const fetchOrderHistory = useCallback(async (params?: any) => {
    return orderHistory.execute(() => orderService.getOrderHistory(params));
  }, [orderHistory]);

  return {
    orders,
    singleOrder,
    createOrder,
    cancelOrder,
    orderHistory,
    fetchOrders,
    fetchOrderById,
    createOrderCall,
    cancelOrderCall,
    fetchOrderHistory
  };
}

// Producer hooks
export function useProducers() {
  const producers = useCrudApi<ProducerDto>();

  const fetchProducers = useCallback(async () => {
    return producers.list.execute(() => producerService.getProducers());
  }, [producers.list]);

  const fetchProducerById = useCallback(async (id: number) => {
    return producers.single.execute(() => producerService.getProducerById(id));
  }, [producers.single]);

  const fetchProducerBySlug = useCallback(async (slug: string) => {
    return producers.single.execute(() => producerService.getProducerBySlug(slug));
  }, [producers.single]);

  const fetchFeaturedProducers = useCallback(async () => {
    return producers.list.execute(() => producerService.getFeaturedProducers());
  }, [producers.list]);

  return {
    ...producers,
    fetchProducers,
    fetchProducerById,
    fetchProducerBySlug,
    fetchFeaturedProducers
  };
}

// Wishlist hooks
export function useWishlist() {
  const wishlist = useApiCall<WishlistDto>();
  const addToWishlist = useApiCall<WishlistDto>();
  const removeFromWishlist = useApiCall<WishlistDto>();
  const clearWishlist = useApiCall<void>();
  const moveToCart = useApiCall<void>();
  const toggleWishlist = useApiCall<{ added: boolean; wishlist: WishlistDto }>();
  const checkInWishlist = useApiCall<boolean>();

  const fetchWishlist = useCallback(async () => {
    return wishlist.execute(() => wishlistService.getWishlist());
  }, [wishlist]);

  const addToWishlistCall = useCallback(async (productId: number) => {
    return addToWishlist.execute(() => wishlistService.addToWishlist(productId));
  }, [addToWishlist]);

  const removeFromWishlistCall = useCallback(async (productId: number) => {
    return removeFromWishlist.execute(() => wishlistService.removeFromWishlist(productId));
  }, [removeFromWishlist]);

  const clearWishlistCall = useCallback(async () => {
    return clearWishlist.execute(() => wishlistService.clearWishlist());
  }, [clearWishlist]);

  const moveToCartCall = useCallback(async (productId: number, quantity = 1) => {
    return moveToCart.execute(() => wishlistService.moveToCart(productId, quantity));
  }, [moveToCart]);

  const toggleWishlistCall = useCallback(async (productId: number) => {
    return toggleWishlist.execute(() => wishlistService.toggleWishlist(productId));
  }, [toggleWishlist]);

  const isProductInWishlist = useCallback(async (productId: number) => {
    return checkInWishlist.execute(() => wishlistService.isProductInWishlist(productId));
  }, [checkInWishlist]);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToCart,
    toggleWishlist,
    checkInWishlist,
    fetchWishlist,
    addToWishlistCall,
    removeFromWishlistCall,
    clearWishlistCall,
    moveToCartCall,
    toggleWishlistCall,
    isProductInWishlist
  };
}
