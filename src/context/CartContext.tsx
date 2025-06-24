
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Product, CartItem } from '@/types'; // Import CartItem from types
import { getProductById } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

// Export CartItem for other components to use
export type { CartItem } from '@/types';

// Export for testing
export interface CartState {
  items: CartItem[];
  total: number;
}

// Export for testing
export type CartAction = 
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }  // product id
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

// Export for testing
export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.product?.discountedPrice || item.product?.price || item.price;
    return total + price * item.quantity;
  }, 0);
};

// Export for testing
export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      
      // Item doesn't exist, add it
      const newCartItem: CartItem = {
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.discountedPrice || product.price,
        image: product.image,
        quantity,
        slug: product.slug,
        description: product.description,
        artisan: product.artisan,
        origin: product.origin,
        product
      };
      const updatedItems = [...state.items, newCartItem];
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.productId !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or less, remove item
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId });
      }
      
      const updatedItems = state.items.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    
    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'campo-artesano-cart';

// Save cart items IDs and quantities only
const saveCartToStorage = (items: CartItem[]) => {
  const simplifiedItems = items.map(item => ({
    productId: item.productId,
    quantity: item.quantity
  }));
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(simplifiedItems));
};

// Load and reconstruct cart items from storage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedItems) return [];
    
    const parsedItems = JSON.parse(storedItems) as { productId: number; quantity: number }[];
    
    // Reconstruct cart items with full product data
    const cartItems = parsedItems.map(item => {
      const product = getProductById(item.productId);
      if (!product) return null;
      
      return {
        id: product.id,
        productId: item.productId,
        name: product.name,
        price: product.discountedPrice || product.price,
        image: product.image,
        quantity: item.quantity,
        slug: product.slug,
        description: product.description,
        artisan: product.artisan,
        origin: product.origin,
        product
      } as CartItem;
    }).filter(Boolean) as CartItem[];
    
    return cartItems;
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return [];
  }
};

export interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialItems = React.useMemo(() => loadCartFromStorage(), []);
  const initialState: CartState = {
    items: initialItems,
    total: calculateTotal(initialItems)
  };
  
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { toast } = useToast();
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(state.items);
  }, [state.items]);
  
  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast({
      title: "Añadido al carrito",
      description: `${product.name} (${quantity}) añadido al carrito`,
    });
  };
  
  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Carrito vacío",
      description: "Todos los productos han sido eliminados del carrito",
    });
  };

  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <CartContext.Provider 
      value={{ 
        items: state.items, 
        total: state.total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Export useCart hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
