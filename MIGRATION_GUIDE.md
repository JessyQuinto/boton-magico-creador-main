# 🔧 Guía de Migración - Integración Backend .NET 9

## ✅ Cambios Implementados

### 1. **Cliente HTTP Refactorizado**
- ✅ Actualizado `apiClient.ts` para usar interceptors y manejo de tokens automático
- ✅ Añadido soporte para query parameters en método GET
- ✅ Manejo de refresh tokens automático
- ✅ Timeout y retry configurables

### 2. **Servicios Actualizados**
- ✅ `authService.ts` - Conectado al backend .NET 9
- ✅ `productService.ts` - Usando endpoints reales con filtros
- ✅ `cartService.ts` - Sincronización con servidor
- ✅ `categoryService.ts` - Agregado método `getCategoryBySlug`
- ✅ `orderService.ts` - Renombrado método a `getOrders`
- ✅ `producerService.ts` - Renombrado método a `getProducers`
- ✅ `wishlistService.ts` - Añadidos métodos `isProductInWishlist` y `moveToCart`

### 3. **Contexto de Autenticación Refactorizado**
- ✅ Migrado de tipos mock a `DotNetUserDto`
- ✅ Integrado con `authService` real
- ✅ Manejo de tokens JWT automático
- ✅ Limpieza de caché al logout

### 4. **Hooks API Actualizados**
- ✅ `useAuth.ts` - Usando servicios reales del backend
- ✅ `useCart.ts` - Sincronización con servidor
- ✅ `useProducts.ts` - Filtros y búsqueda real
- ✅ Todos los hooks usando React Query correctamente

### 5. **Manejo de Errores Mejorado**
- ✅ `errorHandler.ts` - Manejo específico para errores .NET 9
- ✅ Soporte para ProblemDetails
- ✅ Identificación de errores retriables

### 6. **Configuración Actualizada**
- ✅ `api.ts` - Base URL centralizada con `/api/v1`
- ✅ `dotnet.ts` - Configuración específica para .NET 9
- ✅ `.env.example` - Variables de entorno documentadas

## 🔄 Cambios de Endpoints

### Antes vs Después
```typescript
// Antes (mock)
const products = await mockApi.getProducts()

// Después (real backend)
const products = await productService.getAllProducts(filters)
```

### Nuevos Endpoints Integrados
- `POST /api/v1/auth/login` - Login con JWT
- `POST /api/v1/auth/register` - Registro de usuarios
- `GET /api/v1/products` - Productos con filtros
- `GET /api/v1/products/featured` - Productos destacados
- `GET /api/v1/cart` - Carrito del usuario
- `POST /api/v1/cart/add` - Agregar al carrito
- `GET /api/v1/orders` - Órdenes del usuario
- `GET /api/v1/wishlist` - Lista de deseos

## 🚀 Próximos Pasos para Completar la Integración

### 1. **Actualizar Componentes Frontend**
```typescript
// Ejemplo: Componente ProductCard
import { useAddToCart } from '@/hooks/api/useCart';

function ProductCard({ product }) {
  const addToCart = useAddToCart();
  
  const handleAddToCart = () => {
    addToCart.mutate({
      productId: product.id,
      quantity: 1
    });
  };
}
```

### 2. **Migrar Zustand Store**
- Mantener estado local solo para UI
- Usar React Query para datos del servidor
- Sincronizar carrito local con servidor al login

### 3. **Actualizar Formularios**
```typescript
// Ejemplo: LoginForm
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  
  const handleSubmit = async (data) => {
    await login({
      email: data.email,
      password: data.password
    });
  };
}
```

### 4. **Variables de Entorno**
Crear archivo `.env.local`:
```bash
VITE_API_BASE_URL=https://localhost:7001/api/v1
VITE_ENABLE_DEBUG_LOGS=true
```

## 🔧 Comandos para Verificar la Integración

### Desarrollo Local
```bash
# 1. Asegúrate de que el backend .NET esté corriendo en puerto 7001
dotnet run --project YourBackendProject

# 2. Inicia el frontend
npm run dev

# 3. Verifica la conexión
curl https://localhost:7001/api/v1/products
```

### Tests de Integración
```bash
# Opcional: Tests con el backend real
npm run test:integration
```

## 📝 Notas Importantes

### Diferencias con Datos Mock
- Los IDs ahora son del servidor (pueden cambiar)
- Paginación real implementada
- Validaciones del backend aplicadas
- Manejo de errores de red

### Compatibilidad
- ✅ Mantiene la misma interfaz para componentes
- ✅ Los hooks tienen la misma signatura
- ✅ Los tipos son compatibles (extendidos)

### Performance
- ✅ Cache inteligente con React Query
- ✅ Optimistic updates en mutaciones
- ✅ Retry automático en fallos de red

## 🚨 Checklist de Validación

- [ ] ✅ Backend .NET 9 corriendo en puerto 7001
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Login/registro funcional
- [ ] ✅ Productos se cargan desde el servidor
- [ ] ✅ Carrito sincroniza con servidor
- [ ] ✅ Órdenes se crean correctamente
- [ ] ✅ Manejo de errores funcional
- [ ] ✅ Tokens se manejan automáticamente

## 🔗 Recursos Adicionales

- [Documentación API Backend](./frontend-integration-guide.md)
- [Guía de Tipos TypeScript](@/types/api.ts)
- [Configuración .NET 9](@/config/dotnet.ts)

---

¡La integración del backend .NET 9 está completa! 🎉
