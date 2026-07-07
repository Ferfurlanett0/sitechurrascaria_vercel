import React from "react";
import { Utensils, Flame, Beef, Clock, CheckCircle2 } from "lucide-react";

const Menu = () => {
  return (
    <div className="bg-background min-h-screen pt-24 pb-12">
      {/* Header Cinematográfico */}
      <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-[2px]"
          style={{ backgroundImage: 'url("/img/restaurante hd.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-black/60" />
        
        <div className="relative z-10 text-center px-4">
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-bold mb-4">Nossa Seleção</p>
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6">Cardápio</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Coluna 1: Buffet & Marmitex */}
          <div className="space-y-12">
            
            {/* Buffet Section */}
            <div className="bg-secondary/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Utensils className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl font-playfair text-white font-bold">Buffet</h2>
              </div>
              
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">Buffet Completo</h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-2xl font-playfair text-primary font-bold">R$41,90</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Buffet à vontade com variedade de saladas, acompanhamentos, pratos quentes e carne assada à vontade.</p>
                </div>
                
                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">Almoço por Kilo</h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-2xl font-playfair text-primary font-bold">R$89,99<span className="text-sm text-muted-foreground font-sans">/kg</span></span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Monte seu prato com nossas opções variadas e pague pelo peso exato.</p>
                </div>
              </div>
            </div>

            {/* Marmitex Section */}
            <div className="bg-secondary/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Clock className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl font-playfair text-white font-bold">Marmitex</h2>
              </div>
              
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">Marmitex Pequeno</h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-2xl font-playfair text-primary font-bold">R$20,00</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Arroz, feijão ou feijoada, macarrão, farofa, refogado de legumes e carne de churrasco misto (porco, boi e frango).</p>
                </div>
                
                <div className="border-b border-white/10 pb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">Marmitex Médio</h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-2xl font-playfair text-primary font-bold">R$23,00</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Arroz, feijão ou feijoada, macarrão, farofa, refogado de legumes e carne de churrasco misto.</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">Marmitex Grande <CheckCircle2 size={16} className="text-primary" /></h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-2xl font-playfair text-primary font-bold">R$28,00</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Arroz, feijão/feijoada, macarrão, farofa, legumes, carne de churrasco misto e salada fresca.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Coluna 2: Carnes & Prato Feito */}
          <div className="space-y-12">
            
            {/* Carnes Section */}
            <div className="bg-secondary/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Flame className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl font-playfair text-white font-bold">Carnes Nobres</h2>
              </div>
              
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">Carne Assada (Buffet)</h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-lg font-bold text-white/80">Incluso no Buffet</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Cortes nobres de carnes bovinas e suínas, assadas lentamente na brasa, servidas à vontade.</p>
                </div>
                
                <div className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">Carne Assada por Kilo</h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-2xl font-playfair text-primary font-bold">R$99,99<span className="text-sm text-muted-foreground font-sans">/kg</span></span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Escolha qualquer tipo de carne disponível na churrasqueira do dia e leve para saborear. A carne é servida em uma marmita, pesando apenas a quantidade escolhida.</p>
                </div>
              </div>
            </div>

            {/* Prato Feito Section */}
            <div className="bg-secondary/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Beef className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl font-playfair text-white font-bold">Prato Feito</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">Prato Executivo</h3>
                    <div className="flex-grow border-b border-dashed border-white/20 mx-4" />
                    <span className="text-2xl font-playfair text-primary font-bold">R$29,90</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Acompanha um prato quente caprichado, uma generosa porção de salada e um suculento prato de carne assada à sua escolha.</p>
                </div>
              </div>
            </div>
            
            {/* CTA Final */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-transparent border border-primary/20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Pronto para provar?</h4>
                <p className="text-white/70 text-sm">Faça sua reserva ou venha nos visitar hoje mesmo.</p>
              </div>
              <button 
                onClick={() => window.location.href = '/location'}
                className="whitespace-nowrap px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-accent transition-colors shadow-lg hover:shadow-primary/20"
              >
                Fazer Reserva
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

