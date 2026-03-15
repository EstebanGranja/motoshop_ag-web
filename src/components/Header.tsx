import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/productos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5493547123456', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-black shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <Link to="/" className="flex items-center h-full">
            <img
              src="logos/motoshop_header.png"
              alt="Motoshop AG Logo"
              className="h-16 sm:h-20 w-auto object-contain max-h-20"
              style={{ maxHeight: '80px' }}
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                {index > 0 && (
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                )}
                <Link
                  to={item.path}
                  className={`px-5 py-3 rounded-lg transition-all duration-200 relative text-base sm:text-lg text-white hover:text-white`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleWhatsAppClick}
              className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-base sm:text-lg"
            >
              <img src="logos/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
              <span className="font-medium">WhatsApp</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 animate-slideDown">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-red-600 text-white font-medium'
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg mt-2 transition-colors"
            >
              <img src="logos/whatsapp.png" alt="WhatsApp" className="w-5 h-5" />
              <span className="font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
