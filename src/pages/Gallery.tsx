
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Gallery = () => {
  // Sample gallery images (in a real app, these would be actual restaurant images)
  const galleryImages = [
    { id: 1, src: "/img/batatafrita.jpeg", alt: "Churrasco on grill" },
    { id: 2, src: "/img/img1.jpeg", alt: "Traditional Brazilian dish" },
    { id: 3, src: "/img/img11.jpeg", alt: "Restaurant interior" },
    { id: 4, src: "/img/linguica.jpg", alt: "Chefs preparing food" },
    { id: 5, src: "/img/fraldinha.jpg", alt: "Pão de queijo" },
    { id: 6, src: "/img/parte 1 interior.jpg", alt: "Caipirinha cocktail" },
    { id: 7, src: "/img/parte 2 interior.jpg", alt: "Restaurant ambiance" },
    { id: 8, src: "/img/restaurante hd.jpg", alt: "Brazilian barbecue" },
  ];

  return (
    <div className="container-custom section-padding">
      <h1 className="heading-lg text-center mb-12">Churrasco e Ambiente</h1>
      <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
      Você ainda não conhece o que temos a oferecer em sabor e qualidade. Venha viver a experiência do Tempero Gaúcho!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <AspectRatio ratio={4/3}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
