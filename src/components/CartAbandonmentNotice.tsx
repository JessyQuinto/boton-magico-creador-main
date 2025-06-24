
import { useState, useEffect, useCallback } from 'react';
import { X, ShoppingCart, Gift, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartItems } from '@/store/useStore';

const CartAbandonmentNotice = () => {
  const [showNotice, setShowNotice] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const items = useCartItems();

  // Memoize the check function to prevent recreation on every render
  const checkAbandonedCart = useCallback(() => {
    if (items.length > 0) {
      const lastActivity = localStorage.getItem('lastCartActivity');
      const dismissedTime = localStorage.getItem('cartNoticeDismissed');
      const now = Date.now();
      
      // Don't show if dismissed recently (within 1 hour)
      if (dismissedTime && now - parseInt(dismissedTime) < 60 * 60 * 1000) {
        return;
      }
      
      if (!lastActivity || now - parseInt(lastActivity) > 5 * 60 * 1000) {
        setShowNotice(true);
        setTimeLeft(15 * 60); // Reset timer when showing
      }
    } else {
      setShowNotice(false);
    }
  }, [items.length]);
  useEffect(() => {
    // Only set up the timer if we haven't already shown the notice
    if (items.length > 0 && !showNotice) {
      const timer = setTimeout(checkAbandonedCart, 5 * 60 * 1000); // Check after 5 minutes
      return () => clearTimeout(timer);
    }
  }, [items.length, showNotice]);
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    
    if (showNotice && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowNotice(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [showNotice]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinueShopping = () => {
    localStorage.setItem('lastCartActivity', Date.now().toString());
    setShowNotice(false);
  };

  const handleDismiss = () => {
    setShowNotice(false);
    localStorage.setItem('cartNoticeDismissed', Date.now().toString());
  };

  if (!showNotice || items.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in fade-in duration-300">
      <div className="animate-in slide-in-from-bottom duration-500">
        <Card className="p-4 shadow-lg border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">¡No olvides tu pedido!</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Tienes <Badge variant="secondary">{items.length}</Badge> productos esperándote
            </p>
            
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <Clock className="h-4 w-4" />
              <span>Oferta especial expira en: {formatTime(timeLeft)}</span>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <Gift className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">
                ¡Envío gratis en pedidos +$50!
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleContinueShopping}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                size="sm"
              >
                Finalizar Compra
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDismiss}
                size="sm"
              >
                Después
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CartAbandonmentNotice;
