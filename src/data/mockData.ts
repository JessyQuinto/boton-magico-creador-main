// Mock data for the Campo Artesano Market
import { Category, Producer, Product, User, CartItem, Order, OrderDetail } from '@/types'; // Assuming @/types resolves to src/types

// Mock Categories
export const categories: Category[] = [
  {
    id: 1,
    name: "Tejidos",
    slug: "tejidos",
    description: "Productos tejidos a mano por artesanos locales",
    image: "https://images.unsplash.com/photo-1620219365994-adaa6e714a90?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Cerámicas",
    slug: "ceramicas",
    description: "Cerámicas tradicionales hechas con técnicas ancestrales",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Alimentos",
    slug: "alimentos",
    description: "Productos alimenticios orgánicos y artesanales",
    image: "https://images.unsplash.com/photo-1627916607164-7b20241db958?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Joyería",
    slug: "joyeria",
    description: "Joyas hechas a mano con materiales locales",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a2ea7?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Decoración",
    slug: "decoracion",
    description: "Artículos decorativos artesanales para el hogar",
    image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=2009&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Instrumentos",
    slug: "instrumentos",
    description: "Instrumentos musicales tradicionales",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
  }
];

// Mock Producers
export const producers: Producer[] = [
  {
    id: 1,
    name: "Artesanías María",
    description: "Familia de artesanos con más de 30 años de experiencia en tejidos tradicionales.",
    location: "Boyacá",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    foundedYear: 1990
  },
  {
    id: 2,
    name: "Cerámica Los Andes",
    description: "Cooperativa de artesanos especializados en cerámica con técnicas ancestrales.",
    location: "Nariño",
    image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    foundedYear: 2005
  },
  {
    id: 3,
    name: "Dulces del Campo",
    description: "Emprendimiento familiar dedicado a la producción de alimentos orgánicos y artesanales.",
    location: "Antioquia",
    image: "https://images.unsplash.com/photo-1607877742244-6f8aa943d680?q=80&w=2018&auto=format&fit=crop",
    featured: false,
    foundedYear: 2015
  },
  {
    id: 4,
    name: "Joyas Ancestrales",
    description: "Artesanos que combinan técnicas antiguas con diseños modernos en joyería.",
    location: "Valle del Cauca",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1974&auto=format&fit=crop",
    featured: true,
    foundedYear: 2010
  },
  {
    id: 5,
    name: "Arte en Madera",
    description: "Familia dedicada a la talla en madera y creación de artículos decorativos.",
    location: "Cundinamarca",
    image: "https://images.unsplash.com/photo-1613337783732-3d1faa622d11?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    foundedYear: 1998
  }
];

// Mock Products
export const products: Product[] = [
  {
    id: 1,
    name: "Mochila Wayuu Multicolor",
    slug: "mochila-wayuu-multicolor",
    description: "Mochila tejida a mano por artesanas wayuu con patrones tradicionales y colores vibrantes.",
    price: 120000,
    image: "https://images.unsplash.com/photo-1584917865442-de3573083c59?q=80&w=2070&auto=format&fit=crop",
    categoryId: 1,
    producerId: 1,
    stock: 15,
    featured: true,
    rating: 4.8,
    createdAt: "2023-01-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Vasija de cerámica negra",
    slug: "vasija-ceramica-negra",
    description: "Vasija decorativa elaborada con técnica de cerámica negra, cocida en horno de leña.",
    price: 85000,
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=2070&auto=format&fit=crop",
    categoryId: 2,
    producerId: 2,
    stock: 8,
    featured: true,
    rating: 4.9,
    createdAt: "2023-02-10T00:00:00Z"
  },
  {
    id: 3,
    name: "Mermelada artesanal de mora",
    slug: "mermelada-artesanal-mora",
    description: "Mermelada 100% natural, elaborada con moras orgánicas cultivadas en altura.",
    price: 15000,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2012&auto=format&fit=crop",
    categoryId: 3,
    producerId: 3,
    stock: 30,
    featured: false,
    rating: 4.7,
    createdAt: "2023-03-05T00:00:00Z"
  },
  {
    id: 4,
    name: "Collar de semillas y plata",
    slug: "collar-semillas-plata",
    description: "Hermoso collar combinando semillas naturales y detalles en plata, diseño único.",
    price: 65000,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1974&auto=format&fit=crop",
    categoryId: 4,
    producerId: 4,
    stock: 12,
    featured: true,
    rating: 4.6,
    createdAt: "2023-01-20T00:00:00Z"
  },
  {
    id: 5,
    name: "Tapiz decorativo en telar",
    slug: "tapiz-decorativo-telar",
    description: "Tapiz tejido en telar vertical con lana de oveja teñida con tintes naturales.",
    price: 180000,
    image: "https://images.unsplash.com/photo-1551913902-c92207136625?q=80&w=2069&auto=format&fit=crop",
    categoryId: 5,
    producerId: 1,
    stock: 5,
    featured: false,
    rating: 4.9,
    createdAt: "2023-02-28T00:00:00Z"
  },
  {
    id: 6,
    name: "Ruana tradicional en lana",
    slug: "ruana-tradicional-lana",
    description: "Ruana tejida a mano en telar horizontal con lana virgen de oveja.",
    price: 250000,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2010&auto=format&fit=crop",
    categoryId: 1,
    producerId: 1,
    stock: 10,
    featured: true,
    rating: 4.8,
    createdAt: "2023-01-10T00:00:00Z"
  },
  {
    id: 7,
    name: "Plato decorativo en cerámica",
    slug: "plato-decorativo-ceramica",
    description: "Plato decorativo pintado a mano con motivos precolombinos.",
    price: 95000,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    categoryId: 2,
    producerId: 2,
    stock: 7,
    featured: false,
    rating: 4.7,
    createdAt: "2023-03-15T00:00:00Z"
  },
  {
    id: 8,
    name: "Miel de abejas pura",
    slug: "miel-abejas-pura",
    description: "Miel 100% pura de abejas criadas en bosques nativos, sin aditivos.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1595348020949-87cdfbb44174?q=80&w=2070&auto=format&fit=crop",
    categoryId: 3,
    producerId: 3,
    stock: 40,
    featured: true,
    rating: 4.9,
    createdAt: "2023-01-25T00:00:00Z"
  },
  {
    id: 9,
    name: "Aretes en filigrana",
    slug: "aretes-filigrana",
    description: "Aretes elaborados en plata con técnica de filigrana, tradición de Mompox.",
    price: 75000,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1974&auto=format&fit=crop",
    categoryId: 4,
    producerId: 4,
    stock: 20,
    featured: false,
    rating: 4.8,
    createdAt: "2023-02-05T00:00:00Z"
  },
  {
    id: 10,
    name: "Máscara tallada en madera",
    slug: "mascara-tallada-madera",
    description: "Máscara decorativa tallada a mano en madera nativa, inspirada en rituales ancestrales.",
    price: 110000,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    categoryId: 5,
    producerId: 5,
    stock: 6,
    featured: true,
    rating: 4.7,
    createdAt: "2023-03-01T00:00:00Z"
  },
  {
    id: 11,
    name: "Flauta andina en bambú",
    slug: "flauta-andina-bambu",
    description: "Flauta tradicional andina elaborada en bambú, afinada manualmente.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1461784180009-21121b2f204c?q=80&w=1910&auto=format&fit=crop",
    categoryId: 6,
    producerId: 5,
    stock: 15,
    featured: false,
    rating: 4.6,
    createdAt: "2023-02-20T00:00:00Z"
  },
  {
    id: 12,
    name: "Poncho tradicional",
    slug: "poncho-tradicional",
    description: "Poncho tejido en telar con diseños geométricos inspirados en culturas ancestrales.",
    price: 220000,
    image: "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?q=80&w=1470&auto=format&fit=crop",
    categoryId: 1,
    producerId: 1,
    stock: 8,
    featured: false,
    rating: 4.9,
    createdAt: "2023-01-05T00:00:00Z"
  }
];

// Function to get product by ID
export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

// Function to get producer by ID
export const getProducerById = (id: number) => {
  return producers.find(producer => producer.id === id);
};

// Function to get category by ID
export const getCategoryById = (id: number) => {
  return categories.find(category => category.id === id);
};

// Function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Function to get products by category
export const getProductsByCategory = (categoryId: number) => {
  return products.filter(product => product.categoryId === categoryId);
};

// Function to search products by name
export const searchProductsByName = (query: string): Product[] => {
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.description.toLowerCase().includes(query.toLowerCase())
  );
};

export const getProductsByProducer = (producerId: number): Product[] => {
  return products.filter(product => product.producerId === producerId);
};
