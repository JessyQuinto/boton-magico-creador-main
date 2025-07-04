import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductReviews from "@/components/ProductReviews";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useProducts, useWishlist } from "@/hooks/useApi";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import { Heart, RotateCcw, Shield, ShoppingCart, Star, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    singleProduct,
    fetchProductBySlug
  } = useProducts();

  const {
    addToCartCall,
    fetchCart
  } = useCart();

  const {
    wishlist,
    addToWishlistCall,
    removeFromWishlistCall,
    fetchWishlist
  } = useWishlist();

  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    }
    fetchCart();
    fetchWishlist();
  }, [slug, fetchProductBySlug, fetchCart, fetchWishlist]);

  const product = singleProduct.data;
  const isLoading = singleProduct.loading;
  const error = singleProduct.error;

  const inWishlist = useMemo(() =>
    product ? wishlist.data?.products?.some(item => item.id === product.id) : false,
    [product, wishlist.data]
  );

  // Optimized image array with fallback
  const images = useMemo(() =>
    product?.images || [product?.image || ''].filter(Boolean),
    [product]
  );
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCartCall(product.id, quantity);
      showSuccess(`¡${product.name} añadido al carrito!`);
    } catch (error) {
      showError('Error al añadir al carrito');
    }
  };

  const handleWishlistToggle = async () => {
    if (!product) return;

    try {
      if (inWishlist) {
        await removeFromWishlistCall(product.id);
        showSuccess(`${product.name} eliminado de favoritos`);
      } else {
        await addToWishlistCall(product.id);
        showSuccess(`${product.name} añadido a favoritos!`);
      }
    } catch (error) {
      showError('Error al actualizar favoritos');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner text="Cargando producto..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {error ? `Error: ${error}` : 'Producto no encontrado'}
            </h1>
            <p className="text-gray-600">
              El producto que buscas no está disponible o ha sido movido.
            </p>
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
              <BreadcrumbLink href="/shop">Tienda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary-action' : 'border-transparent'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Vista ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary-secondary">
                  {product.rating || 0} (24 reseñas)
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-text mb-2">
                {product.name}
              </h1>
              {(product.artisan || product.origin) && (
                <p className="text-primary-secondary">
                  {product.artisan && (
                    <>Por <span className="font-medium">{product.artisan}</span></>
                  )}
                  {product.artisan && product.origin && ' • '}
                  {product.origin}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-2xl md:text-3xl font-bold text-primary-action">
                ${product.price.toLocaleString()}
              </span>
              {product.discountedPrice && (
                <>
                  <span className="text-lg text-primary-secondary line-through">
                    ${product.discountedPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    -{Math.round((1 - product.price / product.discountedPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            <p className="text-primary-secondary text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-primary-background rounded-xl">
              <div>
                <h4 className="font-semibold text-primary-text mb-2">Detalles del Producto</h4>
                <ul className="space-y-1 text-sm text-primary-secondary">
                  <li><strong>Stock:</strong> {product.stock} unidades</li>
                  {product.origin && <li><strong>Origen:</strong> {product.origin}</li>}
                  {product.artisan && <li><strong>Artesano:</strong> {product.artisan}</li>}
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-primary-secondary">
                  <Truck className="h-4 w-4" />
                  <span>Envío gratis a toda Colombia</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-primary-secondary">
                  <Shield className="h-4 w-4" />
                  <span>Garantía de autenticidad</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-primary-secondary">
                  <RotateCcw className="h-4 w-4" />
                  <span>Devoluciones en 30 días</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-primary-text">Cantidad:</label>
                <div className="flex items-center border border-primary-secondary/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-primary-secondary hover:text-primary-action"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-primary-secondary hover:text-primary-action"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary-action hover:bg-primary-action/90 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                </Button>
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  size="lg"
                  className={`border-primary-action ${inWishlist
                      ? 'bg-primary-action text-white'
                      : 'text-primary-action hover:bg-primary-action hover:text-white'
                    } border-2 shadow-sm hover:shadow-md transition-all`}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Story Section - Disabled until story is available in API */}
        {/*product.story && (
          <div className="mb-12 p-8 bg-gradient-to-r from-primary-background to-secondary/5 rounded-xl border border-secondary/10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-primary-action rounded-full">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary-text">{product.story.title}</h3>
                <p className="text-sm text-primary-secondary">
                  Por {product.story.author} • {product.story.readTime}
                </p>
              </div>
            </div>
            <p className="text-primary-secondary text-lg leading-relaxed mb-4">
              {product.story.content}
            </p>
            <div className="p-4 bg-white rounded-lg border-l-4 border-primary-action">
              <p className="font-medium text-primary-text">Significado Cultural</p>
              <p className="text-sm text-primary-secondary mt-1">
                {product.story.culturalSignificance}
              </p>
            </div>
          </div>
        )*/}

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
