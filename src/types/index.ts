
// Core Application Types

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Producer {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
  featured: boolean;
  foundedYear: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  categoryId: number;
  producerId: number;
  stock: number;
  featured: boolean;
  rating?: number;
  createdAt: string;
  artisan?: string;
  origin?: string;
}

export interface ProductWithStory extends Product {
  story?: {
    id: number;
    title: string;
    content: string;
    author: string;
    readTime: string;
    culturalSignificance: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  address?: string;
  phone?: string;
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  description: string;
  artisan?: string;
  origin?: string;
  product?: Product;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}
