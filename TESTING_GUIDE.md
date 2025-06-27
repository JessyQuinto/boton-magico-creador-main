# 🧪 GUÍA DE TESTING DE INTEGRACIÓN

## Instrucciones para validar la integración frontend-backend

### **Preparación**
1. Abrir la aplicación en el navegador
2. Abrir Developer Tools (F12)
3. Ir a la pestaña Console

### **Tests Manuales**

#### **1. Test de Conectividad API**
```javascript
// Copiar y pegar en la consola del navegador:
fetch('https://api.tesoroschoco.com/api/v1/products?pageSize=1')
  .then(response => {
    if (response.ok) {
      console.log('✅ Backend API is reachable');
      return response.json();
    } else {
      console.log('❌ API Error:', response.status, response.statusText);
    }
  })
  .then(data => {
    console.log('📦 Sample response:', data);
  })
  .catch(error => {
    console.log('❌ Network error:', error.message);
  });
```

#### **2. Test de Autenticación Mock**
```javascript
// En la consola, después de importar los servicios:
import { authService } from './src/services/authService.js';

// Test login mock
authService.login({ email: 'user@test.com', password: 'user123' })
  .then(result => {
    console.log('✅ Mock login successful:', result);
    return authService.logout();
  })
  .then(() => {
    console.log('✅ Logout successful');
  })
  .catch(error => {
    console.log('❌ Auth error:', error.message);
  });
```

#### **3. Test de Productos**
```javascript
// Test productos
import { productService } from './src/services/productService.js';

productService.getProducts({ pageSize: 5 })
  .then(products => {
    console.log('✅ Products loaded:', products.length, 'items');
    return productService.getFeaturedProducts();
  })
  .then(featured => {
    console.log('✅ Featured products:', featured.length, 'items');
  })
  .catch(error => {
    console.log('❌ Products error:', error.message);
  });
```

#### **4. Test de Carrito**
```javascript
// Test carrito (requiere autenticación)
import { cartService } from './src/services/cartService.js';

// Primero hacer login
authService.login({ email: 'user@test.com', password: 'user123' })
  .then(() => cartService.getCart())
  .then(cart => {
    console.log('✅ Cart loaded:', cart);
    return cartService.addToCart(1, 2);
  })
  .then(updatedCart => {
    console.log('✅ Item added to cart:', updatedCart);
  })
  .catch(error => {
    console.log('❌ Cart error:', error.message);
  });
```

#### **5. Test de Órdenes**
```javascript
// Test órdenes
import { orderService } from './src/services/orderService.js';

orderService.getOrders()
  .then(orders => {
    console.log('✅ Orders loaded:', orders.length, 'orders');
  })
  .catch(error => {
    console.log('❌ Orders error:', error.message);
  });
```

### **Resultados Esperados**

#### **✅ Success Cases**
- **API Connectivity**: Respuesta 200 con datos JSON
- **Mock Authentication**: Login exitoso con tokens
- **Products**: Array de productos con estructura correcta
- **Cart**: Operaciones de carrito funcionando
- **Orders**: Lista de órdenes (puede estar vacía)

#### **⚠️ Expected Behaviors**
- **Backend Offline**: Fallback a mock data
- **Unauthenticated Requests**: Error 401 para endpoints protegidos
- **Invalid Data**: Mensajes de error descriptivos

#### **❌ Red Flags**
- **Network Errors**: Sin fallback a mock
- **CORS Errors**: Headers no configurados en backend
- **Type Errors**: Estructura de datos incompatible
- **Token Issues**: Refresh token no funcionando

### **Checklist de Validación**

- [ ] ✅ API Backend responde correctamente
- [ ] ✅ Mock authentication funciona
- [ ] ✅ Productos se cargan desde API o mock
- [ ] ✅ Carrito maneja operaciones CRUD
- [ ] ✅ Órdenes se pueden crear y consultar
- [ ] ✅ Refresh token funciona automáticamente
- [ ] ✅ Errores se manejan apropiadamente
- [ ] ✅ Fallback a mock cuando backend no disponible

### **Debugging**

#### **Si hay errores CORS:**
- Verificar configuración CORS en backend
- Confirmar headers permitidos
- Verificar dominio autorizado

#### **Si hay errores de autenticación:**
- Verificar formato de tokens JWT
- Confirmar endpoints de auth
- Revisar refresh token flow

#### **Si hay errores de estructura de datos:**
- Comparar con documentación API
- Verificar tipos TypeScript
- Confirmar formato de respuesta

### **Testing en Diferentes Escenarios**

1. **Backend Online**: Usar URL de producción
2. **Backend Offline**: Solo mock data
3. **Desarrollo Local**: Backend en localhost:5000
4. **Producción**: API de TesorosChoco

---

**Nota**: Este testing valida que la integración está funcionando correctamente y que el frontend puede comunicarse con el backend según las especificaciones documentadas.
