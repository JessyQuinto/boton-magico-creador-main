
import { useSearchParams } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || 'CHO-2024-001';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-choco-800 mb-4">
              ¡Gracias por tu pedido!
            </h1>
            
            <p className="text-lg text-choco-600 mb-8">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación 
              con los detalles y el seguimiento de tu envío.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-selva-50 rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-choco-800 mb-4">
              Detalles del Pedido
            </h2>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-choco-600">Número de Pedido:</span>
                <span className="font-semibold text-choco-800">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-choco-600">Fecha:</span>
                <span className="font-semibold text-choco-800">
                  {new Date().toLocaleDateString('es-CO', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-choco-600">Total:</span>
                <span className="font-bold text-selva-600 text-lg">$412.500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-choco-600">Estado:</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Procesando
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-oro-50 rounded-xl p-8 mb-8 text-left">
            <h3 className="text-lg font-semibold text-choco-800 mb-4">
              ¿Qué sigue ahora?
            </h3>
            
            <ul className="space-y-3 text-choco-600">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-oro-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Recibirás un email de confirmación en los próximos minutos</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-oro-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Tu pedido será preparado y empacado con cuidado por nuestros artesanos</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-oro-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Recibirás información de seguimiento cuando tu pedido sea enviado</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-oro-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Tu pedido llegará en 5-7 días hábiles</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-pacifico-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-choco-800 mb-2">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-choco-600 text-sm">
              Si tienes preguntas sobre tu pedido, no dudes en contactarnos en{" "}
              <a href="mailto:contacto@chocoartesanal.com" className="text-selva-600 hover:underline">
                contacto@chocoartesanal.com
              </a>{" "}
              o al teléfono{" "}
              <a href="tel:+573001234567" className="text-selva-600 hover:underline">
                +57 300 123 4567
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-selva-600 hover:bg-selva-700">
              <a href="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Seguir Comprando
              </a>
            </Button>
            
            <Button variant="outline" asChild className="border-choco-300 text-choco-700 hover:bg-choco-50">
              <a href="/">Volver al Inicio</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
