import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";
const Footer: React.FC = () => {
  return <footer className="bg-secondary text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-playfair font-bold text-xl mb-4">
              <span className="text-primary">NOVO</span> TEMPERO GAÚCHO
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Servindo a melhor culinária gaúcha da região, com carnes de alta qualidade e tempero especial.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/temperogauchochurrascaria/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/temperogauchochurrascaria/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin size={16} />
                <span>Av. José Beni, 512 - Nazaré</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={16} />
                <span>(19) 3671-1191</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={16} />
                <span>temperogauchonovo@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horário</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="flex justify-between">
                <span>Segunda - Sexta:</span>
                <span>11h - 14h</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado:</span>
                <span>11h - 14h</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo:</span>
                <span>fechado</span>
              </li>
              <li className="flex justify-between">
                <span>Feriados:</span>
                <span>11h - 14h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Novo Tempero Gaúcho. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;