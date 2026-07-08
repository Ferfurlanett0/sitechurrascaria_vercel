import React from "react";
import ReservationForm from "../components/ReservationForm";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const Location = () => {
  return (
    <div className="bg-background min-h-screen pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-primary tracking-widest uppercase text-sm font-bold mb-3">Onde nos Encontrar</p>
          <h1 className="text-5xl font-playfair text-white font-bold mb-6">Visite-Nos</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Experimente a autêntica culinária gaúcha em um ambiente acolhedor, sofisticado e convidativo no coração da cidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-16">
          
          {/* Informações de Contato e Mapa */}
          <div className="lg:col-span-7 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Box Endereço */}
              <div className="bg-secondary/30 p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-xl text-white mb-4">Endereço</h3>
                <div className="text-white/70 space-y-1">
                  <p>Av. José Beni, 512 - Nazaré</p>
                  <p>Casa Branca - SP, 13700-000</p>
                  <p>Brasil</p>
                </div>
              </div>

              {/* Box Horários */}
              <div className="bg-secondary/30 p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-xl text-white mb-4">Horários</h3>
                <div className="text-white/70 space-y-2">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Seg a Sáb</span>
                    <span className="text-white font-medium">11:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Domingo</span>
                    <span className="text-primary font-medium">Fechado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 p-8 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-8 items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">Telefone</h3>
                    <p className="text-white/70">(19) 3671-1191</p>
                  </div>
               </div>
               
               <div className="hidden sm:block w-px h-12 bg-white/10" />

               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">Email</h3>
                    <p className="text-white/70">temperogauchonovo@gmail.com</p>
                  </div>
               </div>
            </div>

            {/* Mapa Interativo */}
            <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 relative group">
              <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.820745375337!2d-47.089535624963524!3d-21.50918790218024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b7df1b8ad3f6c3%3A0x6e3bfdfdd7e2c96b!2sAv.%20Jos%C3%A9%20Beni%2C%20512%20-%20Nazar%C3%A9%2C%20Casa%20Branca%20-%20SP%2C%2013700-000!5e0!3m2!1sen!2sbr!4v1719006888222!5m2!1sen!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'contrast(1.1) brightness(0.9) grayscale(0.2)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title="Novo Tempero Gaúcho Location"
              />
            </div>

          </div>
          
          {/* Formulário lateral */}
          <div className="lg:col-span-5 relative">
            {/* Decoração atrás do formulário */}
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-transparent blur-2xl -z-10 rounded-3xl opacity-50" />
            <ReservationForm />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Location;