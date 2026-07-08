export interface MenuItem {
  id: string;
  category: 'Buffet' | 'Marmitex' | 'Carnes' | 'Pratos';
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
}

const STORAGE_KEY = 'gaucho_menu';

const defaultMenu: MenuItem[] = [
  { id: '1', category: 'Buffet', name: 'Buffet Completo', price: 'R$41,90', description: 'Buffet à vontade com variedade de saladas, acompanhamentos, pratos quentes e carne assada à vontade.' },
  { id: '2', category: 'Buffet', name: 'Almoço por Kilo', price: 'R$89,99/kg', description: 'Monte seu prato com nossas opções variadas e pague pelo peso exato.' },
  { id: '3', category: 'Marmitex', name: 'Marmitex Pequeno', price: 'R$20,00', description: 'Arroz, feijão ou feijoada, macarrão, farofa, refogado de legumes e carne de churrasco misto (porco, boi e frango).' },
  { id: '4', category: 'Marmitex', name: 'Marmitex Médio', price: 'R$23,00', description: 'Arroz, feijão ou feijoada, macarrão, farofa, refogado de legumes e carne de churrasco misto.' },
  { id: '5', category: 'Marmitex', name: 'Marmitex Grande', price: 'R$28,00', description: 'Arroz, feijão/feijoada, macarrão, farofa, legumes, carne de churrasco misto e salada fresca.', highlight: true },
  { id: '6', category: 'Carnes', name: 'Carne Assada (Buffet)', price: 'Incluso no Buffet', description: 'Cortes nobres de carnes bovinas e suínas, assadas lentamente na brasa, servidas à vontade.' },
  { id: '7', category: 'Carnes', name: 'Carne Assada por Kilo', price: 'R$99,99/kg', description: 'Escolha qualquer tipo de carne disponível na churrasqueira do dia e leve para saborear. A carne é servida em uma marmita, pesando apenas a quantidade escolhida.' },
  { id: '8', category: 'Pratos', name: 'Prato Executivo', price: 'R$29,90', description: 'Acompanha um prato quente caprichado, uma generosa porção de salada e um suculento prato de carne assada à sua escolha.' },
];

export const getMenu = (): MenuItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultMenu;
  } catch {
    return defaultMenu;
  }
};

export const saveMenu = (menu: MenuItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
};

export const addMenuItem = (item: Omit<MenuItem, 'id'>): void => {
  const current = getMenu();
  const newItem = { ...item, id: Math.random().toString(36).substring(2, 9) };
  saveMenu([...current, newItem]);
};

export const updateMenuItem = (id: string, item: Partial<MenuItem>): void => {
  const current = getMenu();
  const updated = current.map(i => i.id === id ? { ...i, ...item } : i);
  saveMenu(updated);
};

export const deleteMenuItem = (id: string): void => {
  const current = getMenu();
  const updated = current.filter(i => i.id !== id);
  saveMenu(updated);
};
