import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/hooks/useCart';
import { useStore } from '@/store/useStore';
import { useNotifications } from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, MapPin, User } from 'lucide-react';
import { z } from 'zod';

interface CheckoutData {
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'transfer' | 'cash';
}

const CheckoutForm: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { auth } = useStore();
  const { user, isLoggedIn } = auth;
  const { showSuccess, showError } = useNotifications();
    const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    email: user?.email || '',
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.addresses?.[0]?.address || '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      showError('El carrito está vacío');
      return;
    }

    setIsProcessing(true);

    try {
      // Simular procesamiento del pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la integración con Stripe u otro procesador de pagos
      console.log('Procesando pago:', { checkoutData, items, total });
      
      showSuccess('¡Pedido realizado con éxito!');
      clearCart();
      
      // Redirigir a página de confirmación
      window.location.href = '/pedido-confirmado';
      
    } catch (err) {
      showError('Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Tarjeta de Crédito/Débito', icon: CreditCard },
    { id: 'transfer', name: 'Transferencia Bancaria', icon: MapPin },
    { id: 'cash', name: 'Pago Contraentrega', icon: User },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información de contacto */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Información de Contacto
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              value={checkoutData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={checkoutData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              required
              value={checkoutData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Dirección de envío */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Dirección de Envío
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dirección
            </label>
            <input
              type="text"
              required
              value={checkoutData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ciudad
            </label>
            <input
              type="text"
              required
              value={checkoutData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Código Postal
            </label>
            <input
              type="text"
              required
              value={checkoutData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0cf2a5] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Método de pago */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Método de Pago
        </h3>
        
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label key={method.id} className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={checkoutData.paymentMethod === method.id}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className="h-4 w-4 text-[#0cf2a5] focus:ring-[#0cf2a5]"
              />
              <method.icon className="w-5 h-5 ml-3 mr-2 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-white">{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botón de pago */}
      <button
        type="submit"
        disabled={isProcessing || items.length === 0}
        className="w-full bg-[#0cf2a5] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#0ae195] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isProcessing ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Procesando...
          </div>
        ) : (
          `Pagar $${total.toLocaleString()}`
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
