
import { CartItem as BaseCartItem, User as BaseUser, Product, ProductWithStory } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem extends BaseCartItem {
  total: number;
}

interface Address {
  id: string;
  name: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone?: string;
  isDefault?: boolean;
}

export type { Address };

interface User extends BaseUser {
  firstName: string;
  lastName: string;
  avatar?: string;
  addresses?: Address[];
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  isLoading: boolean;
}

interface SearchFilters {
  category: string;
  priceRange: string;
  artisan: string;
  sortBy: string;
  search: string;
  inStock?: boolean;
  region?: string;
}

interface Store {
  // Cart state
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;

  // Auth state
  auth: AuthState;

  // Wishlist state
  wishlist: (Product | ProductWithStory)[];

  // UI state
  searchQuery: string;
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;

  // Cart actions
  addToCart: (item: BaseCartItem) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  completeOrder: () => void;

  // Auth actions
  login: (userData: User, token?: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setAuthLoading: (loading: boolean) => void;

  // Address actions
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Wishlist actions
  addToWishlist: (product: Product | ProductWithStory) => void;
  removeFromWishlist: (productId: number) => void;

  // UI actions
  setSearchQuery: (query: string) => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
}

const initialFilters: SearchFilters = {
  category: "all",
  priceRange: "all",
  artisan: "",
  sortBy: "name",
  search: "",
  inStock: true,
  region: "all"
};

const calculateCartTotals = (items: CartItem[]) => {
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.total, 0);
  return { count, total };
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,
      auth: {
        user: null,
        isLoggedIn: false,
        token: null,
        isLoading: false
      },
      wishlist: [],
      searchQuery: '',
      filters: initialFilters,
      isLoading: false,
      error: null,

      // Cart actions
      addToCart: (item) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

        let newCartItems: CartItem[];

        if (existingItem) {
          newCartItems = cartItems.map(cartItem =>
            cartItem.id === item.id
              ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
                total: (cartItem.quantity + item.quantity) * cartItem.price
              }
              : cartItem
          );
        } else {
          const newItem: CartItem = {
            ...item,
            total: item.price * item.quantity
          };
          newCartItems = [...cartItems, newItem];
        }

        const { count, total } = calculateCartTotals(newCartItems);

        set({
          cartItems: newCartItems,
          cartCount: count,
          cartTotal: total
        });
      },

      removeFromCart: (productId) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter(item => item.id !== productId);
        const { count, total } = calculateCartTotals(newCartItems);

        set({
          cartItems: newCartItems,
          cartCount: count,
          cartTotal: total
        });
      },

      updateCartQuantity: (productId, quantity) => {
        if (quantity < 1) return;

        const { cartItems } = get();
        const newCartItems = cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity, total: quantity * item.price }
            : item
        );

        const { count, total } = calculateCartTotals(newCartItems);

        set({
          cartItems: newCartItems,
          cartCount: count,
          cartTotal: total
        });
      },

      clearCart: () => {
        set({ cartItems: [], cartCount: 0, cartTotal: 0 });
      },

      completeOrder: () => {
        set({ cartItems: [], cartCount: 0, cartTotal: 0 });
      },

      // Auth actions
      login: (userData, token) => {
        set({
          auth: {
            user: userData,
            isLoggedIn: true,
            token: token || null,
            isLoading: false
          }
        });
      },

      logout: () => {
        set({
          auth: {
            user: null,
            isLoggedIn: false,
            token: null,
            isLoading: false
          }
        });
      },

      updateUser: (userData) => {
        const { auth } = get();
        if (auth.user) {
          set({
            auth: {
              ...auth,
              user: { ...auth.user, ...userData }
            }
          });
        }
      },

      setAuthLoading: (loading) => {
        const { auth } = get();
        set({
          auth: {
            ...auth,
            isLoading: loading
          }
        });
      },

      // Address actions
      addAddress: (addressData) => {
        const { auth } = get();
        if (!auth.user) return;

        const newAddress: Address = {
          ...addressData,
          id: Date.now().toString(),
        };

        const addresses = auth.user.addresses || [];
        const updatedAddresses = [...addresses, newAddress];

        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },

      updateAddress: (id, addressData) => {
        const { auth } = get();
        if (!auth.user?.addresses) return;

        const updatedAddresses = auth.user.addresses.map(addr =>
          addr.id === id ? { ...addr, ...addressData } : addr
        );

        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },

      deleteAddress: (id) => {
        const { auth } = get();
        if (!auth.user?.addresses) return;

        const updatedAddresses = auth.user.addresses.filter(addr => addr.id !== id);

        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },

      setDefaultAddress: (id) => {
        const { auth } = get();
        if (!auth.user?.addresses) return;

        const updatedAddresses = auth.user.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === id
        }));

        set({
          auth: {
            ...auth,
            user: {
              ...auth.user,
              addresses: updatedAddresses
            }
          }
        });
      },

      // Wishlist actions
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.find(item => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },

      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter(item => item.id !== productId) });
      },

      // UI actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      updateFilters: (newFilters) => {
        const { filters } = get();
        set({ filters: { ...filters, ...newFilters } });
      }
    }),
    {
      name: 'choco-artesanal-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartCount: state.cartCount,
        cartTotal: state.cartTotal,
        auth: state.auth,
        wishlist: state.wishlist,
        filters: state.filters
      })
    }
  )
);

// Optimized selectors
export const useAuth = () => useStore(state => state.auth);
export const useCartItems = () => useStore(state => state.cartItems);
export const useCartCount = () => useStore(state => state.cartCount);
export const useCartTotal = () => useStore(state => state.cartTotal);
export const useWishlist = () => useStore(state => state.wishlist);
