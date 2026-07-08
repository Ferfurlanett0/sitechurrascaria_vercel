export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const STORAGE_KEY = 'gaucho_gallery';

const defaultGallery: GalleryImage[] = [
  { id: '0', src: "/img/batatafrita.jpeg", alt: "Churrasco on grill" },
  { id: '1', src: "/img/img1.jpeg", alt: "Traditional Brazilian dish" },
  { id: '2', src: "/img/img11.jpeg", alt: "Restaurant interior" },
  { id: '3', src: "/img/linguica.jpg", alt: "Chefs preparing food" },
  { id: '4', src: "/img/fraldinha.jpg", alt: "Fraldinha suculenta" },
  { id: '5', src: "/img/parte 1 interior.jpg", alt: "Interior do restaurante" },
  { id: '6', src: "/img/parte 2 interior.jpg", alt: "Ambiente do restaurante" },
  { id: '7', src: "/img/restaurante hd.jpg", alt: "Visão geral do restaurante" },
];

export const getGallery = (): GalleryImage[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultGallery;
  } catch {
    return defaultGallery;
  }
};

export const saveGallery = (gallery: GalleryImage[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
};

export const addGalleryImage = (src: string, alt: string): void => {
  const current = getGallery();
  const newItem = { id: Math.random().toString(36).substring(2, 9), src, alt };
  saveGallery([newItem, ...current]); // Novas imagens no topo
};

export const deleteGalleryImage = (id: string): void => {
  const current = getGallery();
  const updated = current.filter(i => i.id !== id);
  saveGallery(updated);
};
