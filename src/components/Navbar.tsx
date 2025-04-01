
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSmoothScroll = (id) => {
    // Check if we're on the home page
    if (window.location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        if (isOpen) setIsOpen(false);
      }
    } else {
      // If not on homepage, navigate to homepage with hash
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="bg-black/90 text-white sticky top-0 z-50">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="font-playfair font-bold text-xl">
            <span className="text-primary">NOVO</span> TEMPERO GAÚCHO
          </div>
          <div className="text-xs border-l border-white/30 pl-2 ml-2">
            CHURRASCARIA 
            <br /> 
            DESDE 1997
          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm uppercase hover:text-primary transition-colors">
            Home
          </Link>
          <button 
            onClick={() => handleSmoothScroll("menu-section")}
            className="text-sm uppercase hover:text-primary transition-colors bg-transparent"
          >
            Cardápio
          </button>
          <Link to="/gallery" className="text-sm uppercase hover:text-primary transition-colors">
            Galeria
          </Link>
          <Link to="/location" className="text-sm uppercase hover:text-primary transition-colors">
            Local
          </Link>
          <button
            onClick={() => window.open("https://wa.me/551936711191?text=Olá! Gostaria de fazer uma reserva no Novo Tempero Gaúcho.", "_blank")}
            className="bg-primary px-4 py-2 rounded-md text-white text-sm uppercase hover:bg-accent transition-colors"
          >
            Reserva
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 p-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm uppercase hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => handleSmoothScroll("menu-section")}
                className="text-sm uppercase hover:text-primary transition-colors text-left bg-transparent"
              >
                Cardápio
              </button>
              <Link 
                to="/gallery" 
                className="text-sm uppercase hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Galeria
              </Link>
              <Link 
                to="/location" 
                className="text-sm uppercase hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Local
              </Link>
              <button
                onClick={() => {
                  window.open("https://wa.me/551936711191?text=Olá! Gostaria de fazer uma reserva no Novo Tempero Gaúcho.", "_blank");
                  setIsOpen(false);
                }}
                className="bg-primary px-4 py-2 rounded-md text-white text-sm uppercase hover:bg-accent transition-colors inline-block w-fit"
              >
                Reserva
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
