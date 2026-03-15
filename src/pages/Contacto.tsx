import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

const Contacto = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5493547123456', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/motoshopag', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 md:pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-xl text-gray-600">
            ¿Tenés alguna consulta? Estamos para ayudarte.
          </p>
        </div>

        <div className="mb-12">
          <button
            onClick={handleWhatsAppClick}
            className="w-full flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
          >
            <img src="logos/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
            <span>Escribinos por WhatsApp</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <MapPin className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Dirección</h3>
                <p className="text-gray-600">
                  Av. Libertador 1578,
                  Alta Gracia, Córdoba
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Phone className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Teléfono / WhatsApp</h3>
                <p className="text-gray-600">+54 9 3547 123456</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">contacto@motoshopag.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Horario</h3>
                <div className="text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Lun - Vie: </span>
                    8:30 - 12:45 / 16:00 - 20:30
                  </p>
                  <p>
                    <span className="font-medium">Sáb: </span>
                    8:30 - 13:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Seguinos en redes
          </h2>

          <button
            onClick={handleInstagramClick}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            <Instagram size={24} />
            <span>@motoshopag</span>
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <iframe
            title="Ubicación Motoshop AG"
            src="https://www.google.com/maps?q=Av.+Libertador+1578,+Alta+Gracia,+Córdoba,+Argentina&output=embed"
            width="100%"
            height="350"
            className="rounded-lg shadow-lg border-0 w-full max-w-4xl md:max-w-4xl h-[300px] md:h-[350px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
