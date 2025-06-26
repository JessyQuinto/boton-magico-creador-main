import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ui/theme-provider';
import ErrorBoundary from '@/components/ErrorBoundary';
import CookieBanner from '@/components/CookieBanner';
import DevModeIndicator from '@/components/DevModeIndicator';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import GuestCheckout from '@/pages/GuestCheckout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import Stories from '@/pages/Stories';
import StoryDetail from '@/pages/StoryDetail';
import NotFound from '@/pages/NotFound';
import Terms from '@/pages/Terms';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Wishlist from '@/pages/Wishlist';

// Optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 3,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="choco-artesanal-theme">
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/producto/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/guest-checkout" element={<GuestCheckout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/story/:id" element={<StoryDetail />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieBanner />
              <DevModeIndicator />
              <Toaster />
            </div>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
