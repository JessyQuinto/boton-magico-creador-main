
import { useAuth } from '@/hooks/api/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Zod schema for validation
const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingrese un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Use the new API hook for login
      const result = await login.execute({
        email: data.email,
        password: data.password,
      });

      if (result) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión exitosamente.",
          variant: "default",
        });
        navigate('/');
      }
    } catch (err) {
      console.error("Login submission error:", err);
      toast({
        title: "Error de Autenticación",
        description: login.error || "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      form.setError("root.serverError", {
        type: "manual",
        message: login.error || "Error durante el inicio de sesión."
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-tesoros-gold/20 dark:border-gray-700 transition-colors duration-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-tesoros-brown dark:text-white mb-2">Iniciar Sesión</h2>
        <p className="text-tesoros-brown/70 dark:text-gray-300">¡Bienvenido de nuevo!</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-tesoros-brown dark:text-white">
                  Correo electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...field}
                    className="w-full px-4 py-3 border-2 border-tesoros-gold/30 dark:border-gray-600 rounded-lg focus:outline-none focus:border-tesoros-green dark:focus:border-tesoros-gold focus:ring-2 focus:ring-tesoros-green/20 dark:focus:ring-tesoros-gold/20 transition-all bg-white dark:bg-gray-700 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-sm font-semibold text-tesoros-brown dark:text-white">
                    Contraseña
                  </FormLabel>
                  <Link to="/reset-password" className="text-sm text-tesoros-green dark:text-tesoros-gold hover:text-tesoros-blue dark:hover:text-tesoros-gold/80 transition-colors">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="w-full px-4 py-3 border-2 border-tesoros-gold/30 dark:border-gray-600 rounded-lg focus:outline-none focus:border-tesoros-green dark:focus:border-tesoros-gold focus:ring-2 focus:ring-tesoros-green/20 dark:focus:ring-tesoros-gold/20 transition-all pr-12 bg-white dark:bg-gray-700 text-tesoros-brown dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-tesoros-brown/60 dark:text-gray-400 hover:text-tesoros-brown dark:hover:text-white transition-colors h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.serverError && (
            <div className="text-sm font-medium text-destructive">
              {form.formState.errors.root.serverError.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={login.loading}
            className="w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all transform hover:scale-105 shadow-lg bg-tesoros-green hover:bg-tesoros-blue dark:bg-tesoros-gold dark:hover:bg-tesoros-gold/90 dark:text-black active:bg-tesoros-brown shadow-tesoros-green/30 hover:shadow-tesoros-blue/30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {login.loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-tesoros-brown/70 dark:text-gray-300">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-tesoros-green dark:text-tesoros-gold hover:text-tesoros-blue dark:hover:text-tesoros-gold/80 font-semibold transition-colors">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
