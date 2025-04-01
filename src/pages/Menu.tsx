
import React from "react";

const Menu = () => {
  return (
    <div className="container-custom section-padding">
      <h1 className="heading-lg text-center mb-12">Nossa Oferta</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-6">
          <h2 className="heading-md mb-6">Buffet</h2>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Buffet Completo</span>
              <span className="menu-price">R$59,90</span>
            </div>
            <p className="menu-description">Buffet à vontade com variedade de saladas, acompanhamentos e pratos quentes</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Comida por Kilo</span>
              <span className="menu-price">R$69,90/kg</span>
            </div>
            <p className="menu-description">Monte seu prato com nossas opções variadas e pague pelo peso</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="heading-md mb-6">Carnes</h2>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Carne Assada</span>
              <span className="menu-price">Incluso no buffet</span>
            </div>
            <p className="menu-description">Cortes nobres de carnes bovinas e suínas, assadas lentamente na brasa</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Buffet + Churrasco</span>
              <span className="menu-price">R$79,90</span>
            </div>
            <p className="menu-description">Buffet completo com rodízio de carnes especiais</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="heading-md mb-6">Marmitex</h2>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Marmitex Pequeno</span>
              <span className="menu-price">R$18,90</span>
            </div>
            <p className="menu-description">Arroz, feijão, uma opção de carne e dois acompanhamentos</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Marmitex Médio</span>
              <span className="menu-price">R$25,90</span>
            </div>
            <p className="menu-description">Arroz, feijão, uma opção de carne e três acompanhamentos</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Marmitex Grande</span>
              <span className="menu-price">R$32,90</span>
            </div>
            <p className="menu-description">Arroz, feijão, duas opções de carne e três acompanhamentos</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="heading-md mb-6">Prato Feito</h2>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">PF Tradicional</span>
              <span className="menu-price">R$29,90</span>
            </div>
            <p className="menu-description">Arroz, feijão, bife, ovo frito, batata frita e salada</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">PF Gaúcho</span>
              <span className="menu-price">R$34,90</span>
            </div>
            <p className="menu-description">Arroz, feijão, picanha, farofa, vinagrete e mandioca frita</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
