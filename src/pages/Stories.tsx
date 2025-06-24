
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { storiesData } from "@/data/stories";
import StoryCard from "@/components/StoryCard";

const Stories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Historias Culturales</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-16 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text">
            Historias Culturales
          </h1>
          <p className="text-lg text-primary-secondary max-w-2xl mx-auto">
            Cada artesanía lleva consigo siglos de historia y tradición. 
            Conoce las raíces culturales que dan vida a estas creaciones únicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {storiesData.map((story) => (
            <StoryCard key={story.id} story={story} variant="detailed" />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stories;
