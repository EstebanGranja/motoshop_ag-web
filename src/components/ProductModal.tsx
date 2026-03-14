import { X, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

interface Product {
  id: number;
  nombre: string;
  marca: string;
  categoria: string;
  descripcion: string;
  imagen: string;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const brandColors: Record<string, string> = {
  'Motul': 'bg-blue-600',
  'LS2': 'bg-purple-600',
  'Castrol': 'bg-green-600',
  'Alpinestars': 'bg-red-600',
  'Stanley': 'bg-yellow-600',
  'Brembo': 'bg-red-700',
  'Elf': 'bg-pink-600',
  'DID': 'bg-orange-600',
  'Fox Racing': 'bg-orange-500',
  'Black & Decker': 'bg-orange-700',
  'K&N': 'bg-red-500',
  'NGK': 'bg-blue-500',
  'Yuasa': 'bg-indigo-600',
};

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const brandColor = brandColors[product.marca] || 'bg-gray-600';

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hola, quiero consultar por el producto: ${product.nombre}`
    );
    window.open(`https://wa.me/5493547123456?text=${message}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="w-full h-64 sm:h-96">
            <img
              src={product.imagen}
              alt={product.nombre}
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <span className={`inline-block ${brandColor} text-white text-sm font-semibold px-4 py-1 rounded-full mb-3`}>
              {product.marca}
            </span>

            <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
              {product.nombre}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-black mt-2"></div>
            </h2>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mt-6">
            {product.descripcion}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              <MessageCircle size={20} />
              <span>Consultar</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg transition-all duration-200 font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
