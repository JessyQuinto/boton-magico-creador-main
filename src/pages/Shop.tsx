
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { PRODUCT_CATEGORIES, PRICE_RANGES, SORT_OPTIONS } from "@/constants/categories";

// Mock data optimizada
const mockProducts = [
  {
    id: 1,
    name: "Canasta Werregue Tradicional",
    slug: "canasta-werregue-tradicional",
    price: 145000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWuak5jgWo871dE3jZNJ_8aDHOp10aVRkJSkUubDDhHyzSfadTmqTTcJDIHCG34XHuEsoQr399x-2AuCDM8q7izUxr7VFLFCePR_mB7ddHoZG1Y36WtsNHFr6oixC2uP4kqrELEFtkEkmwBJDSAirr7D1bnx5ViffcgCxLkRXwvLNuN-7XKOtA02d6kBcJw4spJ-b_xDhfs5GeFSuBp_iHI3yLsjxR7jMwh0KGntIBtUruBRdRqgwsR7KY2QXjcBcaD-zOcolZ",
    description: "Hermosa canasta tejida con fibra de werregue",
    category: "cesteria",
    artisan: "María Eugenia Rentería",
    origin: "Chocó"
  },
  {
    id: 2,
    name: "Máscara Ceremonial Tallada",
    slug: "mascara-ceremonial-tallada", 
    price: 220000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfdkZHi6mJGrVFvipEnHYxSNdT4c8GZl2Q3UuotA6-ftPzmdTj5hg2KQyYG9M2ltIntGZytn9d1ucB5pbYoQtBGx8oUYKEfL2scolrGal2IJ9Zi4zs_kOYoouEokw8K2t8BsCkcsFY_CPTJQpnZcgVC8-GlDj3CLPhJqjKZ6kDMXgI_xt9_FWXbDbQv7z5_KIFXW3n-QpyZ_v0UDu3V-naoEIISoC4vvW0cuJhrQT592C1P_ag_tOuEG4xYjFZBkR_HbL9vZyQ",
    description: "Máscara tallada en madera de cativo",
    category: "tallado",
    artisan: "Esteban Mosquera",
    origin: "Chocó"
  },
  {
    id: 3,
    name: "Collar de Semillas Nativas",
    slug: "collar-semillas-nativas",
    price: 85000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACdHKq8dpJVu1OFr11VadzGaSw98CpGJKBtrV90esdnvOmcQhpA5qYnSzOVt_cJ1QyDspxrquXaWnxVN0lqO-OPH5IzXucoqwW0xA4xKVc7KJ-v5kpbpmVbg4ZGIn6VgTNNZ-WZ7Avagzer_SYt1Z8zE3WXkk3Qsbi21wT18nw0hGZTJUiJb3GwcVGzpB6yNbIE32LDlGUjdBO4gB9HK5Z_NqVyZKgse-ZVxv2giWIDYgBsBs6vzTq-HPIw47UR47HGH9iq3qk",
    description: "Collar elaborado con semillas de la selva",
    category: "joyeria",
    artisan: "Yurany Palacios",
    origin: "Chocó"
  },
  {
    id: 4,
    name: "Tambor Currulao Artesanal",
    slug: "tambor-currulao-artesanal",
    price: 180000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRdgRfqoOraHvKi0q2qUDAVJBVJtdadXA7aFZ1M1eDEIsi03aVASS8H2K0tPFbMJe0eh35A5jWP9sMeVNuQIYEoINt7kJC2erc8vUwXB5wikkd9e3VFoRmLaI6YctlzDQaZAK9MJs6yfOAtCBBRTh2pNKEglQIac794d-s6OYfpSkelReNobGQ7dJg17hoiZIoVVWslSbATj-1Rw2ec9eHOBrdsAhINbaaTN8Dz77LYj2gi6VhWc8XQ4j8cBb-asVmePVmll65",
    description: "Tambor tradicional para currulao",
    category: "musica",
    artisan: "Carlos Moreno",
    origin: "Chocó"
  },
  {
    id: 5,
    name: "Tejido Tradicional Chocoano",
    slug: "tejido-tradicional-chocoano",
    price: 95000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuRqtTIaVTX8ggRhtSGkmfAbVfqwMCkX0x_QG7jplgAC7I2-tApvb5ZZBtOrPkkCHy50Y5YLT8GWQpUTg0UZdPkhn0a9YifV3YTpcncS_z0cBp2_Qu6CKgAnTJlWhKhgB4rQ-RarJghFH2IrdSAJtS2laKfGCULR92JYexkS2gnKT-bVHA7ZkGGa2HFIPbQTr6b5NiHb9Xop2OBhZdKP51yS4od6aSMl8kcBNiIebDvnWcRkLBoe1bHIZg8oqMacDribbtutVr",
    description: "Textil artesanal con patrones tradicionales",
    category: "textiles",
    artisan: "Ana Lucía Moreno",
    origin: "Chocó"
  },
  {
    id: 6,
    name: "Vasija de Barro Tradicional",
    slug: "vasija-barro-tradicional",
    price: 120000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4NKKNBrdjKmefojYoBUYHShZWMp2RSCAqNnFxVnvbrgK3fuCbv1feF6P37mGEkpnOYR59lp8McDKZfjZPPoXWqM6EoB7QR4uMdhr4KbwGxRJYMRk4Zqqe-sD9igP_rSKJ3CEvBxwMD31c1aKVVOrYXDtmutc5i3Ttm_Pt88DZxJGOGHCpBHgIWUWOZbbb3v4-EHQ9irtPxIDXshXCCBy30gSvMrMBUTFQQKDyfGohFVlSztaZDf1rTFvVOLERpQjc5RYmXkSt",
    description: "Vasija de barro cocido a mano",
    category: "ceramica",
    artisan: "Roberto Sinisterra",
    origin: "Chocó"
  }
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    artisan: "",
    sortBy: "name",
    search: searchParams.get('search') || ""
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Memoized filtering logic
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = filters.category === "all" || product.category === filters.category;
      const searchMatch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(filters.search.toLowerCase());
      const artisanMatch = !filters.artisan || product.artisan.toLowerCase().includes(filters.artisan.toLowerCase());
      
      let priceMatch = true;
      if (filters.priceRange !== "all") {
        const priceRange = PRICE_RANGES.find(range => range.id === filters.priceRange);
        if (priceRange) {
          priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
        }
      }
      
      return categoryMatch && searchMatch && artisanMatch && priceMatch;
    });

    // Optimized sorting
    if (filters.sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      artisan: "",
      sortBy: "name",
      search: ""
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-32">
          <LoadingSpinner size="lg" text="Cargando productos..." />
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
              <BreadcrumbPage>Tienda</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-8">
          Nuestra Tienda
        </h1>

        {/* Controles superiores optimizados */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0 gap-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden border-action text-action hover:bg-action hover:text-white"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-action hover:bg-action/90" : "border-action text-action hover:bg-action hover:text-white"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-action hover:bg-action/90" : "border-action text-action hover:bg-action hover:text-white"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="sort" className="text-primary font-medium whitespace-nowrap">
              Ordenar por:
            </Label>
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map(option => (
                  <SelectItem key={option.id} value={option.id}>{option.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros optimizado */}
          <div className={`lg:w-1/4 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-background border border-secondary/20 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-action hover:text-action/80">
                  Limpiar
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="search" className="text-primary font-medium mb-2 block">
                    Buscar
                  </Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Buscar productos..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="border-secondary/30 focus:border-action"
                  />
                </div>

                <div>
                  <Label className="text-primary font-medium mb-2 block">
                    Categoría
                  </Label>
                  <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_CATEGORIES.map(category => (
                        <SelectItem key={category.id} value={category.slug}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-primary font-medium mb-2 block">
                    Rango de Precio
                  </Label>
                  <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rango" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRICE_RANGES.map(range => (
                        <SelectItem key={range.id} value={range.id}>{range.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="artisan" className="text-primary font-medium mb-2 block">
                    Artesano
                  </Label>
                  <Input
                    id="artisan"
                    type="text"
                    placeholder="Buscar por artesano..."
                    value={filters.artisan}
                    onChange={(e) => handleFilterChange("artisan", e.target.value)}
                    className="border-secondary/30 focus:border-action"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Grid de productos optimizado */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                  No se encontraron productos
                </h2>
                <p className="text-secondary mb-8">
                  Intenta ajustar los filtros o la búsqueda
                </p>
                <Button onClick={clearFilters} className="bg-action hover:bg-action/90 text-white">
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-secondary">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                  </p>
                </div>

                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
                  : "space-y-6"
                }>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
