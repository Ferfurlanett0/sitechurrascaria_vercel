import React, { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { getGallery, addGalleryImage, deleteGalleryImage, GalleryImage } from "../../utils/galleryData";
import { Button } from "@/components/ui/button";

export const GalleryTab = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => setImages(getGallery());

  const handleAdd = () => {
    if (!url) return;
    addGalleryImage(url, alt || "Imagem da Galeria");
    setUrl("");
    setAlt("");
    loadImages();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Remover esta imagem da galeria?")) {
      deleteGalleryImage(id);
      loadImages();
    }
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Add Image Form */}
      <div className="bg-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ImageIcon className="text-primary" /> Adicionar Foto
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="URL da imagem ou caminho (ex: /img/nova.jpg)"
            className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          />
          <input 
            value={alt} onChange={(e) => setAlt(e.target.value)}
            placeholder="Texto alternativo (Opcional)"
            className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          />
          <Button onClick={handleAdd} className="bg-primary hover:bg-accent text-white whitespace-nowrap">
            <Plus size={16} className="mr-2" /> Adicionar
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-black/40 border border-white/5">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <p className="text-white/80 text-xs truncate">{img.alt}</p>
              <button 
                onClick={() => handleDelete(img.id)}
                className="w-full py-2 bg-red-500/20 hover:bg-red-500 text-red-100 rounded-lg transition-colors flex justify-center items-center gap-2 text-sm backdrop-blur-sm"
              >
                <Trash2 size={16} /> Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
