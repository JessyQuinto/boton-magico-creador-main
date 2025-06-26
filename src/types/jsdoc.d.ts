/**
 * @fileoverview Configuración JSDoc para mejorar la comprensión de GitHub Copilot
 *
 * Este archivo define los tipos globales y configuraciones que ayudan a Copilot
 * a entender mejor el contexto y la estructura de nuestro proyecto React/TypeScript.
 */

/**
 * @typedef {Object} User
 * @property {string} id - ID único del usuario
 * @property {string} name - Nombre del usuario
 * @property {string} email - Email del usuario
 * @property {string} role - Rol del usuario (admin, user, producer)
 * @property {Date} createdAt - Fecha de creación
 * @property {Date} updatedAt - Fecha de última actualización
 */

/**
 * @typedef {Object} Product
 * @property {string} id - ID único del producto
 * @property {string} name - Nombre del producto
 * @property {string} description - Descripción del producto
 * @property {number} price - Precio del producto
 * @property {string} category - Categoría del producto
 * @property {string[]} images - URLs de las imágenes
 * @property {string} producerId - ID del productor
 * @property {boolean} isActive - Si el producto está activo
 * @property {number} stock - Cantidad en stock
 * @property {Date} createdAt - Fecha de creación
 * @property {Date} updatedAt - Fecha de última actualización
 */

/**
 * @typedef {Object} CartItem
 * @property {string} productId - ID del producto
 * @property {number} quantity - Cantidad del producto
 * @property {Product} product - Información del producto
 */

/**
 * @typedef {Object} Order
 * @property {string} id - ID único de la orden
 * @property {string} userId - ID del usuario
 * @property {CartItem[]} items - Items de la orden
 * @property {number} total - Total de la orden
 * @property {string} status - Estado de la orden
 * @property {Date} createdAt - Fecha de creación
 */

/**
 * @typedef {Object} ApiResponse
 * @template T
 * @property {boolean} success - Si la respuesta fue exitosa
 * @property {T} data - Datos de la respuesta
 * @property {string} message - Mensaje de la respuesta
 * @property {any} error - Error si existe
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user - Usuario autenticado
 * @property {boolean} isAuthenticated - Si el usuario está autenticado
 * @property {boolean} isLoading - Si está cargando
 * @property {Function} login - Función de login
 * @property {Function} logout - Función de logout
 * @property {Function} register - Función de registro
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} items - Items del carrito
 * @property {number} total - Total del carrito
 * @property {number} itemCount - Cantidad total de items
 * @property {Function} addItem - Agregar item al carrito
 * @property {Function} removeItem - Remover item del carrito
 * @property {Function} updateQuantity - Actualizar cantidad
 * @property {Function} clearCart - Limpiar carrito
 */

/**
 * @typedef {Object} ThemeContextType
 * @property {'light'|'dark'} theme - Tema actual
 * @property {Function} toggleTheme - Función para cambiar tema
 */

/**
 * Configuración de rutas de la aplicación
 * @typedef {Object} AppRoutes
 * @property {string} HOME - Ruta de inicio
 * @property {string} PRODUCTS - Ruta de productos
 * @property {string} CART - Ruta del carrito
 * @property {string} CHECKOUT - Ruta de checkout
 * @property {string} LOGIN - Ruta de login
 * @property {string} REGISTER - Ruta de registro
 * @property {string} PROFILE - Ruta de perfil
 * @property {string} ADMIN - Ruta de administración
 */

export { }; // Para hacer de este archivo un módulo
