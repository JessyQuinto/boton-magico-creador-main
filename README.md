# Tesoros del Chocó - E-commerce Platform

Una plataforma de comercio electrónico para artesanías tradicionales del Pacífico colombiano.

## 🏗️ Arquitectura Limpia Implementada

Este proyecto ha sido refactorizado para eliminar redundancias y seguir las mejores prácticas de desarrollo:

### ✅ Cambios Implementados

#### **1. Eliminación de Context Providers Redundantes**
- ❌ **Eliminado**: `AuthContextEnhanced.tsx` (implementación legacy)
- ❌ **Eliminado**: `ApiAuthContext.tsx` (wrapper innecesario)
- ✅ **Unificado**: Solo `AuthContext.tsx` con React Query
- ✅ **Recomendación**: Usar `useAuth()` de `hooks/api/useAuth.ts`

#### **2. Hooks de Carrito Simplificados**
- ❌ **Eliminado**: `useApiCart.ts` (duplicado)
- ✅ **Unificado**: `hooks/api/useCart.ts` como hook principal API
- ✅ **Mejorado**: `useCartSync.ts` para sincronización usuario/guest
- ✅ **Conservado**: `hooks/useCart.ts` para store local

#### **3. Servicios API Limpiados**
- ✅ **Eliminado**: Fallbacks a mock data en `productApi.ts`
- ✅ **Limpiado**: TokenManager duplicado en `api.ts`
- ✅ **Unificado**: Solo servicios API reales
- ✅ **Mejorado**: Manejo de errores centralizado

#### **4. Componentes Optimizados**
- ✅ **ProductGrid**: Migrado a hooks API, eliminado mock data
- ✅ **ProductCard**: Optimizado para usar tipos API
- ✅ **App.tsx**: Configuración de QueryClient optimizada

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o bun
- Backend .NET 9 (ver documentación en `/docs`)

### Instalación

```bash
# Clonar repositorio
git clone <tu-repo-url>
cd boton-magico-creador-main

# Instalar dependencias
npm install
# o
bun install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu URL del backend

# Iniciar desarrollo
npm run dev
# o
bun dev
```

### Configuración del Backend

Este frontend está diseñado para conectarse con un backend .NET 9. Ver documentación completa:

- 📖 **API Specification**: `/docs/api-specification.md`
- 🔧 **Integración .NET**: `/docs/dotnet-integration.md`  
- 📋 **Guía Completa**: `/docs/integration-guide.md`

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
├── hooks/              
│   ├── api/            # ✅ Hooks React Query para APIs
│   └── *.ts            # Hooks locales y utilidades
├── services/           # ✅ Servicios API limpios
├── context/            # ✅ Solo contexts necesarios  
├── pages/              # Páginas de la aplicación
├── types/              # ✅ Tipos TypeScript unificados
└── utils/              # Utilidades compartidas
```

## 🔄 Migración de Mock Data a API

### ✅ Componentes Ya Migrados
- `FeaturedProducts` → usa `useFeaturedProducts()`
- `ProductGrid` → usa `useProducts()`, `useProductsByCategory()`
- `ProductDetail` → usa `useProductBySlug()`

### 📋 Pendientes de Migración
- [ ] `CategoryShowcase` → usar `useCategories()`
- [ ] Algunos componentes en `/components/home/`

## 🔌 Integración Backend

### Endpoints Requeridos

El backend debe implementar estos endpoints (ver `/docs/api-specification.md`):

```typescript
// Autenticación
POST /api/v1/auth/login
POST /api/v1/auth/register
GET  /api/v1/auth/profile

// Productos  
GET  /api/v1/products
GET  /api/v1/products/featured
GET  /api/v1/products/slug/{slug}

// Carrito
GET  /api/v1/cart
POST /api/v1/cart/add
PUT  /api/v1/cart/update

// Y más... (ver documentación completa)
```

## 🛠️ Comandos de Desarrollo

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Variables de Entorno

```bash
# API Configuration
VITE_API_BASE_URL=https://localhost:7001
VITE_API_TIMEOUT=30000

# Ver .env.example para configuración completa
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Crear Pull Request

## 📚 Documentación

- **API Specification**: Especificación completa de endpoints
- **Integration Guide**: Guía paso a paso de integración
- **DotNet Integration**: Configuración específica para .NET 9

## 🔧 Solución de Problemas

### Error de CORS
```bash
# En el backend .NET, configurar CORS para:
https://localhost:5173  # Vite dev server
```

### Error de Autenticación
```bash
# Verificar que el backend esté devolviendo tokens JWT válidos
# Verificar configuración de TokenManager
```

Ver más en `/docs/integration-guide.md`

---

**Nota**: Este proyecto ha sido optimizado para eliminar redundancias y seguir las mejores prácticas. La documentación en `/docs` contiene información detallada para la integración completa con el backend.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e6351737-e464-47ad-8212-702d1b19b5be) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
