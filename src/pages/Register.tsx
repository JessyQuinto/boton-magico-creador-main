import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import { useStore } from "@/store/useStore";
import type { RegisterRequestDto } from "@/types/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Validación de términos y condiciones
    if (!acceptTerms) {
      showError("Debes aceptar los términos y condiciones");
      setLoading(false);
      return;
    }

    // Validación básica
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      showError("Por favor, completa todos los campos obligatorios");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      showError("Por favor, ingresa un email válido");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      showError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      // Preparar datos según la API documentation
      const registerData: RegisterRequestDto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        address: formData.address || undefined
      };

      // Llamada real a la API
      const authResponse = await authService.register(registerData);

      // El servicio ya maneja el almacenamiento de tokens
      // Actualizar el estado de autenticación en el store
      login({
        id: authResponse.user.id,
        name: `${authResponse.user.firstName} ${authResponse.user.lastName}`,
        email: authResponse.user.email,
        firstName: authResponse.user.firstName,
        lastName: authResponse.user.lastName,
        phone: authResponse.user.phone,
        address: authResponse.user.address
      });

      showSuccess("¡Cuenta creada exitosamente! Bienvenido a Chocó Artesanal");
      navigate("/profile");
    } catch (error) {
      console.error('Registration error:', error);
      showError(error instanceof Error ? error.message : "Error en el registro. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-secondary/20 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">
                Crear Cuenta
              </h1>
              <p className="text-secondary">
                Únete a la comunidad de Chocó Artesanal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-primary">
                    Nombre
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 border-secondary/30 focus:border-action"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-primary">
                    Apellido
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 border-secondary/30 focus:border-action"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-primary">
                  Correo Electrónico
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
                <Label htmlFor="password" className="text-primary">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 border-secondary/30 focus:border-action"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-primary">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 border-secondary/30 focus:border-action"
                  placeholder="Repite tu contraseña"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-primary">
                  Teléfono <span className="text-secondary">(opcional)</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 border-secondary/30 focus:border-action"
                  placeholder="Ej: +57 300 123 4567"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-primary">
                  Dirección <span className="text-secondary">(opcional)</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 border-secondary/30 focus:border-action"
                  placeholder="Tu dirección completa"
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(checked === true);
                  }}
                />
                <label htmlFor="terms" className="text-sm text-secondary leading-relaxed cursor-pointer">
                  Acepto los{" "}
                  <Link to="/terms" className="text-action hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-action hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading || !acceptTerms}
                className="w-full bg-action hover:bg-action/90 text-white py-3 text-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-secondary">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-action hover:underline font-semibold">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
