
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
              <span className="menu-price">R$41,90</span>
            </div>
            <p className="menu-description">Buffet à vontade com variedade de saladas, acompanhamentos, pratos quentes e carne assada a vontade</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Almoço por kilo</span>
              <span className="menu-price">R$89,99/kg</span>
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
              <span className="menu-title">Carne Assada por kilo</span>
              <span className="menu-price">R$99,99/kg</span>
            </div>
            <p className="menu-description">Escolha qualquer tipo de carne disponível na churrasqueira do dia e leve para saborear. A carne é servida em uma marmita, pesando apenas a quantidade escolhida</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="heading-md mb-6">Marmitex</h2>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Marmitex Pequeno</span>
              <span className="menu-price">R$20,00</span>
            </div>
            <p className="menu-description">Arroz, feijão ou feijoada, macarrão, farofa, refogado de legumes e carne de churrasco misto (porco, boi e frango)</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Marmitex Médio</span>
              <span className="menu-price">R$23,00</span>
            </div>
            <p className="menu-description">Arroz, feijão ou feijoada, macarrão, farofa, refogado de legumes e carne de churrasco misto (porco, boi e frango)</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Marmitex Grande</span>
              <span className="menu-price">R$28,00</span>
            </div>
            <p className="menu-description">Arroz, feijão ou feijoada, macarrão, farofa, refogado de legumes, carne de churrasco misto (porco, boi e frango) e salada</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="heading-md mb-6">Prato Feito</h2>
          
          <div className="menu-item">
            <div className="flex justify-between">
              <span className="menu-title">Prato Executivo</span>
              <span className="menu-price">R$29,90</span>
            </div>
            <p className="menu-description">Acompanha um prato quente, um prato de salada e um prato de carne assada</p>
          </div>
          
          <div className="menu-item">
            <div className="flex justify-between">
              {/* <span className="menu-title">PF Gaúcho</span> */}
              {/* <span className="menu-price">R$34,90</span> */}
            </div>
            {/* <p className="menu-description">Acompanha um prato quente, um prato de salada e um prato de carne assada</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
