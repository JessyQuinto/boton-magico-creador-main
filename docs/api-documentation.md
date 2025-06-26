# Documentación Técnica API REST - TesorosChoco

Esta documentación está destinada al equipo de desarrollo frontend y contiene toda la información necesaria para consumir los servicios de la API REST de TesorosChoco.

## URL Base
```
https://api.tesoroschoco.com/api/v1
```

## Autenticación
La API utiliza autenticación JWT (JSON Web Token). Para endpoints que requieren autenticación, incluir el token en el header:
```
Authorization: Bearer <token>
```

## Formato de Respuesta Estándar
Todas las respuestas siguen el formato estándar:
```json
{
  "data": {}, // Datos específicos de la respuesta
  "success": true, // true/false
  "message": "Operation successful", // Mensaje descriptivo
  "metadata": {
    "timestamp": "2025-06-26T10:00:00Z",
    "version": "1.0"
  }
}
```

## Códigos de Error Comunes
- `400 Bad Request`: Datos de entrada inválidos
- `401 Unauthorized`: Token de autenticación faltante o inválido
- `403 Forbidden`: Sin permisos para realizar la acción
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: Conflicto con el estado actual del recurso
- `500 Internal Server Error`: Error interno del servidor

---

# Módulo: Autenticación

## 1. Login de Usuario

**Endpoint:** `POST /auth/login`

**Descripción:** Autentica a un usuario con su email y contraseña. Devuelve tokens de acceso. No requiere autenticación.

**Solicitud (Request Body):**
```json
{
  "email": "string (obligatorio)",
  "password": "string (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "data": {
    "user": {
      "id": 1,
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "address": "string",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    },
    "accessToken": "string (jwt)",
    "refreshToken": "string",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "refreshTokenExpiresIn": 604800
  },
  "success": true,
  "message": "Login successful"
}
```

**Respuesta de Error (400 Bad Request / 401 Unauthorized):**
```json
{
  "data": null,
  "success": false,
  "message": "Invalid credentials"
}
```

## 2. Registro de Usuario

**Endpoint:** `POST /auth/register`

**Descripción:** Registra un nuevo usuario en el sistema. No requiere autenticación.

**Solicitud (Request Body):**
```json
{
  "firstName": "string (obligatorio)",
  "lastName": "string (obligatorio)",
  "email": "string (obligatorio)",
  "password": "string (obligatorio)",
  "phone": "string (obligatorio)",
  "address": "string (obligatorio)"
}
```

**Respuesta de Éxito (201 Created):**
```json
{
  "data": {
    "user": {
      "id": 1,
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "address": "string",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    },
    "accessToken": "string (jwt)",
    "refreshToken": "string",
    "tokenType": "Bearer",
    "expiresIn": 3600,
    "refreshTokenExpiresIn": 604800
  },
  "success": true,
  "message": "Registration successful"
}
```

**Respuesta de Error (409 Conflict):**
```json
{
  "error": "User already exists",
  "message": "A user with this email already exists"
}
```

## 3. Renovar Token

**Endpoint:** `POST /auth/refresh-token`

**Descripción:** Renueva el token de acceso usando el refresh token. No requiere autenticación Bearer.

**Solicitud (Request Body):**
```json
{
  "refreshToken": "string (obligatorio)",
  "userId": "number (opcional)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "user": {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  },
  "accessToken": "string (jwt)",
  "refreshToken": "string",
  "tokenType": "Bearer",
  "expiresIn": 3600,
  "refreshTokenExpiresIn": 604800
}
```

## 4. Cerrar Sesión

**Endpoint:** `POST /auth/logout`

**Descripción:** Cierra la sesión del usuario y revoca el refresh token. No requiere autenticación Bearer.

**Solicitud (Request Body):**
```json
{
  "refreshToken": "string (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## 5. Recuperar Contraseña

**Endpoint:** `POST /auth/forgot-password`

**Descripción:** Inicia el proceso de recuperación de contraseña. Envía un email con el token de recuperación. No requiere autenticación.

**Solicitud (Request Body):**
```json
{
  "email": "string (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

## 6. Restablecer Contraseña

**Endpoint:** `POST /auth/reset-password`

**Descripción:** Restablece la contraseña usando el token de recuperación. No requiere autenticación.

**Solicitud (Request Body):**
```json
{
  "token": "string (obligatorio)",
  "email": "string (obligatorio)",
  "newPassword": "string (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

# Módulo: Productos

## 1. Obtener Lista de Productos

**Endpoint:** `GET /products`

**Descripción:** Obtiene la lista de productos con filtros opcionales. No requiere autenticación.

**Parámetros de Consulta (Query Params):**
- `featured` (boolean, opcional): Filtro por productos destacados
- `categoryId` (number, opcional): Filtro por categoría
- `producerId` (number, opcional): Filtro por productor
- `searchTerm` (string, opcional): Término de búsqueda
- `page` (number, opcional): Página (por defecto 1)
- `pageSize` (number, opcional): Tamaño de página (por defecto 10, máximo 100)

**Ejemplo de URL:**
```
GET /products?featured=true&page=1&pageSize=10&searchTerm=chocolate
```

**Respuesta de Éxito (200 OK):**
```json
[
  {
    "id": 1,
    "name": "string",
    "slug": "string",
    "description": "string",
    "price": 29.99,
    "discountedPrice": 24.99,
    "image": "string (url)",
    "images": ["string (url)", "string (url)"],
    "categoryId": 1,
    "producerId": 1,
    "stock": 100,
    "featured": true,
    "rating": 4.5,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  }
]
```

## 2. Obtener Producto por ID

**Endpoint:** `GET /products/{id}`

**Descripción:** Obtiene un producto específico por su ID. No requiere autenticación.

**Parámetros de Ruta (Route Params):**
- `id` (number, obligatorio): ID del producto

**Respuesta de Éxito (200 OK):**
```json
{
  "id": 1,
  "name": "string",
  "slug": "string",
  "description": "string",
  "price": 29.99,
  "discountedPrice": 24.99,
  "image": "string (url)",
  "images": ["string (url)", "string (url)"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 100,
  "featured": true,
  "rating": 4.5,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

**Respuesta de Error (404 Not Found):**
```json
{
  "error": "Product not found",
  "message": "Product with ID {id} was not found"
}
```

## 3. Crear Producto

**Endpoint:** `POST /products`

**Descripción:** Crea un nuevo producto. Requiere autenticación y rol de administrador.

**Solicitud (Request Body):**
```json
{
  "name": "string (obligatorio)",
  "slug": "string (obligatorio)",
  "description": "string (obligatorio)",
  "price": "number (obligatorio)",
  "discountedPrice": "number (opcional)",
  "image": "string (obligatorio)",
  "images": ["string"],
  "categoryId": "number (obligatorio)",
  "producerId": "number (obligatorio)",
  "stock": "number (obligatorio)",
  "featured": "boolean (obligatorio)"
}
```

**Respuesta de Éxito (201 Created):**
```json
{
  "id": 1,
  "name": "string",
  "slug": "string",
  "description": "string",
  "price": 29.99,
  "discountedPrice": 24.99,
  "image": "string (url)",
  "images": ["string (url)"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 100,
  "featured": true,
  "rating": null,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## 4. Actualizar Producto

**Endpoint:** `PUT /products/{id}`

**Descripción:** Actualiza un producto existente. Requiere autenticación y rol de administrador.

**Parámetros de Ruta (Route Params):**
- `id` (number, obligatorio): ID del producto

**Solicitud (Request Body):**
```json
{
  "id": "number (obligatorio)",
  "name": "string (obligatorio)",
  "slug": "string (obligatorio)",
  "description": "string (obligatorio)",
  "price": "number (obligatorio)",
  "discountedPrice": "number (opcional)",
  "image": "string (obligatorio)",
  "images": ["string"],
  "categoryId": "number (obligatorio)",
  "producerId": "number (obligatorio)",
  "stock": "number (obligatorio)",
  "featured": "boolean (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "id": 1,
  "name": "string",
  "slug": "string",
  "description": "string",
  "price": 29.99,
  "discountedPrice": 24.99,
  "image": "string (url)",
  "images": ["string (url)"],
  "categoryId": 1,
  "producerId": 1,
  "stock": 100,
  "featured": true,
  "rating": 4.5,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

---

# Módulo: Carrito

## 1. Obtener Carrito del Usuario

**Endpoint:** `GET /cart`

**Descripción:** Obtiene el carrito del usuario autenticado. Requiere autenticación.

**Respuesta de Éxito (200 OK):**
```json
{
  "data": {
    "id": 1,
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 29.99
      }
    ],
    "total": 59.98,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  },
  "success": true,
  "message": "Cart retrieved successfully"
}
```

## 2. Actualizar Carrito Completo

**Endpoint:** `POST /cart`

**Descripción:** Actualiza el carrito del usuario (agregar/modificar items). Requiere autenticación.

**Solicitud (Request Body):**
```json
{
  "id": "number (obligatorio)",
  "userId": "number (obligatorio)",
  "items": [
    {
      "productId": "number (obligatorio)",
      "quantity": "number (obligatorio)",
      "price": "number (obligatorio)"
    }
  ],
  "total": "number (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## 3. Vaciar Carrito

**Endpoint:** `DELETE /cart`

**Descripción:** Vacía completamente el carrito del usuario. Requiere autenticación.

**Respuesta de Éxito (204 No Content):**
Sin contenido de respuesta.

## 4. Agregar Item al Carrito

**Endpoint:** `POST /cart/items`

**Descripción:** Agrega un item específico al carrito. Requiere autenticación.

**Solicitud (Request Body):**
```json
{
  "productId": "number (obligatorio)",
  "quantity": "number (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

## 5. Actualizar Item del Carrito

**Endpoint:** `PUT /cart/items/{id}`

**Descripción:** Actualiza la cantidad de un item específico del carrito. Requiere autenticación.

**Parámetros de Ruta (Route Params):**
- `id` (number, obligatorio): ID del item del carrito

**Solicitud (Request Body):**
```json
{
  "quantity": "number (obligatorio)"
}
```

**Respuesta de Éxito (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 29.99
    }
  ],
  "total": 89.97,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

**Respuesta de Error (404 Not Found):**
```json
{
  "error": "Item not found",
  "message": "Cart item not found"
}
```

## 6. Remover Item del Carrito

**Endpoint:** `DELETE /cart/items/{id}`

**Descripción:** Remueve un item específico del carrito. Requiere autenticación.

**Parámetros de Ruta (Route Params):**
- `id` (number, obligatorio): ID del item del carrito

**Respuesta de Éxito (200 OK):**
```json
{
  "id": 1,
  "userId": 1,
  "items": [],
  "total": 0.00,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

---

# Módulo: Órdenes

## 1. Crear Nueva Orden

**Endpoint:** `POST /orders`

**Descripción:** Crea una nueva orden de compra. Requiere autenticación.

**Solicitud (Request Body):**
```json
{
  "userId": "number (obligatorio)",
  "items": [
    {
      "productId": "number (obligatorio)",
      "quantity": "number (obligatorio)",
      "price": "number (obligatorio)"
    }
  ],
  "shippingAddress": {
    "name": "string (obligatorio)",
    "address": "string (obligatorio)",
    "city": "string (obligatorio)",
    "region": "string (obligatorio)",
    "zipCode": "string (obligatorio)",
    "phone": "string (obligatorio)"
  },
  "paymentMethod": "string (obligatorio)",
  "total": "number (obligatorio)",
  "requestedDeliveryDate": "string (opcional, formato ISO 8601)"
}
```

**Respuesta de Éxito (201 Created):**
```json
{
  "data": {
    "id": 1,
    "userId": 1,
    "status": "Pending",
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 29.99
      }
    ],
    "shippingAddress": {
      "name": "string",
      "address": "string",
      "city": "string",
      "zipCode": "string",
      "phone": "string"
    },
    "paymentMethod": "Credit Card",
    "total": 59.98,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  },
  "success": true,
  "message": "Order created successfully"
}
```

**Respuesta de Error (400 Bad Request):**
```json
{
  "data": null,
  "success": false,
  "message": "Invalid order data"
}
```

## 2. Obtener Orden por ID

**Endpoint:** `GET /orders/{id}`

**Descripción:** Obtiene una orden específica por su ID. Requiere autenticación. Los usuarios solo pueden ver sus propias órdenes.

**Parámetros de Ruta (Route Params):**
- `id` (number, obligatorio): ID de la orden

**Respuesta de Éxito (200 OK):**
```json
{
  "data": {
    "id": 1,
    "userId": 1,
    "status": "Processing",
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 29.99
      }
    ],
    "shippingAddress": {
      "name": "string",
      "address": "string",
      "city": "string",
      "zipCode": "string",
      "phone": "string"
    },
    "paymentMethod": "Credit Card",
    "total": 59.98,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  },
  "success": true,
  "message": "Order retrieved successfully"
}
```

**Respuesta de Error (404 Not Found):**
```json
{
  "data": null,
  "success": false,
  "message": "Order with ID {id} was not found"
}
```

**Respuesta de Error (403 Forbidden):**
```json
{
  "statusCode": 403,
  "message": "Access denied"
}
```

## 3. Obtener Órdenes del Usuario

**Endpoint:** `GET /orders`

**Descripción:** Obtiene todas las órdenes del usuario autenticado. Requiere autenticación.

**Respuesta de Éxito (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "status": "Completed",
      "items": [
        {
          "productId": 1,
          "quantity": 2,
          "price": 29.99
        }
      ],
      "shippingAddress": {
        "name": "string",
        "address": "string",
        "city": "string",
        "zipCode": "string",
        "phone": "string"
      },
      "paymentMethod": "Credit Card",
      "total": 59.98,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ],
  "success": true,
  "message": "Orders retrieved successfully"
}
```

## 4. Obtener Órdenes por Usuario (Admin)

**Endpoint:** `GET /orders/user/{userId}`

**Descripción:** Obtiene todas las órdenes de un usuario específico. Requiere autenticación y rol de administrador.

**Parámetros de Ruta (Route Params):**
- `userId` (number, obligatorio): ID del usuario

**Respuesta de Éxito (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "status": "Completed",
      "items": [
        {
          "productId": 1,
          "quantity": 2,
          "price": 29.99
        }
      ],
      "shippingAddress": {
        "name": "string",
        "address": "string",
        "city": "string",
        "zipCode": "string",
        "phone": "string"
      },
      "paymentMethod": "Credit Card",
      "total": 59.98,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ],
  "success": true,
  "message": "Orders retrieved successfully"
}
```

## 5. Actualizar Estado de Orden (Admin)

**Endpoint:** `PATCH /orders/{id}/status`

**Descripción:** Actualiza el estado de una orden. Requiere autenticación y rol de administrador.

**Parámetros de Ruta (Route Params):**
- `id` (number, obligatorio): ID de la orden

**Solicitud (Request Body):**
```json
{
  "status": "string (obligatorio)"
}
```

**Estados válidos:**
- `Pending`
- `Processing`
- `Shipped`
- `Delivered`
- `Cancelled`

**Respuesta de Éxito (200 OK):**
```json
{
  "data": {
    "id": 1,
    "userId": 1,
    "status": "Shipped",
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 29.99
      }
    ],
    "shippingAddress": {
      "name": "string",
      "address": "string",
      "city": "string",
      "zipCode": "string",
      "phone": "string"
    },
    "paymentMethod": "Credit Card",
    "total": 59.98,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-01T00:00:00Z"
  },
  "success": true,
  "message": "Order status updated successfully"
}
```

**Respuesta de Error (400 Bad Request):**
```json
{
  "data": null,
  "success": false,
  "message": "Invalid status value"
}
```

---

## Notas Importantes

### Paginación
Los endpoints que devuelven listas admiten paginación con los parámetros:
- `page`: Número de página (por defecto 1)
- `pageSize`: Elementos por página (por defecto 10, máximo 100)

### Validación
Todos los endpoints validan los datos de entrada y retornan errores detallados en caso de datos inválidos.

### Rate Limiting
Se implementa limitación de velocidad para prevenir abuso de la API.

### CORS
La API está configurada para aceptar solicitudes desde dominios autorizados del frontend.

### Logs
Todas las operaciones se registran para auditoría y debugging.

Esta documentación cubre los flujos principales de la aplicación TesorosChoco. Para casos específicos o endpoints adicionales, consultar con el equipo de backend.
