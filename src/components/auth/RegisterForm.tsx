import { useAuth } from '@/hooks/api/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFormError('Por favor complete todos los campos obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setFormError('');

      // Use the new API hook for registration
      const result = await register.execute({
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
      });

      if (result) {
        toast({
          title: "¡Registro Exitoso!",
          description: "Bienvenido a Tesoros del Chocó.",
          variant: "default",
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setFormError(register.error || 'Error al registrar usuario. Intenta nuevamente.');
      toast({
        title: "Error de Registro",
        description: register.error || "No se pudo completar el registro. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-tesoros-gold/20 dark:border-gray-700 transition-colors duration-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-tesoros-brown dark:text-white">Crear Cuenta</h2>
        <p className="text-tesoros-brown/70 dark:text-gray-300 mt-2">¡Únete a Tesoros del Chocó!</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-tesoros-brown dark:text-white mb-1">
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 border border-tesoros-gold/30 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-tesoros-green dark:focus:ring-tesoros-gold bg-white dark:bg-gray-700 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-tesoros-brown dark:text-white mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-tesoros-gold/30 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-tesoros-green dark:focus:ring-tesoros-gold bg-white dark:bg-gray-700 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-tesoros-brown dark:text-white mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-tesoros-gold/30 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-tesoros-green dark:focus:ring-tesoros-gold bg-white dark:bg-gray-700 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-tesoros-brown/60 dark:text-gray-400 hover:text-tesoros-brown dark:hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          <p className="text-xs text-tesoros-brown/60 dark:text-gray-400 mt-1">Mínimo 6 caracteres</p>
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-tesoros-brown dark:text-white mb-1">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-2 border border-tesoros-gold/30 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-tesoros-green dark:focus:ring-tesoros-gold bg-white dark:bg-gray-700 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium text-white transition-all ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-tesoros-green hover:bg-tesoros-blue dark:bg-tesoros-gold dark:hover:bg-tesoros-gold/90 dark:text-black shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
        >
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-tesoros-brown/70 dark:text-gray-300">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-tesoros-green dark:text-tesoros-gold hover:text-tesoros-blue dark:hover:text-tesoros-gold/80 font-medium transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>

      <div className="mt-4 text-xs text-center text-tesoros-brown/60 dark:text-gray-400">
        Al crear una cuenta, aceptas nuestros{' '}
        <Link to="/terminos" className="text-tesoros-green dark:text-tesoros-gold hover:text-tesoros-blue dark:hover:text-tesoros-gold/80 transition-colors">
          Términos y Condiciones
        </Link>{' '}
        y{' '}
        <Link to="/privacidad" className="text-tesoros-green dark:text-tesoros-gold hover:text-tesoros-blue dark:hover:text-tesoros-gold/80 transition-colors">
          Política de Privacidad
        </Link>.
      </div>
    </div>
  );
};

export default RegisterForm;
