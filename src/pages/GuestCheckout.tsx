
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useCartItems, useCartTotal, useStore } from "@/store/useStore";
import { CreditCard, MapPin, User } from "lucide-react";
import { useState } from "react";

interface GuestInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  department: string;
}

const GuestCheckout = () => {
  const { completeOrder } = useStore();
  const cartItems = useCartItems();
  const cartTotal = useCartTotal();
  const { toast } = useToast();

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    department: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [processing, setProcessing] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal;
  const shipping = 0;
  const taxes = Math.round(subtotal * 0.19);
  const total = subtotal + shipping + taxes;

  const colombianDepartments = [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá",
    "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó",
    "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira",
    "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo",
    "Quindío", "Risaralda", "San Andrés y Providencia", "Santander",
    "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!guestInfo.email.trim() || !/\S+@\S+\.\S+/.test(guestInfo.email)) {
      newErrors.email = "Email válido es requerido";
    }
    if (!guestInfo.firstName.trim()) newErrors.firstName = "Nombre es requerido";
    if (!guestInfo.lastName.trim()) newErrors.lastName = "Apellido es requerido";
    if (!guestInfo.phone.trim()) newErrors.phone = "Teléfono es requerido";
    if (!guestInfo.address.trim()) newErrors.address = "Dirección es requerida";
    if (!guestInfo.city.trim()) newErrors.city = "Ciudad es requerida";
    if (!guestInfo.postalCode.trim()) newErrors.postalCode = "Código postal es requerido";
    if (!guestInfo.department.trim()) newErrors.department = "Departamento es requerido";

    if (!acceptTerms) newErrors.terms = "Debes aceptar los términos y condiciones";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || cartItems.length === 0) return;

    setProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      completeOrder();
      showSuccess("¡Pedido realizado con éxito!");

      const orderId = Math.random().toString(36).substr(2, 9);
      window.location.href = `/order-confirmation?order_id=${orderId}&guest=true`;
    } catch (error) {
      showError("Error al procesar el pedido");
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Carrito Vacío</h1>
            <p className="text-secondary mb-8">No tienes productos en tu carrito.</p>
            <Button asChild className="bg-action hover:bg-action/90">
              <a href="/shop">Ir a la Tienda</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-primary mb-6 md:mb-8">
          Checkout como Invitado
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="space-y-6 md:space-y-8">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Información Personal
                </CardTitle>
                <CardDescription>Complete sus datos para el envío</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      value={guestInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      value={guestInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={guestInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="createAccount"
                    checked={createAccount}
                    onCheckedChange={(checked) => setCreateAccount(checked === true)}
                  />
                  <Label htmlFor="createAccount" className="text-sm">
                    ¿Desea crear una cuenta para futuras compras?
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Dirección de Envío */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Dirección de Envío
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    value={guestInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      value={guestInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="department">Departamento *</Label>
                    <select
                      id="department"
                      value={guestInfo.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md ${errors.department ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Seleccionar departamento</option>
                      {colombianDepartments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="postalCode">Código Postal *</Label>
                  <Input
                    id="postalCode"
                    value={guestInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className={errors.postalCode ? "border-red-500" : ""}
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Método de Pago */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Método de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      <span>Tarjeta de Crédito/Débito</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">Pago Contraentrega</Label>
                  </div>
                </RadioGroup>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> Envíos gratuitos a toda Colombia. Tiempo de entrega: 3-5 días hábiles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumen del Pedido */}
          <Card className="h-fit sticky top-8">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-primary text-sm truncate">{item.name}</h4>
                      <p className="text-secondary text-sm">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${item.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">IVA (19%):</span>
                  <span className="font-semibold">${taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg border-t pt-3">
                  <span className="font-bold text-primary">Total:</span>
                  <span className="font-bold text-action">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    Acepto los términos y condiciones y la política de privacidad
                  </Label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

                <Button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full bg-action hover:bg-action/90 text-white py-3 md:py-4 text-base md:text-lg font-semibold disabled:opacity-50"
                >
                  {processing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Procesando...</span>
                    </div>
                  ) : (
                    "Realizar Pedido"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuestCheckout;
