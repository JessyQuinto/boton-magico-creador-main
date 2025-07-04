import { useToast } from '@/hooks/use-toast';

export const useToastHelpers = () => {
    const { toast } = useToast();

    const showSuccess = (title: string, description?: string) => {
        toast({
            title,
            description,
        });
    };

    const showError = (title: string, description?: string) => {
        toast({
            title,
            description,
            variant: 'destructive',
        });
    };

    return { showSuccess, showError };
};

// Common toast messages for mutations
export const TOAST_MESSAGES = {
    // Category messages
    CATEGORY_CREATED: { title: 'Categoría creada', description: 'La categoría ha sido creada exitosamente.' },
    CATEGORY_UPDATED: { title: 'Categoría actualizada', description: 'La categoría ha sido actualizada exitosamente.' },
    CATEGORY_DELETED: { title: 'Categoría eliminada', description: 'La categoría ha sido eliminada exitosamente.' },
    CATEGORY_ERROR_CREATE: { title: 'Error al crear categoría' },
    CATEGORY_ERROR_UPDATE: { title: 'Error al actualizar categoría' },
    CATEGORY_ERROR_DELETE: { title: 'Error al eliminar categoría' },

    // Product messages
    PRODUCT_CREATED: { title: 'Producto creado', description: 'El producto ha sido creado exitosamente.' },
    PRODUCT_UPDATED: { title: 'Producto actualizado', description: 'El producto ha sido actualizado exitosamente.' },
    PRODUCT_DELETED: { title: 'Producto eliminado', description: 'El producto ha sido eliminado exitosamente.' },
    PRODUCT_ERROR_CREATE: { title: 'Error al crear producto' },
    PRODUCT_ERROR_UPDATE: { title: 'Error al actualizar producto' },
    PRODUCT_ERROR_DELETE: { title: 'Error al eliminar producto' },

    // Producer messages
    PRODUCER_CREATED: { title: 'Productor creado', description: 'El productor ha sido creado exitosamente.' },
    PRODUCER_UPDATED: { title: 'Productor actualizado', description: 'El productor ha sido actualizado exitosamente.' },
    PRODUCER_DELETED: { title: 'Productor eliminado', description: 'El productor ha sido eliminado exitosamente.' },
    PRODUCER_ERROR_CREATE: { title: 'Error al crear productor' },
    PRODUCER_ERROR_UPDATE: { title: 'Error al actualizar productor' },
    PRODUCER_ERROR_DELETE: { title: 'Error al eliminar productor' },

    // Cart messages
    CART_ITEM_ADDED: { title: 'Producto agregado', description: 'El producto ha sido agregado al carrito.' },
    CART_ITEM_REMOVED: { title: 'Producto eliminado', description: 'El producto ha sido eliminado del carrito.' },
    CART_CLEARED: { title: 'Carrito vacío', description: 'Todos los productos han sido eliminados del carrito.' },
    CART_ERROR_ADD: { title: 'Error al agregar producto', description: 'No se pudo agregar el producto al carrito.' },
    CART_ERROR_UPDATE: { title: 'Error al actualizar carrito' },
    CART_ERROR_REMOVE: { title: 'Error al eliminar producto' },
    CART_ERROR_CLEAR: { title: 'Error al vaciar carrito' },

    // Wishlist messages
    WISHLIST_ITEM_ADDED: { title: 'Agregado a favoritos', description: 'El producto ha sido agregado a tu lista de favoritos.' },
    WISHLIST_ITEM_REMOVED: { title: 'Eliminado de favoritos', description: 'El producto ha sido eliminado de tu lista de favoritos.' },
    WISHLIST_CLEARED: { title: 'Lista de favoritos vacía', description: 'Todos los productos han sido eliminados de tu lista de favoritos.' },
    WISHLIST_ERROR_ADD: { title: 'Error al agregar a favoritos', description: 'No se pudo agregar el producto a favoritos.' },
    WISHLIST_ERROR_REMOVE: { title: 'Error al eliminar de favoritos' },
    WISHLIST_ERROR_CLEAR: { title: 'Error al vaciar favoritos' },

    // Order messages
    ORDER_CREATED: (orderId: number) => ({ title: '¡Pedido creado!', description: `Tu pedido #${orderId} ha sido creado exitosamente.` }),
    ORDER_CANCELLED: (orderId: number) => ({ title: 'Pedido cancelado', description: `El pedido #${orderId} ha sido cancelado.` }),
    ORDER_ERROR_CREATE: { title: 'Error al crear pedido', description: 'No se pudo procesar tu pedido.' },
    ORDER_ERROR_CANCEL: { title: 'Error al cancelar pedido' },

    // Auth messages
    AUTH_LOGIN_SUCCESS: (firstName: string) => ({ title: 'Bienvenido', description: `¡Hola ${firstName}! Has iniciado sesión correctamente.` }),
    AUTH_REGISTER_SUCCESS: (firstName: string) => ({ title: '¡Registro exitoso!', description: `Bienvenido ${firstName}. Tu cuenta ha sido creada.` }),
    AUTH_PROFILE_UPDATED: { title: 'Perfil actualizado', description: 'Tu información ha sido actualizada correctamente.' },
    AUTH_LOGOUT: { title: 'Sesión cerrada', description: 'Has cerrado sesión correctamente.' },
    AUTH_ERROR_LOGIN: { title: 'Error de autenticación', description: 'Credenciales incorrectas' },
    AUTH_ERROR_REGISTER: { title: 'Error de registro', description: 'No se pudo crear la cuenta' },
    AUTH_ERROR_UPDATE: { title: 'Error al actualizar', description: 'No se pudo actualizar el perfil' },
} as const;
