import { useState, useEffect, useMemo, useRef } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

interface Product {
  id: number;
  nombre: string;
  marca: string;
  categoria: string;
  descripcion: string;
  imagen: string;
}

const Productos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'categorias' | 'marcas'>('categorias');
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [animate, setAnimate] = useState(false);
  const productsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/productos.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error loading products:', error));
  }, []);

  const categorias = [
    'Todas',
    'Cascos',
    'Indumentaria para moto',
    'Cubiertas / Neumáticos',
    'Baterías',
    'Aceites y lubricantes',
    'Filtros',
    'Frenos',
    'Transmisión',
    'Iluminación',
    'Sistema eléctrico',
    'Motor',
    'Suspensión',
    'Accesorios para moto',
    'Equipamiento de seguridad',
  ];

  const marcas = useMemo(() => {
    const brands = Array.from(new Set(products.map((p) => p.marca)));
    return ['Todas', ...brands.sort()];
  }, [products]);

  const maxVisibleFilters = 6;
  const activeFilters = useMemo(
    () => (activeTab === 'categorias' ? categorias : marcas),
    [activeTab, marcas]
  );
  const visibleFilters = useMemo(
    () => activeFilters.slice(0, maxVisibleFilters),
    [activeFilters]
  );
  const hiddenFilters = useMemo(
    () => activeFilters.slice(maxVisibleFilters),
    [activeFilters]
  );

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.marca.toLowerCase().includes(query) ||
          p.categoria.toLowerCase().includes(query) ||
          p.descripcion.toLowerCase().includes(query)
      );
    }

    if (selectedFilter !== 'Todas') {
      if (activeTab === 'categorias') {
        filtered = filtered.filter((p) => p.categoria === selectedFilter);
      } else {
        filtered = filtered.filter((p) => p.marca === selectedFilter);
      }
    }

    return filtered;
  }, [products, searchQuery, selectedFilter, activeTab]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    const groupBy = activeTab === 'categorias' ? 'categoria' : 'marca';

    filteredProducts.forEach((product) => {
      const key = product[groupBy];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(product);
    });

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredProducts, activeTab]);

  const handleFilterChange = (filter: string) => {
    setAnimate(true);
    setSelectedFilter(filter);
  };

  const handleTabChange = (tab: 'categorias' | 'marcas') => {
    setAnimate(true);
    setActiveTab(tab);
    setSelectedFilter('Todas');
    setShowMoreFilters(false);
  };

  useEffect(() => {
    if (hiddenFilters.includes(selectedFilter)) {
      setShowMoreFilters(true);
    }
  }, [hiddenFilters, selectedFilter]);

  useEffect(() => {
    if (animate && productsGridRef.current) {
      const timeout = setTimeout(() => setAnimate(false), 350);
      return () => clearTimeout(timeout);
    }
  }, [animate, selectedFilter, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Productos</h1>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos, marcas, categorías..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm inline-flex">
            <button
              onClick={() => handleTabChange('categorias')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'categorias'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Categorías
            </button>
            <button
              onClick={() => handleTabChange('marcas')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'marcas'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Marcas
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {visibleFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}

          {showMoreFilters && hiddenFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {filter}
            </button>
          ))}

          {hiddenFilters.length > 0 && (
            <button
              onClick={() => setShowMoreFilters((prev) => !prev)}
              className="px-4 py-2 rounded-full font-medium transition-all duration-200 bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
            >
              {showMoreFilters ? 'menos...' : 'más...'}
            </button>
          )}
        </div>

        {selectedFilter === 'Todas' ? (
          <div className="space-y-12" ref={productsGridRef}>
            {groupedProducts.map(([group, items]) => (
              <div key={group} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-4xl font-bebas text-gray-900 whitespace-nowrap">
                    {group}
                  </h2>
                  <div className="flex-1 h-1 bg-gradient-to-r from-red-600 to-black"></div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ${animate ? 'animate-fade-move' : ''}`}> 
                  {items.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-4">
              <h2 className="text-4xl font-bebas text-gray-900 whitespace-nowrap">
                {selectedFilter}
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-red-600 to-black"></div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ${animate ? 'animate-fade-move' : ''}`} ref={productsGridRef}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Productos;
