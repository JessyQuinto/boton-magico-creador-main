
import React, { useState } from 'react';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2,
  BarChart3
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';

const AdminPanel: React.FC = () => {
  const { auth } = useStore();
  const { user, isLoggedIn } = auth;
  const isAdmin = user?.email === 'admin@example.com'; // Simple admin check
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <Navbar />
        <Container className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Acceso Denegado
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              No tienes permisos para acceder a esta página.
            </p>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const stats = [
    { title: 'Total Usuarios', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Pedidos Hoy', value: '45', icon: ShoppingCart, color: 'bg-green-500' },
    { title: 'Productos', value: '156', icon: Package, color: 'bg-purple-500' },
    { title: 'Ventas del Mes', value: '$25,430', icon: DollarSign, color: 'bg-yellow-500' },
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Productos', icon: Package },
    { id: 'orders', name: 'Pedidos', icon: ShoppingCart },
    { id: 'users', name: 'Usuarios', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Navbar />
      
      <Container className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenido, {user?.name}
          </p>
        </div>

        {/* Pestañas */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-[#0cf2a5] text-[#0cf2a5]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenido */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gráfico placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ventas de los últimos 7 días
              </h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Gráfico de ventas (próximamente)
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Gestión de Productos
                </h3>
                <button className="bg-[#0cf2a5] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0ae195] transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Producto</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Sistema de gestión de productos (próximamente)
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gestión de Pedidos
              </h3>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Sistema de gestión de pedidos (próximamente)
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gestión de Usuarios
              </h3>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Sistema de gestión de usuarios (próximamente)
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default AdminPanel;
