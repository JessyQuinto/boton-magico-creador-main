
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Calendar, Star, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getProducerById, getProductsByProducer } from '@/data/mockData';

const ProducerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const producerId = parseInt(id || '0');
  
  const producer = getProducerById(producerId);
  const products = getProductsByProducer(producerId);

  if (!producer) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-choco-cream dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Navbar />

      <main className="py-8">
        <div className="container-custom">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              to="/productos"
              className="inline-flex items-center text-choco-brown dark:text-choco-gold hover:text-choco-green dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a productos
            </Link>
          </div>

          {/* Producer Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="relative h-64 bg-gradient-to-r from-choco-green to-choco-blue">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end space-x-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-300 shadow-lg">
                    <img
                      src={producer.image}
                      alt={producer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-white pb-4">
                    <h1 className="text-3xl font-bold mb-2">{producer.name}</h1>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{producer.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Desde {producer.foundedYear}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        <span>{products.length} productos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Producer Information */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-choco-brown dark:text-white mb-4">
                  Sobre el Artesano
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {producer.description}
                </p>

                {/* Producer Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-choco-cream dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-choco-brown dark:text-choco-gold">
                      {new Date().getFullYear() - producer.foundedYear}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Años de experiencia</div>
                  </div>
                  <div className="text-center p-4 bg-choco-cream dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-choco-brown dark:text-choco-gold">
                      {products.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Productos únicos</div>
                  </div>
                </div>

                {/* Featured Badge */}
                {producer.featured && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-choco-gold/20 to-choco-gold/10 dark:from-choco-gold/30 dark:to-choco-gold/20 rounded-lg border border-choco-gold/30">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-choco-gold mr-2" />
                      <span className="font-medium text-choco-brown dark:text-white">
                        Artesano Destacado
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Este artesano es reconocido por la calidad excepcional de sus productos.
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-choco-brown dark:text-white mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-choco-green mr-3" />
                    <span className="text-gray-600 dark:text-gray-300">{producer.location}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Para contactar directamente al artesano, puedes hacerlo a través de Campo Artesano.
                  </div>
                </div>
              </div>
            </div>

            {/* Producer Products */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-choco-brown dark:text-white mb-2">
                  Productos de {producer.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Descubre la increíble variedad de productos artesanales.
                </p>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                    No hay productos disponibles
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Este artesano no tiene productos disponibles en este momento.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProducerProfile;
