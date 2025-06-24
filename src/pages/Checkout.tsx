
import { useState } from "react";
import { CreditCard, MapPin, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useStore, useCartItems, useCartTotal, useAuth } from "@/store/useStore";

const Checkout = () => {
  const { completeOrder, addAddress } = useStore();
  const cartItems = useCartItems();
  const cartTotal = useCartTotal();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [processing, setProcessing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: ""
  });
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal;
  const shipping = 0;
  const taxes = Math.round(subtotal * 0.19); // IVA Colombia 19%
  const total = subtotal + shipping + taxes;

  const userAddresses = user?.addresses || [];
  const hasAddresses = userAddresses.length > 0;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar dirección
    if (!selectedAddressId && !showNewAddressForm) {
      newErrors.address = "Debes seleccionar o crear una dirección";
    }

    if (showNewAddressForm) {
      if (!newAddress.fullName.trim()) newErrors.fullName = "El nombre completo es requerido";
      if (!newAddress.address.trim()) newErrors.addressField = "La dirección es requerida";
      if (!newAddress.city.trim()) newErrors.city = "La ciudad es requerida";
      if (!newAddress.postalCode.trim()) newErrors.postalCode = "El código postal es requerido";
    }

    if (paymentMethod === "credit-card") {
      if (!cardInfo.number.replace(/\s/g, "")) newErrors.cardNumber = "El número de tarjeta es requerido";
      if (!cardInfo.expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = "Formato inválido (MM/AA)";
      if (!cardInfo.cvv.match(/^\d{3,4}$/)) newErrors.cvv = "CVV inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveNewAddress = () => {
    if (newAddress.fullName && newAddress.address && newAddress.city && newAddress.postalCode) {
      addAddress({
        ...newAddress,
        isDefault: userAddresses.length === 0
      });
      setShowNewAddressForm(false);
      setNewAddress({
        name: "",
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: ""
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || cartItems.length === 0) return;

    setProcessing(true);
    
    setTimeout(() => {
      completeOrder();
      setProcessing(false);
      
      const orderId = Math.random().toString(36).substr(2, 9);
      window.location.href = `/order-confirmation?order_id=${orderId}`;
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-text mb-4">Carrito Vacío</h1>
            <p className="text-primary-secondary mb-8">No tienes productos en tu carrito para proceder al checkout.</p>
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
        <nav className="mb-6 md:mb-8">
          <ol className="flex items-center space-x-2 text-sm text-primary-secondary">
            <li><a href="/cart" className="hover:text-primary-action">Carrito</a></li>
            <li>/</li>
            <li className="text-primary-text font-medium">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-2xl md:text-4xl font-bold text-primary-text mb-6 md:mb-8">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="space-y-6 md:space-y-8">
            {/* Dirección de Envío */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Dirección de Envío
                </CardTitle>
                <CardDescription>Selecciona o agrega una dirección de envío</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hasAddresses && (
                  <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
                    {userAddresses.map((address) => (
                      <div key={address.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={address.id} id={address.id} />
                        <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{address.name || address.fullName}</div>
                          <div className="text-sm text-gray-600">
                            {address.address}, {address.city}
                          </div>
                          <div className="text-sm text-gray-500">{address.postalCode}</div>
                          {address.isDefault && (
                            <span className="text-xs bg-action text-white px-2 py-1 rounded">Predeterminada</span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {!showNewAddressForm ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowNewAddressForm(true)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {hasAddresses ? "Agregar Nueva Dirección" : "Agregar Dirección"}
                  </Button>
                ) : (
                  <div className="space-y-4 border rounded-lg p-4">
                    <h4 className="font-medium">Nueva Dirección</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="newFullName">Nombre Completo *</Label>
                        <Input
                          id="newFullName"
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, fullName: e.target.value }))}
                          className={errors.fullName ? "border-red-500" : ""}
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="newName">Nombre de la Dirección</Label>
                        <Input
                          id="newName"
                          placeholder="Casa, Oficina, etc."
                          value={newAddress.name}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="newAddress">Dirección *</Label>
                      <Input
                        id="newAddress"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                        className={errors.addressField ? "border-red-500" : ""}
                      />
                      {errors.addressField && <p className="text-red-500 text-sm mt-1">{errors.addressField}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="newCity">Ciudad *</Label>
                        <Input
                          id="newCity"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="newPostalCode">Código Postal *</Label>
                        <Input
                          id="newPostalCode"
                          value={newAddress.postalCode}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                          className={errors.postalCode ? "border-red-500" : ""}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPhone">Teléfono</Label>
                      <Input
                        id="newPhone"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleSaveNewAddress} size="sm">
                        Guardar Dirección
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewAddressForm(false)} size="sm">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <strong>Envíos solo a Colombia:</strong> Realizamos entregas únicamente dentro del territorio colombiano.
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
              <CardContent className="space-y-4">
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

                {paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4 border-t pt-6">
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                        maxLength={19}
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">MM/AA *</Label>
                        <Input
                          id="expiry"
                          placeholder="12/25"
                          value={cardInfo.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value = value.substring(0, 2) + "/" + value.substring(2, 4);
                            }
                            setCardInfo(prev => ({ ...prev, expiry: value }));
                          }}
                          maxLength={5}
                          className={errors.expiry ? "border-red-500" : ""}
                        />
                        {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                      </div>

                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))}
                          maxLength={4}
                          className={errors.cvv ? "border-red-500" : ""}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
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
                      <h4 className="font-medium text-primary-text text-sm truncate">{item.name}</h4>
                      <p className="text-primary-secondary text-sm">Cantidad: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${item.total.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-primary-secondary">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-secondary">Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary-secondary">IVA (19%):</span>
                  <span className="font-semibold">${taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg border-t pt-3">
                  <span className="font-bold text-primary-text">Total:</span>
                  <span className="font-bold text-action">${total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="w-full mt-6 bg-action hover:bg-action/90 text-white py-3 md:py-4 text-base md:text-lg font-semibold disabled:opacity-50"
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
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
