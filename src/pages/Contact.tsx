
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validación
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un email válido",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Simular envío
    setTimeout(() => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Te contactaremos pronto."
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setLoading(false);
    }, 1000);
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
              <BreadcrumbPage>Contacto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 text-center">
            Contáctanos
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Información de Contacto
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">Dirección</h3>
                    <p className="text-secondary">
                      Quibdó, Chocó<br />
                      Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">Teléfono</h3>
                    <p className="text-secondary">+57 (4) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-secondary">info@chocoartesanal.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">Horario de Atención</h3>
                    <p className="text-secondary">
                      Lunes - Viernes: 8:00 AM - 6:00 PM<br />
                      Sábado: 9:00 AM - 4:00 PM<br />
                      Domingo: Cerrado
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4XGsCBZ76gbzDLTBUKPL654varlCw0is3FwR5TP-2AgtxRDmuVaQBUgQYhGv5lkIHEZsWWoTzSz5B6CnSZG445gOdpFxA-mfBdpWwyXT2LK2_kjvbec21WiHOYY5MISY1EsF8KIoE8BYs4YizVUXxi_PcuMovWowjXjJOe-Aud0g0665YSEPgGeqresF6-ik1fkpMda7X3H2Fuy7Z-NCCwKrKppYK1w5ST3LJqrn1ab2J-3KsqfY1lFMG0Ew2BfvAIB8BVMn"
                  alt="Contacto Chocó Artesanal"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Formulario de contacto */}
            <div>
              <div className="bg-background border border-secondary/20 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Envíanos un Mensaje
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-primary">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 border-secondary/30 focus:border-action"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-primary">
                      Correo Electrónico *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 border-secondary/30 focus:border-action"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-primary">
                      Asunto *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1 border-secondary/30 focus:border-action"
                      placeholder="Asunto de tu mensaje"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-primary">
                      Mensaje *
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-secondary/30 rounded-md focus:border-action focus:outline-none resize-vertical"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-action hover:bg-action/90 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {loading ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
