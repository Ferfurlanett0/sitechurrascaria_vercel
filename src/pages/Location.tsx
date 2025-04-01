import React from "react";
import ReservationForm from "../components/ReservationForm";
const Location = () => {
  const handleWhatsAppClick = () => {
    // Open WhatsApp with a predefined message
    window.open("https://wa.me/5512345678?text=Olá! Gostaria de fazer uma reserva no Novo Tempero Gaúcho.", "_blank");
  };
  return <div className="container-custom section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="heading-lg mb-6">Visite-Nos</h1>
          <p className="mb-8 text-lg">
            Experimente a autêntica culinária gaúcha em um ambiente acolhedor e convidativo no Novo Tempero Gaúcho.
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-2">Endereço</h3>
              <p>Av. José Beni, 512 - Nazaré</p>
              <p>Casa Branca - SP, 13700-000</p>
              <p>Brasil</p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-2">Horários</h3>
              <p>Segunda - Sabado: 11:00 - 14:00</p>
              
              <p>Domingo: fechado</p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-2">Contato</h3>
              <p>Telefone: (55)19 3671-1191 </p>
              <p>Email: temperogauchonovo@gmail.com</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="heading-md mb-6">Faça uma Reserva</h2>
            {/* <button onClick={handleWhatsAppClick} className="bg-primary text-white px-6 py-3 rounded-md font-medium transition-colors hover:bg-accent mb-6 w-full">
              Reserve via WhatsApp
            </button> */}
            <ReservationForm />
          </div>
        </div>
        
        <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.820745375337!2d-47.089535624963524!3d-21.50918790218024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b7df1b8ad3f6c3%3A0x6e3bfdfdd7e2c96b!2sAv.%20Jos%C3%A9%20Beni%2C%20512%20-%20Nazar%C3%A9%2C%20Casa%20Branca%20-%20SP%2C%2013700-000!5e0!3m2!1sen!2sbr!4v1719006888222!5m2!1sen!2sbr" width="100%" height="100%" style={{
          border: 0
        }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Novo Tempero Gaúcho Location"></iframe>
        </div>
      </div>
    </div>;
};
export default Location;