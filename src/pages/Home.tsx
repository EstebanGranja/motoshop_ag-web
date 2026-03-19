import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Solo en móviles
    if (window.innerWidth <= 640) {
      document.body.classList.add('home-no-scroll');
      return () => document.body.classList.remove('home-no-scroll');
    }
  }, []);

  const handleLocationClick = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Av.+Libertador+1578,+Alta+Gracia,+Córdoba,+Argentina',
      '_blank'
    );
  };

  return (
    <div
      className="min-h-screen pt-16 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/logos/local_frente.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay oscuro con blur */}
      <div
        className="absolute inset-0 bg-black opacity-75 backdrop-blur-lg"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      ></div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-red-800 via-red-700 to-black rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img src="/logos/motoquero.png" alt="Moto" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              MOTOSHOP AG
            </h1>

            <p className="text-xl sm:text-2xl text-gray-100 font-medium drop-shadow-md">
              Todo para tu moto y tu auto en Alta Gracia
            </p>
          </div>

          <div className="py-2 sm:py-6">
            <button
              onClick={handleLocationClick}
              className="inline-flex items-center space-x-2 text-lg font-bold text-white hover:text-red-400 transition-colors duration-200 group drop-shadow-md"
            >
              <span className="block w-10 h-10 sm:w-6 sm:h-6">
                <MapPin className="group-hover:text-red-400 transition-colors w-full h-full" />
              </span>
              <span className="block leading-tight">Nos encontramos en Av. Libertador 1578, Alta Gracia</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-0 sm:pt-4">
            <button
              onClick={() => navigate('/productos')}
              className="w-auto px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              Ver Productos
              <ArrowRight size={24} className="text-black" />
            </button>

            <button
              onClick={() => navigate('/contacto')}
              className="w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-white hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-md"
            >
              Contactanos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
