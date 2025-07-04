
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { Address } from "@/store/useStore";
import { useAuth, useCartItems, useStore, useWishlist } from "@/store/useStore";
import { Edit2, Heart, MapPin, Plus, ShoppingBag, Star, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { updateUser, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useStore();
  const cartItems = useCartItems();
  const wishlist = useWishlist();
  const { user, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [newAddress, setNewAddress] = useState({
    name: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: ""
  });

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
      return;
    }

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || ""
    });
  }, [isLoggedIn, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      name: `${formData.firstName} ${formData.lastName}`
    });

    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Perfil actualizado exitosamente"
    });
  };

  const handleSaveAddress = () => {
    if (!newAddress.fullName || !newAddress.address || !newAddress.city || !newAddress.postalCode) {
      showError("Por favor, completa todos los campos obligatorios de la dirección");
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress, newAddress);
      showSuccess("Dirección actualizada exitosamente");
      setEditingAddress(null);
    } else {
      const isFirstAddress = !user?.addresses || user.addresses.length === 0;
      addAddress({
        ...newAddress,
        isDefault: isFirstAddress
      });
      showSuccess("Dirección agregada exitosamente");
      setShowNewAddressForm(false);
    }

    setNewAddress({
      name: "",
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: ""
    });
  };

  const handleEditAddress = (address: Address) => {
    setNewAddress({
      name: address.name || "",
      fullName: address.fullName || "",
      address: address.address || "",
      city: address.city || "",
      postalCode: address.postalCode || "",
      phone: address.phone || ""
    });
    setEditingAddress(address.id);
    setShowNewAddressForm(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
      deleteAddress(addressId);
      showSuccess("Dirección eliminada exitosamente");
    }
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setDefaultAddress(addressId);
    showSuccess("Dirección predeterminada actualizada");
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
    setIsEditing(false);
  };

  const handleCancelAddress = () => {
    setNewAddress({
      name: "",
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: ""
    });
    setShowNewAddressForm(false);
    setEditingAddress(null);
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  const totalSpent = cartItems.reduce((sum, item) => sum + item.total, 0);
  const userAddresses = user.addresses || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2">
              Mi Perfil
            </h1>
            <p className="text-secondary">
              Gestiona tu información personal y revisa tu actividad
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                <User className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Direcciones</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                <ShoppingBag className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                <Heart className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Favoritos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription>
                        Actualiza tu información de contacto
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="hidden sm:inline">{isEditing ? "Cancelar" : "Editar"}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-primary">
                        Nombre *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-secondary/30 focus:border-action"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-primary">
                        Apellido *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-secondary/30 focus:border-action"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-primary">
                      Correo Electrónico *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 border-secondary/30 focus:border-action"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-primary">
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 border-secondary/30 focus:border-action"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <Button onClick={handleSaveProfile} className="bg-action hover:bg-action/90">
                        Guardar Cambios
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Resumen de Actividad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-action">{cartItems.length}</div>
                      <div className="text-sm text-secondary">Productos en carrito</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-action">{wishlist.length}</div>
                      <div className="text-sm text-secondary">Productos favoritos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-action">${totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-secondary">Total en carrito</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Mis Direcciones</CardTitle>
                      <CardDescription>
                        Gestiona tus direcciones de envío
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setShowNewAddressForm(true)}
                      className="bg-action hover:bg-action/90 flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Nueva Dirección</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {userAddresses.length === 0 && !showNewAddressForm ? (
                    <div className="text-center py-12">
                      <MapPin className="h-12 w-12 text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No tienes direcciones guardadas
                      </h3>
                      <p className="text-secondary mb-6">
                        Agrega una dirección para facilitar tus compras futuras
                      </p>
                      <Button onClick={() => setShowNewAddressForm(true)} className="bg-action hover:bg-action/90">
                        Agregar Primera Dirección
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userAddresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{address.name || "Dirección sin nombre"}</h4>
                                {address.isDefault && (
                                  <span className="bg-action text-white text-xs px-2 py-1 rounded">
                                    Predeterminada
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-secondary">{address.fullName}</p>
                              <p className="text-sm text-secondary">{address.address}</p>
                              <p className="text-sm text-secondary">{address.city}, {address.postalCode}</p>
                              {address.phone && (
                                <p className="text-sm text-secondary">Tel: {address.phone}</p>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                              {!address.isDefault && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSetDefaultAddress(address.id)}
                                  className="text-xs"
                                >
                                  <Star className="h-3 w-3" />
                                  <span className="hidden sm:inline ml-1">Predeterminar</span>
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditAddress(address)}
                                className="text-xs"
                              >
                                <Edit2 className="h-3 w-3" />
                                <span className="hidden sm:inline ml-1">Editar</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteAddress(address.id)}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="hidden sm:inline ml-1">Eliminar</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {showNewAddressForm && (
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <h4 className="font-medium mb-4">
                            {editingAddress ? "Editar Dirección" : "Nueva Dirección"}
                          </h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="addressName">Nombre de la Dirección</Label>
                                <Input
                                  id="addressName"
                                  name="name"
                                  placeholder="Casa, Oficina, etc."
                                  value={newAddress.name}
                                  onChange={handleAddressChange}
                                />
                              </div>
                              <div>
                                <Label htmlFor="addressFullName">Nombre Completo *</Label>
                                <Input
                                  id="addressFullName"
                                  name="fullName"
                                  value={newAddress.fullName}
                                  onChange={handleAddressChange}
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="addressAddress">Dirección *</Label>
                              <Input
                                id="addressAddress"
                                name="address"
                                value={newAddress.address}
                                onChange={handleAddressChange}
                                required
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="addressCity">Ciudad *</Label>
                                <Input
                                  id="addressCity"
                                  name="city"
                                  value={newAddress.city}
                                  onChange={handleAddressChange}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="addressPostalCode">Código Postal *</Label>
                                <Input
                                  id="addressPostalCode"
                                  name="postalCode"
                                  value={newAddress.postalCode}
                                  onChange={handleAddressChange}
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="addressPhone">Teléfono</Label>
                              <Input
                                id="addressPhone"
                                name="phone"
                                value={newAddress.phone}
                                onChange={handleAddressChange}
                              />
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              <Button onClick={handleSaveAddress} className="bg-action hover:bg-action/90">
                                {editingAddress ? "Actualizar Dirección" : "Guardar Dirección"}
                              </Button>
                              <Button variant="outline" onClick={handleCancelAddress}>
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Pedidos</CardTitle>
                  <CardDescription>
                    Revisa tus compras anteriores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      No tienes pedidos aún
                    </h3>
                    <p className="text-secondary mb-6">
                      Explora nuestra tienda y realiza tu primera compra
                    </p>
                    <Button asChild className="bg-action hover:bg-action/90">
                      <a href="/shop">Ir a la Tienda</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Favoritos</CardTitle>
                  <CardDescription>
                    Productos que has guardado para más tarde
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No tienes favoritos aún
                      </h3>
                      <p className="text-secondary mb-6">
                        Explora productos y añádelos a tu lista de favoritos
                      </p>
                      <Button asChild className="bg-action hover:bg-action/90">
                        <a href="/shop">Explorar Productos</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((product) => (
                        <div key={product.id} className="border border-secondary/20 rounded-lg p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h4 className="font-semibold text-primary mb-2 line-clamp-2">
                            {product.name}
                          </h4>
                          <p className="text-secondary text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-action">
                              ${product.price.toLocaleString()}
                            </span>
                            <Button size="sm" asChild className="bg-action hover:bg-action/90">
                              <a href={`/product-detail?slug=${product.slug}`}>Ver</a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
