# 🔧 Integración y Refactorización Frontend - TesorosChocó

## ✅ Resumen de Cambios Realizados

### 1. **Configuración de API Actualizada**
- Actualizada la URL base para apuntar al backend .NET 9: `http://localhost:5000/api/v1`
- Añadidos headers requeridos según la guía de integración
- Agregados tipos para respuestas ApiResponse y .NET Problem Details

### 2. **Cliente HTTP Mejorado (`ApiClient`)**
- Manejo mejorado de respuestas en formato ApiResponse wrapper
- Headers consistentes (`Content-Type` y `Accept`)
- Mejor procesamiento de respuestas JSON
- Manejo robusto de errores .NET

### 3. **Servicios Refactorizados**

#### **AuthService**
- ✅ Manejo de errores mejorado con try/catch
- ✅ Método `refreshToken()` implementado
- ✅ Métodos `getCurrentUser()` y `updateProfile()` con validación
- ✅ Mensajes de error en español

#### **ProductService**
- ✅ Métodos con manejo de errores consistente
- ✅ Añadidos métodos `getProductReviews()` y `addProductReview()`
- ✅ Método `getProductsByProducer()` implementado

#### **CartService**
- ✅ Validación de cantidades (elimina si cantidad <= 0)
- ✅ Manejo de errores específicos para cada operación
- ✅ Método `syncCart()` para sincronización

#### **CategoryService**
- ✅ CRUD completo con manejo de errores
- ✅ Métodos create, update, delete implementados

#### **OrderService**
- ✅ Método `getOrderHistory()` añadido
- ✅ Manejo de errores específicos
- ✅ Método `cancelOrder()` con razón opcional

#### **WishlistService**
- ✅ Método `toggleWishlist()` implementado
- ✅ Validación de productos en wishlist
- ✅ Método `moveToCart()` funcional

### 4. **Hooks Personalizados**

#### **useApiCall Hook**
```typescript
// Hook principal para llamadas API
const { data, loading, error, execute } = useApiCall<DataType>();

// Hooks especializados
const { data, loading, error, handleError } = useApiCall<ProductDto>();
```

#### **useCrudApi Hook**
```typescript
// Para operaciones CRUD completas
const { list, single, create, update, remove } = useCrudApi<ProductDto>();
```

#### **usePaginatedApi Hook**
```typescript
// Para manejo de paginación
const { 
  data, 
  currentPage, 
  totalPages, 
  fetchPage, 
  nextPage, 
  prevPage 
} = usePaginatedApi<ProductDto>();
```

### 5. **Hooks de Servicios Específicos**
- `useAuth()` - Para autenticación
- `useProducts()` - Para productos
- `useCart()` - Para carrito de compras
- `useCategories()` - Para categorías
- `useOrders()` - Para órdenes
- `useProducers()` - Para productores
- `useWishlist()` - Para lista de deseos

### 6. **Manejo de Errores Mejorado**
- `ErrorHandler` legacy mantenido para compatibilidad
- `EnhancedErrorHandler` con soporte completo para .NET Problem Details
- Mensajes de error específicos para cada código de estado HTTP
- Logging mejorado para desarrollo y producción

### 7. **Tipos TypeScript Actualizados**
- Añadido `pageSize` a `ProductFilters`
- Añadido `page` y `pageSize` a `SearchParams`
- Tipos `.NET` específicos para respuestas de autenticación
- Interfaces para Problem Details y validación

## 🚀 Cómo Usar los Servicios Refactorizados

### Ejemplo: Componente de Productos
```typescript
import React, { useEffect } from 'react';
import { useProducts } from '@/hooks/useApi';

const ProductList: React.FC = () => {
  const { 
    products, 
    featuredProducts,
    fetchProducts, 
    fetchFeaturedProducts 
  } = useProducts();

  useEffect(() => {
    // Cargar productos con paginación
    fetchProducts({ featured: true }, 1, 10);
    
    // Cargar productos destacados
    fetchFeaturedProducts();
  }, []);

  if (products.loading) return <div>Cargando productos...</div>;
  if (products.error) return <div>Error: {products.error}</div>;

  return (
    <div>
      <h2>Productos Destacados</h2>
      {featuredProducts.data?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
      
      <h2>Todos los Productos</h2>
      {products.data?.data.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

### Ejemplo: Componente de Autenticación
```typescript
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useApi';

const LoginForm: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login.execute(credentials);
    if (result) {
      console.log('Login exitoso!');
    }
  };

  if (isAuthenticated()) {
    return <div>Ya estás autenticado</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ 
          ...prev, 
          email: e.target.value 
        }))}
        placeholder="Email"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ 
          ...prev, 
          password: e.target.value 
        }))}
        placeholder="Contraseña"
      />
      <button type="submit" disabled={login.loading}>
        {login.loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
      {login.error && <div className="error">{login.error}</div>}
    </form>
  );
};
```

### Ejemplo: Componente de Carrito
```typescript
import React, { useEffect } from 'react';
import { useCart } from '@/hooks/useApi';

const CartComponent: React.FC = () => {
  const { 
    cart, 
    fetchCart, 
    addToCartCall, 
    updateCartItem, 
    removeFromCart 
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = async (productId: number) => {
    await addToCartCall(productId, 1);
    // El carrito se actualiza automáticamente
  };

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    await updateCartItem(productId, quantity);
  };

  if (cart.loading) return <div>Cargando carrito...</div>;

  return (
    <div>
      <h2>Mi Carrito</h2>
      {cart.data?.items.map(item => (
        <div key={item.productId}>
          <span>{item.product?.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(
              item.productId, 
              parseInt(e.target.value)
            )}
          />
          <button onClick={() => removeFromCart(item.productId)}>
            Eliminar
          </button>
        </div>
      ))}
      <div>Total: ${cart.data?.total}</div>
    </div>
  );
};
```

## 📋 Próximos Pasos

1. **Actualizar Componentes Existentes**: Migrar componentes que usan llamadas directas a servicios para usar los nuevos hooks
2. **Configurar Variables de Entorno**: Asegurar que `VITE_API_BASE_URL` apunte al backend correcto
3. **Testear Integración**: Verificar que todos los endpoints del backend respondan correctamente
4. **Implementar Interceptors Globales**: Para manejo automático de autenticación y errores
5. **Añadir Loading States**: Implementar estados de carga globales usando los hooks

## 🔧 Configuración Requerida

### Variables de Entorno (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Dependencias (ya instaladas)
- axios (opcional, actualmente usando fetch)
- React hooks existentes

## ✨ Beneficios de la Refactorización

1. **Consistencia**: Todos los servicios siguen el mismo patrón
2. **Manejo de Errores**: Errores específicos y mensajes en español
3. **Reutilización**: Hooks reutilizables para diferentes componentes
4. **TypeScript**: Tipado fuerte para mejor desarrollo
5. **Compatibilidad .NET**: Soporte completo para respuestas .NET 9
6. **Escalabilidad**: Fácil añadir nuevos servicios siguiendo el patrón
7. **Debugging**: Logging mejorado para desarrollo y producción
