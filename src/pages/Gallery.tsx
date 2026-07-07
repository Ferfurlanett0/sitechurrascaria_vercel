import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Bloquear scroll do body quando o lightbox estiver aberto
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  const galleryImages = [
    { id: 0, src: "/img/batatafrita.jpeg", alt: "Churrasco on grill" },
    { id: 1, src: "/img/img1.jpeg", alt: "Traditional Brazilian dish" },
    { id: 2, src: "/img/img11.jpeg", alt: "Restaurant interior" },
    { id: 3, src: "/img/linguica.jpg", alt: "Chefs preparing food" },
    { id: 4, src: "/img/fraldinha.jpg", alt: "Fraldinha suculenta" },
    { id: 5, src: "/img/parte 1 interior.jpg", alt: "Interior do restaurante" },
    { id: 6, src: "/img/parte 2 interior.jpg", alt: "Ambiente do restaurante" },
    { id: 7, src: "/img/restaurante hd.jpg", alt: "Visão geral do restaurante" },
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") setSelectedImage((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      if (e.key === "ArrowLeft") setSelectedImage((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-primary tracking-widest uppercase text-sm font-bold mb-3">Conheça o Espaço</p>
          <h1 className="text-5xl font-playfair text-white font-bold mb-6">Nossa Galeria</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Descubra o ambiente acolhedor e a qualidade excepcional que esperam por você no Novo Tempero Gaúcho.
          </p>
        </div>
        
        {/* Masonry Layout com Tailwind Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid border border-white/5"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="text-primary w-12 h-12 scale-50 group-hover:scale-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-50">
            <span className="text-white/50 font-medium">
              {selectedImage + 1} / {galleryImages.length}
            </span>
            <button 
              onClick={() => setSelectedImage(null)}
              className="text-white/70 hover:text-primary transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"
            >
              <X size={28} />
            </button>
          </div>

          {/* Navigation Prev */}
          <button 
            className="absolute left-4 md:left-8 text-white/50 hover:text-primary transition-colors p-4 hover:bg-white/5 rounded-full z-50"
            onClick={handlePrev}
          >
            <ChevronLeft size={48} />
          </button>

          {/* Main Image */}
          <div className="relative w-full max-w-6xl max-h-screen px-4 md:px-24 flex items-center justify-center">
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-primary/10 select-none animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Navigation Next */}
          <button 
            className="absolute right-4 md:right-8 text-white/50 hover:text-primary transition-colors p-4 hover:bg-white/5 rounded-full z-50"
            onClick={handleNext}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
