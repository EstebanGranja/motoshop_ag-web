interface Product {
  id: number;
  nombre: string;
  marca: string;
  categoria: string;
  descripcion: string;
  imagen: string;
}

interface ProductCardProps {
  product: Product;
  onClick: () => void;
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

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const brandColor = brandColors[product.marca] || 'bg-gray-600';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-contain bg-gray-50"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between sm:min-h-[220px]">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {product.nombre}
            </h3>

            <span className={`inline-block bg-brand-gradient text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
              {product.marca}
            </span>

            <p className="text-gray-600 text-sm line-clamp-2">
              {product.descripcion}
            </p>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="px-6 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
