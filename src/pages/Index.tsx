
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronDown, MapPin, Clock, Utensils, Star, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/551936711191?text=Olá! Gostaria de fazer uma reserva no Novo Tempero Gaúcho.", "_blank");
  };
  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const handleShowMoreReviews = () => {
    window.open("https://www.google.com/search?q=churrascaria+tempero+ga%C3%BAcho&oq=churras&gs_lcrp=EgZjaHJvbWUqDggBEEUYJxg7GIAEGIoFMgYIABBFGDkyDggBEEUYJxg7GIAEGIoFMgYIAhBFGDsyCggDEAAYsQMYgAQyDQgEEAAYkgMYgAQYigUyDQgFEAAYkgMYgAQYigUyBggGEEUYPTIGCAcQRRg90gEIMTczMWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x94b7df285b3248fb:0x61d749b8fb712606,1,,,,", "_blank");
    toast({
      title: "Avaliações no Google",
      description: "Vendo mais avaliações da Churrascaria Novo Tempero Gaúcho"
    });
  };
  return <>
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img src="/img/picanha fundo.svg" alt="Traditional Brazilian Churrasco" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative container-custom h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="heading-xl mb-6 font-playfair max-w-4xl">
            Experimente a Autêntica Culinária Gaúcha
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl">
            Carnes preparadas no método tradicional do Sul do Brasil, com cortes nobres e tempero especial
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-accent text-white" onClick={() => scrollToSection("menu-section")}>
              Ver Cardápio
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10" onClick={handleWhatsAppClick}>
              Fazer Reserva
            </Button>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <button onClick={() => scrollToSection("about")} aria-label="Scroll to about section">
              <ChevronDown size={36} className="text-white" />
            </button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6 text-primary">Nossa História</h2>
              <h3 className="heading-lg mb-8">Uma Tradição de Sabor e Qualidade</h3>
              <p className="text-lg mb-6">
              Desde 1997, o Tempero Gaúcho mantém a tradição de um churrasco autêntico e um buffet completo. Ao longo dos anos, passamos por três locais diferentes até chegarmos ao espaço atual, sempre buscando oferecer conforto e qualidade.
              </p>
              <p className="text-lg mb-8">
              Servimos um buffet à vontade, com diversas opções, e carnes assadas na churrasqueira, preparadas com o tempero especial da casa, criado pelo próprio dono. Uma receita única que garante sabor e tradição em cada corte.
              Aqui, cada detalhe é pensado para que sua experiência seja inesquecível!
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Utensils size={24} className="text-primary" />
                  </div>
                  <span className="font-medium">Ingredientes Selecionados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Star size={24} className="text-primary" />
                  </div>
                  <span className="font-medium">Excelência em Serviço</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=800&auto=format&fit=crop" alt="Chef preparando churrasco" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-xl font-playfair text-primary font-bold">28+</p>
                <p className="text-sm">Anos de Experiência</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Highlights Section */}
      <section id="menu-section" className="py-24 bg-secondary text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-4 text-primary">Especialidades</h2>
            <h3 className="heading-lg mb-6">Conforto, sabor e qualidade em cada detalhe </h3>
            <p className="text-lg max-w-2xl mx-auto">
              Conheça algumas das nossas especialidades que fazem nossos clientes voltarem sempre.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Menu Item 1 */}
            <div className="bg-black/20 rounded-lg p-6 hover:bg-black/30 transition-colors">
              <div className="mb-4">
                <img src="/img/richo.png" alt="Buffet" className="w-full h-64 object-cover rounded-lg" />
              </div>
              <div className="flex justify-between mb-3">
                <h4 className="text-xl font-semibold">Buffet</h4>
                <span className="text-primary font-bold">R$41,90</span>
              </div>
              <p className="text-gray-300 mb-4">
              Oferecemos um buffet à vontade, incluindo carnes  assadas na churrasqueira, onde os clientes podem escolher entre 8 a 10 cortes variados.
              </p>
            </div>
            
            {/* Menu Item 2 */}
            <div className="bg-black/20 rounded-lg p-6 hover:bg-black/30 transition-colors">
              <div className="mb-4">
                <img src="/img/sobremesa.png" alt="Sobremesa" className="w-full h-64 object-cover rounded-lg" />
              </div>
              <div className="flex justify-between mb-3">
                <h4 className="text-xl font-semibold">Sobremesas à vontade</h4>
                <span className="text-primary font-bold">INCLUSO</span>
              </div>
              <p className="text-gray-300 mb-4">
              Delicie-se com uma variedade de sobremesas inclusas no buffet, garantindo um final perfeito para sua refeição.
              </p>
            </div>
            
            {/* Menu Item 3 */}
            <div className="bg-black/20 rounded-lg p-6 hover:bg-black/30 transition-colors">
              <div className="mb-4">
                <img src="/img/cafe.png" alt="Churrasco Misto" className="w-full h-64 object-cover rounded-lg" />
              </div>
              <div className="flex justify-between mb-3">
                <h4 className="text-xl font-semibold">Café de cortesia</h4>
                <span className="text-primary font-bold">INCLUSO</span>
              </div>
              <p className="text-gray-300 mb-4">
              Após a refeição, oferecemos um café de cortesia para tornar sua experiência ainda mais agradável.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button size="lg" className="bg-primary hover:bg-accent text-white">
                Ver Cardápio Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-4 text-primary">Avaliações</h2>
            <h3 className="heading-lg mb-6">O Que Nossos Clientes Dizem</h3>
          </div>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {/* Real Google Review 1 */}
              <CarouselItem>
                <Card className="bg-white p-4 rounded-lg shadow-md">
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} className="text-primary fill-primary" />)}
                    </div>
                    <p className="text-lg italic mb-6 text-zinc-950">
                      "Ambiente agradável, comida deliciosa, preço justo e atendimento excelente. A feijoada de sábado é simplesmente maravilhosa! Recomendo fortemente!"
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-semibold text-zinc-950">Ricardo Oliveira</p>
                      <MessageSquare size={16} className="text-primary" />
                      <span className="text-sm text-gray-500">Google Reviews</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              {/* Real Google Review 2 */}
              <CarouselItem>
                <Card className="bg-white p-4 rounded-lg shadow-md">
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} className="text-primary fill-primary" />)}
                    </div>
                    <p className="text-lg italic mb-6 text-zinc-950">
                      "Minha família adora vir aqui! A carne é sempre muito bem preparada, suculenta e saborosa. O buffet tem muita variedade e tudo muito fresco. Sempre saímos satisfeitos."
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-semibold text-zinc-950">Márcia Santos</p>
                      <MessageSquare size={16} className="text-primary" />
                      <span className="text-sm text-gray-500">Google Reviews</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              {/* Real Google Review 3 */}
              <CarouselItem>
                <Card className="bg-white p-4 rounded-lg shadow-md">
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4].map(star => <Star key={star} size={20} className="text-primary fill-primary" />)}
                      <Star size={20} className="text-primary" />
                    </div>
                    <p className="text-lg italic mb-6 text-zinc-950">
                      "Ótima opção para almoço de negócios ou com a família. Preço justo pelo que oferece. O marmitex grande dá para duas pessoas tranquilamente. Recomendo o prato feito executivo nos dias de semana."
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="font-semibold text-zinc-950">José Carlos Pereira</p>
                      <MessageSquare size={16} className="text-primary" />
                      <span className="text-sm text-gray-500">Google Reviews</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          <div className="text-center mt-8">
            <Button variant="outline" className="mt-4" onClick={handleShowMoreReviews}>
              Ver Mais Avaliações no Google
            </Button>
          </div>
        </div>
      </section>
      
      {/* Location & Hours Section */}
      <section id="location" className="py-24 bg-secondary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-4 text-primary">Localização</h2>
              <h3 className="heading-lg mb-8">Visite-nos Hoje</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full mt-1">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Endereço</h4>
                    <p>Av. José Beni, 512 - Nazaré</p>
                    <p>Casa Branca - SP, 13700-000</p>
                    <p>Brasil</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full mt-1">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Horário</h4>
                    <p>Segunda - Sábado: 11:00 - 14:00</p>
                    <p>Domingo: Fechado </p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="bg-primary hover:bg-accent text-white" onClick={handleWhatsAppClick}>
                Fazer Reserva via WhatsApp
              </Button>
            </div>
            
            <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.820745375337!2d-47.089535624963524!3d-21.50918790218024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b7df1b8ad3f6c3%3A0x6e3bfdfdd7e2c96b!2sAv.%20Jos%C3%A9%20Beni%2C%20512%20-%20Nazar%C3%A9%2C%20Casa%20Branca%20-%20SP%2C%2013700-000!5e0!3m2!1sen!2sbr!4v1719006888222!5m2!1sen!2sbr" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Tempero Gaúcho Location"></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="cta" className="py-24 bg-primary/10">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
            Experimente a Autêntica Gastronomia Gaúcha
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Venha desfrutar de uma experiência inesquecível no Novo Tempero Gaúcho. 
            Reserve sua mesa hoje!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-accent text-white" onClick={handleWhatsAppClick}>
              Fazer Reserva via WhatsApp
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("menu-section")}>
              Ver Cardápio
            </Button>
          </div>
        </div>
      </section>
    </>;
};

export default Index;
