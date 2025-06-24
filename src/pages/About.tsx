
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const About = () => {
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
              <BreadcrumbPage>Sobre Nosotros</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 text-center">
            Sobre Chocó Artesanal
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLswbkOAcmwcFCNgL_xY92lp3tt-l8P_xdDa9NeBLMyAhttCigBtSeeMSBDYWe9t_a6Il0UXOknWI2os6CCt1I9dLJmTvuRwrdpcO5fU8cRdUV6BfD-ABk2X1qCIK4IVXewqMtVh3bp2ZjzYQUxMaICtzPAt-r9sk8cOmScenvCgfOu49lG540ua8ia-fYXo2vJf_I8K9z2g9-wk6qgaeYcJdr8X-iW-TIozAwtMBin40N51OqI-zRafq_1_esIJVjr_nxzGj1"
                alt="Artesanos del Chocó trabajando"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Nuestra Misión
              </h2>
              <p className="text-secondary text-lg leading-relaxed">
                Conectamos las tradiciones ancestrales del Pacífico colombiano con el mundo, 
                ofreciendo productos artesanales únicos que reflejan la riqueza cultural y 
                la maestría de nuestros artesanos chocoanos.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Nuestra Historia
              </h2>
              <p className="text-secondary text-lg leading-relaxed mb-4">
                Desde hace más de 10 años, trabajamos directamente con comunidades 
                afrodescendientes e indígenas del Chocó, promoviendo el comercio justo 
                y la preservación de técnicas tradicionales.
              </p>
              <p className="text-secondary text-lg leading-relaxed">
                Cada producto cuenta una historia de resistencia, creatividad y amor 
                por la tradición que se transmite de generación en generación.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARjqnGyGs8CvQ7D1JDSXhxnB5MeH2OfnX5F5ui3Im92a7iJxkR17wyt54-hX-JqeuJqqVkl7hPUqaTL0xxeGl1DVk9KjZgVpm3GhkCPf4nLPG-4cKFm3OSbZgpkKgkZIF9-ecJ-a7_xfMiF16m-fT6Pzs6FcL5rB4iRaRaQAssWyBd09WQxJbxSZciQzHbIJTJ4E29ZRAak6zXpQKgKdxjQDH8SsKLT9hLdfftb1M8dq1f14rTRoLobFn5fgtgYf7EJs1_S70j"
                alt="Tradiciones culturales del Chocó"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="bg-background border border-secondary/20 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
              Nuestros Valores
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-2">Autenticidad</h3>
                <p className="text-secondary">
                  Productos 100% auténticos, elaborados con técnicas tradicionales
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-2">Comercio Justo</h3>
                <p className="text-secondary">
                  Pagamos precios justos que dignifican el trabajo artesanal
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-2">Sostenibilidad</h3>
                <p className="text-secondary">
                  Respetamos el medio ambiente y las tradiciones ancestrales
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
