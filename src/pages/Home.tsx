import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleLocationClick = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Av.+Libertador+1578,+Alta+Gracia,+Córdoba,+Argentina',
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 via-red-500 to-black rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-5xl">M</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
              MOTOSHOP AG
            </h1>

            <p className="text-xl sm:text-2xl text-gray-700 font-medium">
              Todo para tu moto y tu auto en Alta Gracia
            </p>
          </div>

          <div className="py-6">
            <button
              onClick={handleLocationClick}
              className="inline-flex items-center space-x-2 text-lg font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 group"
            >
              <MapPin className="group-hover:text-red-600 transition-colors" size={24} />
              <span>Nos encontramos en Av. Libertador 1578, Alta Gracia</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => navigate('/productos')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200"
            >
              Ver Productos
            </button>

            <button
              onClick={() => navigate('/contacto')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white transform hover:scale-105 transition-all duration-200 shadow-md"
            >
              Contactanos
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-black to-red-600"></div>
    </div>
  );
};

export default Home;
