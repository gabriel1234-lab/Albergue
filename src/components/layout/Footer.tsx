const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Hostel<span className="text-hostel-red">SantaTeresa</span>
            </h3>
            <p className="text-gray-400 max-w-xs">
              Sua casa em Santa Teresa, Rio de Janeiro. Conforto, cultura e a melhor vista da cidade.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Sobre nós</a></li>
              <li><a href="#" className="hover:text-white">Quartos</a></li>
              <li><a href="#" className="hover:text-white">Localização</a></li>
              <li><a href="#" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Santa Teresa, Rio de Janeiro</li>
              <li>contato@hostelsantateresa.com.br</li>
              <li>+55 21 9999-9999</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Hostel Santa Teresa. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
