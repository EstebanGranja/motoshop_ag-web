import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">MOTOSHOP AG</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                {index > 0 && (
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                )}
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 relative ${
                    location.pathname === item.path
                      ? 'text-red-600'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
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
              className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <MessageCircle size={20} />
              <span className="font-medium">WhatsApp</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-red-50 text-red-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg mt-2"
            >
              <MessageCircle size={20} />
              <span className="font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
