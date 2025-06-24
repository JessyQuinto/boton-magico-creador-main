
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Terms = () => {
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
              <BreadcrumbPage>Términos y Condiciones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 text-center">
            Términos y Condiciones
          </h1>

          <div className="prose max-w-none">
            <div className="bg-background border border-secondary/20 rounded-xl p-8 shadow-lg space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">1. Aceptación de los Términos</h2>
                <p className="text-secondary leading-relaxed">
                  Al acceder y utilizar el sitio web de Chocó Artesanal, usted acepta estar sujeto a estos 
                  términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, 
                  no debe utilizar este sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">2. Descripción del Servicio</h2>
                <p className="text-secondary leading-relaxed">
                  Chocó Artesanal es una plataforma de comercio electrónico que facilita la venta de 
                  productos artesanales elaborados por comunidades del Pacífico colombiano. Nos 
                  comprometemos a ofrecer productos auténticos y de alta calidad.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">3. Productos y Precios</h2>
                <div className="text-secondary leading-relaxed space-y-3">
                  <p>
                    • Todos los productos son artesanales y pueden presentar variaciones naturales en tamaño, 
                    color y diseño que los hacen únicos.
                  </p>
                  <p>
                    • Los precios están expresados en pesos colombianos (COP) e incluyen impuestos aplicables.
                  </p>
                  <p>
                    • Nos reservamos el derecho de modificar precios sin previo aviso.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">4. Política de Envíos</h2>
                <div className="text-secondary leading-relaxed space-y-3">
                  <p>
                    • Los envíos se realizan a nivel nacional en Colombia.
                  </p>
                  <p>
                    • Los tiempos de entrega pueden variar entre 3-10 días hábiles dependiendo del destino.
                  </p>
                  <p>
                    • Los costos de envío se calculan según el peso y destino del pedido.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">5. Política de Devoluciones</h2>
                <div className="text-secondary leading-relaxed space-y-3">
                  <p>
                    • Aceptamos devoluciones dentro de los 15 días posteriores a la recepción del producto.
                  </p>
                  <p>
                    • El producto debe estar en condiciones originales y sin uso.
                  </p>
                  <p>
                    • Los gastos de envío para devoluciones corren por cuenta del cliente, excepto en 
                    casos de productos defectuosos.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">6. Privacidad y Protección de Datos</h2>
                <p className="text-secondary leading-relaxed">
                  Respetamos su privacidad y nos comprometemos a proteger sus datos personales de acuerdo 
                  con la Ley de Protección de Datos Personales de Colombia. Su información solo será 
                  utilizada para procesar pedidos y mejorar nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">7. Limitación de Responsabilidad</h2>
                <p className="text-secondary leading-relaxed">
                  Chocó Artesanal no será responsable por daños indirectos, incidentales o consecuentes 
                  que puedan surgir del uso de nuestros productos o servicios, más allá de lo establecido 
                  por la ley colombiana.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">8. Modificaciones</h2>
                <p className="text-secondary leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                  Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-4">9. Contacto</h2>
                <p className="text-secondary leading-relaxed">
                  Para cualquier consulta sobre estos términos y condiciones, puede contactarnos a través 
                  de nuestro formulario de contacto o enviando un email a info@chocoartesanal.com.
                </p>
              </section>

              <div className="text-center pt-6 border-t border-secondary/20">
                <p className="text-secondary text-sm">
                  Última actualización: {new Date().toLocaleDateString('es-CO', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
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

export default Terms;
