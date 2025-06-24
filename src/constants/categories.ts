
export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export const PRODUCT_CATEGORIES: CategoryOption[] = [
  { id: 'all', name: 'Todos', slug: 'all' },
  { id: 'cesteria', name: 'Cestería', slug: 'cesteria' },
  { id: 'tallado', name: 'Tallado', slug: 'tallado' },
  { id: 'joyeria', name: 'Joyería', slug: 'joyeria' },
  { id: 'musica', name: 'Música', slug: 'musica' },
  { id: 'textiles', name: 'Textiles', slug: 'textiles' },
  { id: 'ceramica', name: 'Cerámica', slug: 'ceramica' }
];

export const PRICE_RANGES = [
  { id: 'all', name: 'Todos los precios', min: 0, max: Infinity },
  { id: 'low', name: 'Menos de $100.000', min: 0, max: 100000 },
  { id: 'medium', name: '$100.000 - $200.000', min: 100000, max: 200000 },
  { id: 'high', name: 'Más de $200.000', min: 200000, max: Infinity }
];

export const SORT_OPTIONS = [
  { id: 'name', name: 'Nombre (A-Z)' },
  { id: 'price-low', name: 'Precio (Menor a Mayor)' },
  { id: 'price-high', name: 'Precio (Mayor a Menor)' }
];
