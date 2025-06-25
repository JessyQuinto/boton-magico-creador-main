
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/hooks/useApi";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";

const Wishlist = () => {
  const { 
    wishlist,
    fetchWishlist
  } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const wishlistItems = wishlist.data?.products || [];
  const isLoading = wishlist.loading;
  const error = wishlist.error;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner text="Cargando favoritos..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Error al cargar favoritos: {error}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Lista de Favoritos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center space-x-3 mb-8">
          <Heart className="h-8 w-8 text-action" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Mis Favoritos
          </h1>
          {wishlistItems.length > 0 && (
            <span className="bg-action text-white text-sm px-3 py-1 rounded-full">
              {wishlistItems.length}
            </span>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Heart className="h-24 w-24 text-secondary/50 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Tu lista de favoritos está vacía
              </h2>
              <p className="text-secondary mb-8 text-lg">
                Explora nuestra tienda y guarda los productos que más te gusten para encontrarlos fácilmente después.
              </p>
              <Button asChild className="bg-action hover:bg-action/90 text-white">
                <Link to="/shop" className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Explorar Tienda</span>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
              <p className="text-secondary text-lg">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'producto guardado' : 'productos guardados'}
              </p>
              <Button asChild variant="outline" className="border-action text-action hover:bg-action hover:text-white">
                <Link to="/shop" className="flex items-center space-x-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Continuar Comprando</span>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {wishlistItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
