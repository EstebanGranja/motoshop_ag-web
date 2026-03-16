import { X, ZoomIn } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  'REPCOR': 'bg-red-700',
  'STANDARD': 'bg-gray-700',
  'SPEKTOR': 'bg-blue-700',
  'ARAX': 'bg-green-700',
  'HADA': 'bg-pink-700',
  'GIROLDI': 'bg-yellow-600',
  'JUST 1': 'bg-purple-700',
  'NACHI': 'bg-orange-700',
  'ORIGINE': 'bg-indigo-700',
  'RAYBAR': 'bg-teal-700',
  'ROHAN': 'bg-cyan-700',
  'VALYRIO': 'bg-fuchsia-700',
};

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen || isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isFullScreen]);

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
        <div className="relative bg-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="w-full h-48 sm:h-72 md:h-56 lg:h-60 xl:h-64 bg-white flex items-center justify-center relative group cursor-pointer pt-4 sm:pt-6"
               onClick={() => setIsFullScreen(true)}>
            <img
              src={product.imagen}
              alt={product.nombre}
              className="w-full h-full object-contain"
            />
            <button className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100">
              <ZoomIn size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-col items-start">
            <span className={`inline-block bg-brand-gradient text-white text-sm font-semibold px-4 py-1 rounded-full mb-4`}>
              {product.marca}
            </span>

            <h2 className="text-3xl font-bold text-gray-900 relative inline-block pb-4">
              {product.nombre}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-black opacity-60"></div>
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
              <img src="logos/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
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

      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4"
          onClick={() => setIsFullScreen(false)}
        >
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
          >
            <X size={24} />
          </button>
          <img
            src={product.imagen}
            alt={product.nombre}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductModal;
