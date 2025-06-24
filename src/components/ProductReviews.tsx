
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";
import { useAuth } from "@/store/useStore";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user: "María González",
      rating: 5,
      comment: "Hermoso trabajo artesanal, la calidad es excepcional. Se nota el amor y dedicación en cada detalle.",
      date: "2024-10-15"
    },
    {
      id: 2,
      user: "Carlos Rodríguez",
      rating: 4,
      comment: "Muy bonito producto, llegó en perfectas condiciones. El empaque también era muy cuidadoso.",
      date: "2024-10-12"
    }
  ]);

  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (!isLoggedIn) {
      toast({
        title: "Inicia sesión requerida",
        description: "Debes iniciar sesión para escribir una reseña",
        variant: "destructive"
      });
      return;
    }

    if (!newReview.comment.trim()) {
      toast({
        title: "Comentario requerido",
        description: "Por favor escribe un comentario sobre el producto",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      user: "Usuario Actual",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    
    toast({
      title: "¡Reseña enviada!",
      description: "Gracias por compartir tu opinión"
    });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-primary-text mb-4">
          Reseñas ({reviews.length})
        </h3>
        
        {reviews.length > 0 && (
          <div className="flex items-center space-x-4 mb-6 p-4 bg-primary-background rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-text">
                {averageRating.toFixed(1)}
              </div>
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-primary-secondary">
              Basado en {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
            </div>
          </div>
        )}
      </div>

      {/* Formulario para nueva reseña */}
      <div className="border border-primary-secondary/20 rounded-lg p-6 space-y-4">
        <h4 className="font-semibold text-primary-text">Escribir una reseña</h4>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-text">Calificación</label>
          {renderStars(newReview.rating, true, (rating) => 
            setNewReview(prev => ({ ...prev, rating }))
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary-text">Comentario</label>
          <Textarea
            value={newReview.comment}
            onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Comparte tu experiencia con este producto..."
            className="min-h-20"
          />
        </div>

        <Button 
          onClick={handleSubmitReview}
          className="bg-primary-action hover:bg-primary-action/90 text-white"
        >
          Enviar Reseña
        </Button>
      </div>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-primary-secondary/20 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary-background rounded-full">
                  <User className="h-4 w-4 text-primary-secondary" />
                </div>
                <div>
                  <div className="font-medium text-primary-text">{review.user}</div>
                  <div className="text-sm text-primary-secondary">{review.date}</div>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>
            <p className="text-primary-secondary leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
