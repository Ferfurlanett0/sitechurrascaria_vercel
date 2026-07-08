
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronDown, MapPin, Clock, Utensils, Star, MessageSquare, Volume2, VolumeX, Flame, Beef, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import EmberParticles from "../components/EmberParticles";
import MeatCutsGuide from "../components/MeatCutsGuide";
import { useReservation } from "../contexts/ReservationContext";

const TOTAL_FRAMES = 40;
const frameUrls = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `/img/Parallax carne caindo/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.png`
);

// Desenha imagem no canvas simulando object-fit: cover com ponto focal central
const drawCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  focalX = 0.5,
  focalY = 0.45
) => {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const canvasRatio = cw / ch;
  const imgRatio = iw / ih;

  let sw: number, sh: number, sx: number, sy: number;

  if (imgRatio > canvasRatio) {
    sh = ih;
    sw = ih * canvasRatio;
    sx = (iw - sw) * focalX;
    sy = 0;
  } else {
    sw = iw;
    sh = iw / canvasRatio;
    sx = 0;
    sy = (ih - sh) * focalY;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
};

const ScrollAnimation = ({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const currentFrameRef = useRef(0);

  // Pre-load todas as imagens
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images[i] = img;
    });

    imagesRef.current = images;
  }, []);

  // Ajusta o canvas ao tamanho da section inteira
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current || !sectionRef.current) return;
      const { width, height } = sectionRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;

      const img = imagesRef.current[currentFrameRef.current];
      if (img && img.complete) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) drawCover(ctx, img, canvasRef.current.width, canvasRef.current.height);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loadedCount, sectionRef]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !canvasRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrolled = windowHeight - top;
      const distance = windowHeight + height;

      let progress = scrolled / distance;
      const start = 0.15;
      const end = 0.80;
      let normalized = (progress - start) / (end - start);
      if (normalized < 0) normalized = 0;
      if (normalized > 1) normalized = 1;

      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(normalized * TOTAL_FRAMES));

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        const img = imagesRef.current[frameIndex];
        if (img && img.complete) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) drawCover(ctx, img, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadedCount, sectionRef]);

  const isLoading = loadedCount < TOTAL_FRAMES;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 z-20">
          <div
            className="h-full bg-primary/80 transition-all duration-300"
            style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
          />
        </div>
      )}
    </>
  );
};


const Index = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const { openModal } = useReservation();

  // Verifica se o restaurante está aberto (Segunda a Sábado, 11:00 às 14:00)
  const agora = new Date();
  const dia = agora.getDay();
  const hora = agora.getHours();
  const isOpen = dia >= 1 && dia <= 6 && hora >= 11 && hora < 14;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.15;
    }
  }, []);

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
          <video 
            ref={videoRef}
            src="/img/Video fundo picanha.mp4" 
            autoPlay 
            loop 
            muted={isMuted} 
            playsInline 
            className="w-full h-full object-cover transition-opacity duration-700" 
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              // Smooth loop trick: fade slightly right before the end
              if (video.duration && video.duration - video.currentTime < 0.4) {
                video.style.opacity = '0.7';
              } else {
                video.style.opacity = '1';
              }
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          {/* Efeito de vignette (bordas escuras) e fusão com o fundo dark mode */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          
          <EmberParticles />
          
          {/* Elemento decorativo maior para esconder a marca d'água e conter o botão de som */}
          <div className="absolute bottom-0 right-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/90 backdrop-blur-xl pl-16 pr-12 pt-16 pb-10 rounded-tl-[4rem] border-t border-l border-white/10 shadow-2xl scale-[1.10] origin-bottom-right">
            {/* Avaliação */}
            <div className="flex flex-col items-center gap-1 opacity-90">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} size={12} className="text-primary fill-primary" />
                ))}
              </div>
              <span className="text-white/80 text-[10px] font-medium tracking-wider">4.9/5 Google</span>
            </div>
            
            {/* Título */}
            <div className="text-center">
              <span className="block text-white text-lg font-bold tracking-widest uppercase">Tempero Gaúcho</span>
              <span className="block text-primary/90 text-[11px] tracking-widest uppercase mt-1">Tradição desde 1997</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 mt-1">
              {/* Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                 <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                 <span className="text-white/80 text-[10px] uppercase tracking-widest">{isOpen ? 'Aberto' : 'Fechado'}</span>
              </div>
              
              {/* Volume */}
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-white/10 rounded-full text-white/80 hover:text-white hover:bg-primary transition-all flex items-center justify-center"
                title={isMuted ? "Ativar som ambiente" : "Desativar som ambiente"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
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
            <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 hover:border-white" onClick={openModal}>
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
      
      {/* A Arte do Tempero Gaúcho (Diferenciais) */}
      <section className="section-padding bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-primary tracking-widest uppercase text-sm font-bold mb-3">Nosso Diferencial</h2>
            <h3 className="heading-lg text-white">A Arte do Tempero Gaúcho</h3>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-black/40 border border-white/5 hover:bg-black/60 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                <Flame size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 font-playfair">Tempero Autoral</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nossa receita exclusiva e guardada a sete chaves, criada pelo próprio fundador, que garante um sabor inconfundível que você só encontra aqui.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-black/40 border border-white/5 hover:bg-black/60 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                <Beef size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 font-playfair">Cortes Nobres</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Seleção rigorosa das melhores carnes, com foco em maciez, marmoreio e suculência para entregar o churrasco perfeito na sua mesa.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-black/40 border border-white/5 hover:bg-black/60 transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/20">
                <Award size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 font-playfair">Serviço de Excelência</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Atendimento caloroso e atencioso. Tratamos cada cliente como parte da família, criando uma experiência inesquecível do início ao fim.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section — Cinemático com Scroll Animation como fundo */}
      <section id="about" className="relative min-h-screen overflow-hidden bg-black" ref={aboutRef}>
        {/* Canvas de fundo full-width */}
        <ScrollAnimation sectionRef={aboutRef} />
        
        {/* Overlay escuro gradiente da esquerda para leitura */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent pointer-events-none z-[1]" />
        {/* Vinheta topo e base para fusão com seções adjacentes */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />
        
        {/* Conteúdo sobreposto */}
        <div className="container-custom relative z-10 py-16 md:py-32">
          <div className="max-w-xl">
            <h2 className="text-primary tracking-widest uppercase text-sm font-bold mb-4">Nossa História</h2>
            <h3 className="heading-lg mb-8 text-white">Uma Tradição de Sabor e Qualidade</h3>
            <p className="text-lg mb-6 text-white/80 leading-relaxed">
              Desde 1997, o Tempero Gaúcho mantém a tradição de um churrasco autêntico e um buffet completo. Ao longo dos anos, passamos por três locais diferentes até chegarmos ao espaço atual, sempre buscando oferecer conforto e qualidade.
            </p>
            <p className="text-lg mb-10 text-white/80 leading-relaxed">
              Servimos um buffet à vontade, com diversas opções, e carnes assadas na churrasqueira, preparadas com o tempero especial da casa, criado pelo próprio dono. Uma receita única que garante sabor e tradição em cada corte.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Utensils size={24} className="text-primary" />
                </div>
                <span className="font-medium text-white">Ingredientes Selecionados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Star size={24} className="text-primary" />
                </div>
                <span className="font-medium text-white">Excelência em Serviço</span>
              </div>
            </div>
            
            <div className="mt-10 inline-flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
              <p className="text-4xl font-playfair text-primary font-bold">28+</p>
              <div className="w-px h-10 bg-white/20" />
              <p className="text-sm uppercase tracking-widest text-white/70">Anos de<br/>Tradição</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Highlights Section */}
      <section id="menu-section" className="section-padding bg-secondary text-white">
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
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,87,34,0.15)] group">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img src="/img/richo.png" alt="Buffet" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-2xl font-playfair font-bold text-white">Buffet Livre</h4>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold border border-primary/20">R$47,90</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Oferecemos um buffet à vontade, incluindo carnes assadas na churrasqueira, onde os clientes podem escolher entre 8 a 10 cortes variados.
              </p>
            </div>
            
            {/* Menu Item 2 */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,87,34,0.15)] group">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img src="/img/sobremesa.png" alt="Sobremesa" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-2xl font-playfair font-bold text-white">Sobremesas</h4>
                <span className="bg-white/5 text-white/80 px-3 py-1 rounded-full font-bold border border-white/10 uppercase text-xs tracking-wider">Incluso</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Delicie-se com uma variedade de sobremesas deliciosas inclusas no buffet, garantindo um final perfeito para sua refeição.
              </p>
            </div>
            
            {/* Menu Item 3 */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,87,34,0.15)] group">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img src="/img/cafe.png" alt="Café" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-2xl font-playfair font-bold text-white">Café Premium</h4>
                <span className="bg-white/5 text-white/80 px-3 py-1 rounded-full font-bold border border-white/10 uppercase text-xs tracking-wider">Cortesia</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Após a refeição, oferecemos um café fresquinho de cortesia para tornar sua experiência ainda mais agradável.
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
      <section id="testimonials" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-md mb-4 text-primary">Avaliações</h2>
            <h3 className="heading-lg mb-6">O Que Nossos Clientes Dizem</h3>
          </div>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {/* Real Google Review 1 */}
              <CarouselItem>
                <Card className="bg-secondary/50 border-white/5 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-primary/10 font-playfair text-9xl leading-none">"</div>
                  <CardContent className="pt-4 text-center relative z-10">
                    <div className="flex justify-center mb-6">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} className="text-primary fill-primary" />)}
                    </div>
                    <p className="text-xl md:text-2xl font-playfair italic mb-8 text-white/90">
                      "Ambiente agradável, comida deliciosa, preço justo e atendimento excelente. A feijoada de sábado é simplesmente maravilhosa! Recomendo fortemente!"
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">R</div>
                      <div className="text-left">
                        <p className="font-bold text-white">Ricardo Oliveira</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare size={12} className="text-primary" />
                          <span>Google Reviews</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              {/* Real Google Review 2 */}
              <CarouselItem>
                <Card className="bg-secondary/50 border-white/5 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-primary/10 font-playfair text-9xl leading-none">"</div>
                  <CardContent className="pt-4 text-center relative z-10">
                    <div className="flex justify-center mb-6">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} className="text-primary fill-primary" />)}
                    </div>
                    <p className="text-xl md:text-2xl font-playfair italic mb-8 text-white/90">
                      "Minha família adora vir aqui! A carne é sempre muito bem preparada, suculenta e saborosa. O buffet tem muita variedade e tudo fresco. Sempre saímos satisfeitos."
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">M</div>
                      <div className="text-left">
                        <p className="font-bold text-white">Márcia Santos</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare size={12} className="text-primary" />
                          <span>Google Reviews</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              {/* Real Google Review 3 */}
              <CarouselItem>
                <Card className="bg-secondary/50 border-white/5 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-primary/10 font-playfair text-9xl leading-none">"</div>
                  <CardContent className="pt-4 text-center relative z-10">
                    <div className="flex justify-center mb-6">
                      {[1, 2, 3, 4].map(star => <Star key={star} size={20} className="text-primary fill-primary" />)}
                      <Star size={20} className="text-primary" />
                    </div>
                    <p className="text-xl md:text-2xl font-playfair italic mb-8 text-white/90">
                      "Ótima opção para almoço de negócios ou com a família. Preço justo pelo que oferece. O marmitex grande dá para duas pessoas tranquilamente."
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">J</div>
                      <div className="text-left">
                        <p className="font-bold text-white">José Carlos Pereira</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare size={12} className="text-primary" />
                          <span>Google Reviews</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          <div className="text-center mt-8">
            <Button variant="outline" className="mt-4 border-white/40 text-white hover:bg-white/10 hover:border-white" onClick={handleShowMoreReviews}>
              Ver Mais Avaliações no Google
            </Button>
          </div>
        </div>
      </section>
      
      {/* Location & Hours Section */}
      <section id="location" className="section-padding bg-secondary text-white">
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
              
              <Button size="lg" className="bg-primary hover:bg-accent text-white" onClick={openModal}>
                Fazer Reserva
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

      {/* Guia Interativo de Cortes */}
      <MeatCutsGuide />
      
      {/* CTA Section */}
      <section id="cta" className="section-padding bg-primary/10">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
            Experimente a Autêntica Gastronomia Gaúcha
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Venha desfrutar de uma experiência inesquecível no Novo Tempero Gaúcho. 
            Reserve sua mesa hoje!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-accent text-white" onClick={openModal}>
              Fazer Reserva
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:border-white" onClick={() => scrollToSection("menu-section")}>
              Ver Cardápio
            </Button>
          </div>
        </div>
      </section>
    </>;
};

export default Index;
