
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Clock, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StoryDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const stories = [
    {
      id: 1,
      title: "El Arte del Werregue",
      content: `
        <p>El werregue es una técnica ancestral de tejido que ha sido transmitida de generación en generación en las comunidades afrocolombianas del Chocó. Esta tradición milenaria utiliza fibras naturales como la palma de werregue, que crece abundantemente en los húmedos bosques del Pacífico colombiano.</p>
        
        <p>Las mujeres chocoanas han perfeccionado esta técnica durante siglos, creando canastos, sombreros y objetos decorativos de una belleza y resistencia extraordinarias. Cada pieza cuenta una historia, cada patrón tiene un significado, y cada color representa un elemento de la naturaleza que rodea a estas comunidades.</p>
        
        <p>El proceso de creación comienza con la recolección de la palma de werregue en las primeras horas de la mañana, cuando la humedad mantiene las fibras flexibles. Las artesanas seleccionan cuidadosamente cada hebra, clasificándolas por grosor y calidad.</p>
        
        <p>La preparación de las fibras es un ritual en sí mismo. Se hierven con diferentes cortezas y plantas para obtener los colores tradicionales: el negro profundo del barro de los manglares, el marrón tierra de la corteza del mangle, y el amarillo dorado de la cúrcuma silvestre.</p>
        
        <p>El tejido requiere una paciencia y habilidad que solo se desarrolla con años de práctica. Las manos expertas de las maestras tejedoras pueden crear hasta 20 puntadas por minuto, manteniendo una tensión perfecta que garantiza la durabilidad de la pieza.</p>
      `,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLswbkOAcmwcFCNgL_xY92lp3tt-l8P_xdDa9NeBLMyAhttCigBtSeeMSBDYWe9t_a6Il0UXOknWI2os6CCt1I9dLJmTvuRwrdpcO5fU8cRdUV6BfD-ABk2X1qCIK4IVXewqMtVh3bp2ZjzYQUxMaICtzPAt-r9sk8cOmScenvCgfOu49lG540ua8ia-fYXo2vJf_I8K9z2g9-wk6qgaeYcJdr8X-iW-TIozAwtMBin40N51OqI-zRafq_1_esIJVjr_nxzGj1",
      readTime: "5 min lectura",
      author: "María del Carmen Mosquera",
      date: "15 de Octubre, 2024"
    },
    {
      id: 2,
      title: "Música y Tradición: El Currulao",
      content: `
        <p>El currulao es mucho más que música; es el alma del Pacífico colombiano expresándose a través de ritmos que conectan el corazón humano con los sonidos de la naturaleza. Este género musical tradicional nació en las comunidades afrodescendientes como una forma de resistencia cultural y celebración de la vida.</p>
        
        <p>Los instrumentos del currulao cuentan su propia historia. La marimba de chonta, tallada en maderas preciosas del bosque húmedo tropical, produce melodías que imitan el sonido de las cascadas y el viento entre las palmas. Sus teclas, afinadas según tradiciones orales transmitidas por siglos, crean armonías únicas que no se encuentran en ningún otro lugar del mundo.</p>
        
        <p>Los cununos y el bombo, tambores elaborados con maderas ahuecadas y pieles de animales del monte, marcan el compás que hace mover los cuerpos al ritmo de la Pachamama. Cada golpe resuena como el latido del corazón de la selva.</p>
        
        <p>Las guasás, elaboradas con semillas de plantas nativas, añaden la percusión sutil que simula el susurro de las hojas y el murmullo de los ríos. Su sonido acompaña las voces que narran historias de amor, resistencia y conexión con la tierra.</p>
        
        <p>Durante las sesiones de trabajo artesanal, el currulao fluye naturalmente. Las tejedoras cantan mientras sus manos crean, los talladores silban melodías ancestrales, y los alfareros marcan el ritmo con sus herramientas. Es así como la música y la artesanía se entrelazan en una sola expresión cultural.</p>
      `,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjqnGyGs8CvQ7D1JDSXhxnB5MeH2OfnX5F5ui3Im92a7iJxkR17wyt54-hX-JqeuJqqVkl7hPUqaTL0xxeGl1DVk9KjZgVpm3GhkCPf4nLPG-4cKFm3OSbZgpkKgkZIF9-ecJ-a7_xfMiF16m-fT6Pzs6FcL5rB4iRaRaQAssWyBd09WQxJbxSZciQzHbIJTJ4E29ZRAak6zXpQKgKdxjQDH8SsKLT9hLdfftb1M8dq1f14rTRoLobFn5fgtgYf7EJs1_S70j",
      readTime: "7 min lectura",
      author: "Jesús Antonio Palacios",
      date: "12 de Octubre, 2024"
    },
    {
      id: 3,
      title: "Sabiduría Ancestral en Cada Talla",
      content: `
        <p>En las manos curtidas de los maestros talladores del Chocó reside una sabiduría que trasciende generaciones. Cada corte de gubia, cada gesto de cincel, es una conversación íntima entre el artesano y el espíritu que habita en la madera.</p>
        
        <p>La selección de la madera es un ritual sagrado. Los maestros caminan por el bosque en las primeras horas del alba, cuando los árboles están en su estado más receptivo. Buscan señales: la dirección del viento en las ramas, el canto de ciertos pájaros, la forma en que la luz del amanecer toca el tronco.</p>
        
        <p>Las maderas preferidas son el chachajo, el roble y la palma de chonta. Cada una tiene su personalidad: el chachajo es noble y fácil de trabajar, ideal para figuras delicadas; el roble es resistente y duradero, perfecto para objetos utilitarios; la chonta es dura y desafiante, reservada para las obras maestras.</p>
        
        <p>Antes de comenzar la talla, el artesano debe "conversar" con la madera. Pasa las manos por toda la superficie, sintiendo la dirección de las vetas, identificando nudos y irregularidades que pueden convertirse en características especiales de la pieza final.</p>
        
        <p>Las herramientas tradicionales son extensiones del alma del tallador: gubias heredadas de abuelos, cuchillos forjados por herreros locales, lijas hechas con hojas ásperas de plantas del monte. Cada herramienta tiene su historia y su propósito específico en el proceso creativo.</p>
        
        <p>Las figuras talladas no son simples decoraciones. Cada una representa elementos del cosmos chocoano: jaguares que protegen el hogar, pájaros que traen buenas noticias, peces que aseguran la abundancia, y figuras humanas que honran a los ancestros.</p>
      `,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4XGsCBZ76gbzDLTBUKPL654varlCw0is3FwR5TP-2AgtxRDmuVaQBUgQYhGv5lkIHEZsWWoTzSz5B6CnSZG445gOdpFxA-mfBdpWwyXT2LK2_kjvbec21WiHOYY5MISY1EsF8KIoE8BYs4YizVUXxi_PcuMovWowjXjJOe-Aud0g0665YSEPgGeqresF6-ik1fkpMda7X3H2Fuy7Z-NCCwKrKppYK1w5ST3LJqrn1ab2J-3KsqfY1lFMG0Ew2BfvAIB8BVMn",
      readTime: "6 min lectura",
      author: "Evaristo Corpus Lozano",
      date: "8 de Octubre, 2024"
    }
  ];

  const story = stories.find(s => s.id === parseInt(id || ''));

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-primary-text mb-4">Historia no encontrada</h1>
            <Button asChild className="bg-primary-action hover:bg-primary-action/90 text-white">
              <Link to="/">Volver al inicio</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace ha sido copiado al portapapeles",
      });
    }
  };

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
              <BreadcrumbLink href="/#historias">Historias</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{story.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4 text-primary-secondary hover:text-primary-action">
              <Link to="/#historias" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Volver a Historias</span>
              </Link>
            </Button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
                  {story.title}
                </h1>
                <div className="flex flex-wrap items-center text-primary-secondary space-x-4 text-sm">
                  <span>Por {story.author}</span>
                  <span>•</span>
                  <span>{story.date}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{story.readTime}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={handleShare} className="border-primary-action text-primary-action hover:bg-primary-action hover:text-white">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>

            <img
              src={story.image}
              alt={story.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8"
            />
          </div>

          <article className="prose prose-lg max-w-none">
            <div 
              className="text-primary-secondary leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </article>

          <div className="mt-12 text-center">
            <Button asChild className="bg-primary-action hover:bg-primary-action/90 text-white">
              <Link to="/shop">Explorar Productos Artesanales</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoryDetail;
