
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { storiesData } from "@/data/stories";
import StoryCard from "@/components/StoryCard";

const CulturalStories = () => {
  return (
    <section className="py-20 bg-primary-background" id="historias">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text">
            Historias Culturales
          </h2>
          <p className="text-lg text-primary-secondary max-w-2xl mx-auto">
            Cada artesanía lleva consigo siglos de historia y tradición. 
            Conoce las raíces culturales que dan vida a estas creaciones únicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storiesData.map((story) => (
            <StoryCard key={story.id} story={story} variant="featured" />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary-action hover:bg-primary-action/90 text-white px-8 py-4 text-lg font-semibold border-0 shadow-md hover:shadow-lg transition-all">
            <Link to="/stories" className="flex items-center space-x-2">
              <span>Ver Todas las Historias</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CulturalStories;
