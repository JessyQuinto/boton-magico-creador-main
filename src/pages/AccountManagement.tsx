
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Edit, Search, Shield, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data para las cuentas
const mockAccounts = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15',
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@ejemplo.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14',
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos@ejemplo.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-01-10',
  },
];

const AccountManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState(mockAccounts);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'destructive' : 'secondary';
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const handleDeactivateAccount = (id: number) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === id
          ? { ...account, status: account.status === 'active' ? 'inactive' : 'active' }
          : account
      )
    );
  };

  const handleDeleteAccount = (id: number) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-choco-cream via-white to-choco-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
        <div className="container-custom max-w-6xl">
          <div className="mb-8">
            <Link
              to="/"
              className="text-choco-brown hover:text-choco-green dark:text-gray-300 dark:hover:text-choco-gold inline-flex items-center group transition-all"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Volver al inicio</span>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-choco-gold/20 dark:border-gray-700 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-choco-brown dark:text-white mb-4">
                Gestión de Cuentas
              </h1>
              <p className="text-choco-brown/70 dark:text-gray-300">
                Administra las cuentas de usuarios registrados en la plataforma.
              </p>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre o correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-choco-gold/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-hidden border border-choco-gold/20 dark:border-gray-700 rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-choco-cream/50 dark:bg-gray-700/50">
                    <TableHead className="text-choco-brown dark:text-white">Usuario</TableHead>
                    <TableHead className="text-choco-brown dark:text-white">Rol</TableHead>
                    <TableHead className="text-choco-brown dark:text-white">Estado</TableHead>
                    <TableHead className="text-choco-brown dark:text-white">Último acceso</TableHead>
                    <TableHead className="text-choco-brown dark:text-white">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id} className="hover:bg-choco-cream/30 dark:hover:bg-gray-700/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-choco-gold/20 dark:bg-gray-600 flex items-center justify-center">
                            <User className="h-4 w-4 text-choco-brown dark:text-gray-300" />
                          </div>
                          <div>
                            <div className="font-medium text-choco-brown dark:text-white">{account.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{account.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(account.role)}>
                          {account.role === 'admin' ? 'Administrador' : 'Usuario'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(account.status)}>
                          {account.status === 'active' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {account.lastLogin}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-choco-gold/20 dark:hover:bg-gray-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeactivateAccount(account.id)}
                            className="h-8 w-8 p-0 hover:bg-choco-blue/20 dark:hover:bg-gray-600"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
                              <DialogHeader>
                                <DialogTitle className="dark:text-white">¿Eliminar cuenta?</DialogTitle>
                                <DialogDescription className="dark:text-gray-300">
                                  Esta acción no se puede deshacer. Se eliminará permanentemente la cuenta de {account.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                                  Cancelar
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDeleteAccount(account.id)}
                                >
                                  Eliminar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAccounts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No se encontraron cuentas que coincidan con la búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AccountManagement;
