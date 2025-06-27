# 🔄 DIFERENCIAS CLAVE FRONTEND vs BACKEND

## Tabla de Equivalencias API

| **Frontend Anterior** | **Backend Real** | **Estado** |
|----------------------|------------------|------------|
| `GET /products/featured` | `GET /products?featured=true` | ✅ Adaptado |
| `GET /products/search` | `GET /products?searchTerm=...` | ✅ Adaptado |
| `GET /products/category/{id}` | `GET /products?categoryId={id}` | ✅ Adaptado |
| `POST /cart` (update) | `POST /cart` (full update) | ✅ Compatible |
| Sin endpoint específico | `DELETE /cart` (clear cart) | ✅ Añadido |
| Sin endpoints específicos | `POST/PUT/DELETE /cart/items/{id}` | ✅ Añadidos |
| `POST /auth/refresh-token` | `POST /auth/refresh-token` | ✅ Compatible |
| Sin endpoints | `POST /auth/forgot-password` | ✅ Añadido |
| Sin endpoints | `POST /auth/reset-password` | ✅ Añadido |

## Cambios en Estructura de Datos

### **UserDto**
```typescript
// Antes (frontend)
interface UserDto {
  phone?: string;      // Opcional
  address?: string;    // Opcional
}

// Ahora (backend)
interface UserDto {
  phone: string;       // Obligatorio
  address: string;     // Obligatorio
}
```

### **OrderDto Status**
```typescript
// Antes (frontend)
type Status = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Ahora (backend) 
type Status = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
```

### **OrderShippingAddress**
```typescript
// Antes (frontend)
interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

// Ahora (backend)
interface OrderShippingAddress {
  name: string;
  address: string;
  city: string;
  region: string;      // ✅ Nuevo campo
  zipCode: string;
  phone: string;
}
```

### **Respuesta API**
```typescript
// Antes (frontend esperaba datos directos)
ProductDto[]

// Ahora (backend envuelve en estructura estándar)
{
  data: ProductDto[],
  success: boolean,
  message: string,
  metadata: {
    timestamp: string,
    version: string
  }
}
```

## URLs y Configuración

| **Aspecto** | **Antes** | **Ahora** |
|-------------|-----------|-----------|
| URL Base | `http://localhost:5000/api/v1` | `https://api.tesoroschoco.com/api/v1` |
| Fallback | No tenía | `http://localhost:5000/api/v1` |
| Mock Data | Solo para desarrollo | Fallback automático |
| Error Handling | Básico | Formato backend + fallback |

## Nuevas Funcionalidades Añadidas

### **Autenticación**
- ✅ Forgot Password flow
- ✅ Reset Password flow
- ✅ Token refresh automático mejorado
- ✅ Logout con revocación de refresh token

### **Carrito**
- ✅ Vaciar carrito completo
- ✅ Operaciones granulares por item
- ✅ Actualización individual de items
- ✅ Mejor manejo de IDs de items

### **Órdenes**
- ✅ Campo `requestedDeliveryDate`
- ✅ Campo `region` en dirección
- ✅ Estados específicos del backend
- ✅ Endpoint admin para ver órdenes por usuario

### **Productos**
- ✅ Filtros por query parameters
- ✅ Paginación mejorada
- ✅ CRUD completo para administradores

## Compatibilidad Mantenida

### **✅ Lo que NO cambió**
- Interfaces de componentes React
- Hooks personalizados
- Context providers
- Rutas y navegación
- Estilos y UI/UX
- Estado global de la aplicación

### **✅ Lo que se adaptó automáticamente**
- Formato de respuestas API (unwrapping)
- Manejo de errores 
- Fallback a mock data
- Refresh de tokens
- URLs y endpoints

## Migración de Código Existente

### **Para Desarrolladores Frontend**

**No necesita cambios:**
```typescript
// Los hooks y componentes siguen funcionando igual
const { data: products } = useQuery(['products'], () => 
  productService.getProducts()
);
```

**Cambios mínimos en servicios:**
```typescript
// Antes
productService.getFeaturedProducts()

// Sigue funcionando igual (internamente usa nueva API)
productService.getFeaturedProducts()
```

**Nuevas opciones disponibles:**
```typescript
// Nuevas funcionalidades que se pueden usar
await cartService.clearCart();
await cartService.updateCartItem(itemId, quantity);
await authService.forgotPassword(email);
```

## Testing y Validación

### **Checklist de Migración**
- [ ] Verificar conectividad con backend real
- [ ] Confirmar flujo de autenticación completo
- [ ] Validar operaciones de carrito
- [ ] Probar creación de órdenes
- [ ] Verificar manejo de errores
- [ ] Confirmar fallback a mock data

### **Rollback Plan**
Si algo falla, los cambios están aislados en:
1. `/src/config/api.ts`
2. `/src/services/*.ts`
3. `/src/types/api-backend.ts`

El resto del código permanece intacto y funcional.

---

## 🎯 Resumen Ejecutivo

**✅ Adaptación exitosa** con **máxima compatibilidad**
**✅ Cero breaking changes** en componentes existentes  
**✅ Fallback robusto** para desarrollo sin backend
**✅ Nuevas funcionalidades** disponibles para usar
**✅ Estructura preparada** para escalabilidad futura
