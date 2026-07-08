// =========================================================
// TIPOS
// =========================================================

export interface Machine {
  id: string;
  name: string;
  debitRate: number;  // %
  creditRate: number; // %
  pixRate: number;    // %
}

export type PaymentMethod = 'Dinheiro' | 'Pix' | 'Débito' | 'Crédito';

/** Comanda individual lançada no dia */
export interface Comanda {
  id: string;
  numero: string;          // Ex: "21", "22"
  amount: number;          // Valor bruto
  netAmount: number;       // Valor líquido após taxa
  method: PaymentMethod;
  machineId?: string;
  machineName?: string;
  obs?: string;
  date: number;            // Timestamp
}

/**
 * Categoria do fluxo de caixa (Entrada ou Saída).
 * Pode ter subcategorias (parentId aponta para o pai).
 * type='sum' = linha pai que soma os filhos automaticamente.
 * type='item' = linha folha onde se digitam valores.
 * type='auto' = preenchida automaticamente pelas comandas (ex: Total Dinheiro).
 */
export interface FlowCategory {
  id: string;
  name: string;
  kind: 'entrada' | 'saida';
  type: 'sum' | 'item' | 'auto';
  autoMethod?: PaymentMethod; // Quando type='auto', qual método agrupar
  parentId?: string;          // ID da categoria pai (se for subcategoria)
  order: number;
}

/** Entrada manual de valor para uma categoria em um dia específico */
export interface ManualEntry {
  id: string;
  categoryId: string;
  value: number;
  date: string; // 'YYYY-MM-DD'
}

// =========================================================
// STORAGE KEYS
// =========================================================
const MACHINES_KEY    = 'gaucho_machines';
const COMANDAS_KEY    = 'gaucho_comandas';
const CATEGORIES_KEY  = 'gaucho_flow_categories';
const MANUAL_KEY      = 'gaucho_manual_entries';

// =========================================================
// CATEGORIAS PADRÃO (Espelho das planilhas)
// =========================================================
const defaultCategories: FlowCategory[] = [
  // ENTRADAS
  { id: 'ent_dinheiro', name: 'Dinheiro (Cofre)', kind: 'entrada', type: 'auto', autoMethod: 'Dinheiro', order: 1 },
  { id: 'ent_pix',      name: 'Pix',              kind: 'entrada', type: 'auto', autoMethod: 'Pix',      order: 2 },
  { id: 'ent_debito',   name: 'Cartão de Débito', kind: 'entrada', type: 'auto', autoMethod: 'Débito',   order: 3 },
  { id: 'ent_credito',  name: 'Cartão de Crédito',kind: 'entrada', type: 'auto', autoMethod: 'Crédito',  order: 4 },
  { id: 'ent_outros',   name: 'Outras Entradas',   kind: 'entrada', type: 'item', order: 5 },

  // SAÍDAS — Impostos
  { id: 'sai_impostos',    name: 'Impostos',                                          kind: 'saida', type: 'sum',  order: 10 },
  { id: 'sai_simples',     name: 'Simples Nacional (DAS)',                             kind: 'saida', type: 'item', parentId: 'sai_impostos', order: 11 },
  { id: 'sai_icms',        name: 'ICMS',                                               kind: 'saida', type: 'item', parentId: 'sai_impostos', order: 12 },
  { id: 'sai_issqn',       name: 'ISSQN / IPTU',                                       kind: 'saida', type: 'item', parentId: 'sai_impostos', order: 13 },
  { id: 'sai_simples_p',   name: 'Simples Nacional — Parcelamento',                    kind: 'saida', type: 'item', parentId: 'sai_impostos', order: 14 },

  // SAÍDAS — Encargos Sociais
  { id: 'sai_encargos',    name: 'Encargos Sociais',                                   kind: 'saida', type: 'sum',  order: 20 },
  { id: 'sai_fgts',        name: 'FGTS',                                               kind: 'saida', type: 'item', parentId: 'sai_encargos', order: 21 },
  { id: 'sai_gps',         name: 'GPS (INSS)',                                          kind: 'saida', type: 'item', parentId: 'sai_encargos', order: 22 },
  { id: 'sai_fgts_r',      name: 'FGTS Rescisório',                                    kind: 'saida', type: 'item', parentId: 'sai_encargos', order: 23 },
  { id: 'sai_sindical',    name: 'Contribuição Sindical',                               kind: 'saida', type: 'item', parentId: 'sai_encargos', order: 24 },
  { id: 'sai_irrf',        name: 'IRRF NFS Serviços',                                   kind: 'saida', type: 'item', parentId: 'sai_encargos', order: 25 },

  // SAÍDAS — Folha de Pagamento
  { id: 'sai_folha',       name: 'Folha de Pagamento',                                  kind: 'saida', type: 'sum',  order: 30 },
  { id: 'sai_salarios',    name: 'Salários / Pró-labore',                               kind: 'saida', type: 'item', parentId: 'sai_folha', order: 31 },
  { id: 'sai_adiantamento',name: 'Adiantamento de Salário',                             kind: 'saida', type: 'item', parentId: 'sai_folha', order: 32 },

  // SAÍDAS — Despesas Operacionais
  { id: 'sai_operacional', name: 'Despesas Operacionais',                                kind: 'saida', type: 'sum',  order: 40 },
  { id: 'sai_energia',     name: 'Energia Elétrica',                                    kind: 'saida', type: 'item', parentId: 'sai_operacional', order: 41 },
  { id: 'sai_agua',        name: 'Água e Esgoto',                                       kind: 'saida', type: 'item', parentId: 'sai_operacional', order: 42 },
  { id: 'sai_gas',         name: 'Gás',                                                 kind: 'saida', type: 'item', parentId: 'sai_operacional', order: 43 },
  { id: 'sai_aluguel',     name: 'Aluguel',                                             kind: 'saida', type: 'item', parentId: 'sai_operacional', order: 44 },
  { id: 'sai_manutencao',  name: 'Manutenção',                                          kind: 'saida', type: 'item', parentId: 'sai_operacional', order: 45 },
  { id: 'sai_limpeza',     name: 'Produtos de Limpeza',                                 kind: 'saida', type: 'item', parentId: 'sai_operacional', order: 46 },

  // SAÍDAS — Fornecedores
  { id: 'sai_fornecedores', name: 'Fornecedores',                                       kind: 'saida', type: 'sum',  order: 50 },
  { id: 'sai_bigbom',      name: 'Big Bom',                                             kind: 'saida', type: 'item', parentId: 'sai_fornecedores', order: 51 },
  { id: 'sai_frigorifico', name: 'Frigorífico',                                         kind: 'saida', type: 'item', parentId: 'sai_fornecedores', order: 52 },
  { id: 'sai_feira',       name: 'Feira (Domingo — Verduras)',                          kind: 'saida', type: 'item', parentId: 'sai_fornecedores', order: 53 },
  { id: 'sai_outros_forn', name: 'Outros Fornecedores',                                 kind: 'saida', type: 'item', parentId: 'sai_fornecedores', order: 54 },
];

// =========================================================
// MAQUININHAS
// =========================================================
export const getMachines = (): Machine[] => {
  try {
    const data = localStorage.getItem(MACHINES_KEY);
    return data ? JSON.parse(data) : [
      { id: 'default_ton', name: 'Ton', debitRate: 1.19, creditRate: 3.09, pixRate: 0 },
    ];
  } catch { return []; }
};
export const saveMachines = (machines: Machine[]): void => {
  localStorage.setItem(MACHINES_KEY, JSON.stringify(machines));
};
export const addMachine = (machine: Omit<Machine, 'id'>): void => {
  saveMachines([...getMachines(), { ...machine, id: genId() }]);
};
export const updateMachine = (id: string, data: Partial<Machine>): void => {
  saveMachines(getMachines().map(m => m.id === id ? { ...m, ...data } : m));
};
export const deleteMachine = (id: string): void => {
  saveMachines(getMachines().filter(m => m.id !== id));
};

// =========================================================
// COMANDAS
// =========================================================
export const getComandas = (): Comanda[] => {
  try {
    const data = localStorage.getItem(COMANDAS_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const addComanda = (
  numero: string,
  amount: number,
  method: PaymentMethod,
  machineId?: string,
  obs?: string,
  customDate?: number
): Comanda => {
  let netAmount = amount;
  let machineName: string | undefined;

  if (method !== 'Dinheiro') {
    const machine = getMachines().find(m => m.id === machineId);
    if (machine) {
      machineName = machine.name;
      const rate = method === 'Débito' ? machine.debitRate
                 : method === 'Crédito' ? machine.creditRate
                 : machine.pixRate;
      netAmount = amount * (1 - rate / 100);
    }
  }

  const comanda: Comanda = {
    id: genId(),
    numero,
    amount,
    netAmount,
    method,
    machineId,
    machineName,
    obs,
    date: customDate ?? Date.now(),
  };
  localStorage.setItem(COMANDAS_KEY, JSON.stringify([comanda, ...getComandas()]));
  return comanda;
};

export const updateComanda = (id: string, data: Partial<Comanda>): void => {
  const all = getComandas().map(c => c.id === id ? { ...c, ...data } : c);
  localStorage.setItem(COMANDAS_KEY, JSON.stringify(all));
};

export const deleteComanda = (id: string): void => {
  localStorage.setItem(COMANDAS_KEY, JSON.stringify(getComandas().filter(c => c.id !== id)));
};

export const getComandasByDate = (dateStr: string): Comanda[] => {
  return getComandas().filter(c => toDateStr(c.date) === dateStr);
};

// =========================================================
// CATEGORIAS DO FLUXO
// =========================================================
export const getCategories = (): FlowCategory[] => {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (!data) return defaultCategories;

    const stored: FlowCategory[] = JSON.parse(data);
    const storedIds = new Set(stored.map(c => c.id));

    // Mescla categorias padrão que ainda não existem no storage (migracao)
    const missing = defaultCategories.filter(d => !storedIds.has(d.id));
    if (missing.length > 0) {
      const merged = [...stored, ...missing];
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(merged));
      return merged;
    }

    return stored;
  } catch { return defaultCategories; }
};
export const saveCategories = (cats: FlowCategory[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats));
};
export const addCategory = (cat: Omit<FlowCategory, 'id'>): void => {
  saveCategories([...getCategories(), { ...cat, id: genId() }]);
};
export const updateCategory = (id: string, data: Partial<FlowCategory>): void => {
  saveCategories(getCategories().map(c => c.id === id ? { ...c, ...data } : c));
};
export const deleteCategory = (id: string): void => {
  // Delete category and all children
  saveCategories(getCategories().filter(c => c.id !== id && c.parentId !== id));
};

// =========================================================
// ENTRADAS MANUAIS (Valores nas células do fluxo)
// =========================================================
export const getManualEntries = (): ManualEntry[] => {
  try {
    const data = localStorage.getItem(MANUAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};
export const saveManualEntry = (categoryId: string, date: string, value: number): void => {
  const all = getManualEntries().filter(e => !(e.categoryId === categoryId && e.date === date));
  if (value !== 0) {
    all.push({ id: genId(), categoryId, date, value });
  }
  localStorage.setItem(MANUAL_KEY, JSON.stringify(all));
};
export const getManualValue = (categoryId: string, date: string): number => {
  const entry = getManualEntries().find(e => e.categoryId === categoryId && e.date === date);
  return entry ? entry.value : 0;
};

// =========================================================
// UTILITÁRIOS
// =========================================================
export const genId = () => Math.random().toString(36).substring(2, 9);
export const toDateStr = (ts: number) => new Date(ts).toISOString().split('T')[0];

/** Retorna o valor de uma categoria em um dia (auto ou manual ou soma de filhos) */
export const getCategoryValue = (
  cat: FlowCategory,
  date: string,
  allCategories: FlowCategory[],
  comandas: Comanda[],
  manualEntries: ManualEntry[]
): number => {
  if (cat.type === 'auto') {
    // Soma NET das comandas daquele dia com o método correspondente
    return comandas
      .filter(c => toDateStr(c.date) === date && c.method === cat.autoMethod)
      .reduce((acc, c) => acc + c.netAmount, 0);
  }
  if (cat.type === 'item') {
    // Valor manual digitado
    return manualEntries.find(e => e.categoryId === cat.id && e.date === date)?.value ?? 0;
  }
  if (cat.type === 'sum') {
    // Soma dos filhos
    const children = allCategories.filter(c => c.parentId === cat.id);
    return children.reduce((acc, child) => acc + getCategoryValue(child, date, allCategories, comandas, manualEntries), 0);
  }
  return 0;
};

/** Gera array de datas 'YYYY-MM-DD' para um mês/ano */
export const getDatesOfMonth = (year: number, month: number): string[] => {
  const days: string[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(`${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  }
  return days;
};

// Compatibilidade com código legado
export type Sale = Comanda;
export const getSales = getComandas;
export const deleteSale = deleteComanda;
