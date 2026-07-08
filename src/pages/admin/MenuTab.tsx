import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem, MenuItem } from "../../utils/menuData";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../../components/ConfirmModal";

export const MenuTab = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

  // Form State
  const [category, setCategory] = useState<MenuItem['category']>('Buffet');
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = () => setItems(getMenu());

  const resetForm = () => {
    setCategory('Buffet');
    setName("");
    setPrice("");
    setDescription("");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!name || !price) return;
    if (editingId) {
      updateMenuItem(editingId, { category, name, price, description });
    } else {
      addMenuItem({ category, name, price, description });
    }
    loadMenu();
    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setCategory(item.category);
    setName(item.name);
    setPrice(item.price);
    setDescription(item.description);
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setConfirm({ open: true, id });
  };

  return (
    <div className="mt-6 space-y-6">
      <ConfirmModal
        isOpen={confirm.open}
        title="Apagar item"
        message="Deseja apagar este item do cardápio permanentemente?"
        confirmLabel="Apagar"
        onConfirm={() => { deleteMenuItem(confirm.id); loadMenu(); setConfirm({ open: false, id: "" }); }}
        onCancel={() => setConfirm({ open: false, id: "" })}
      />
      {/* Header and Add Button */}
      <div className="flex justify-between items-center bg-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="text-xl font-bold">Gerenciar Cardápio</h2>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="bg-primary hover:bg-accent text-white flex items-center gap-2">
            <Plus size={16} /> Novo Item
          </Button>
        )}
      </div>

      {/* Form Area */}
      {isAdding && (
        <div className="bg-secondary/40 p-6 rounded-2xl border border-primary/30 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-4">{editingId ? "Editar Item" : "Novo Item"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Categoria</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
              >
                <option value="Buffet">Buffet</option>
                <option value="Marmitex">Marmitex</option>
                <option value="Carnes">Carnes Nobres</option>
                <option value="Pratos">Prato Feito</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Nome do Prato</label>
              <input 
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Marmitex Gigante"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Preço</label>
              <input 
                value={price} onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: R$45,00"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Descrição</label>
              <input 
                value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Arroz, feijão, 3 carnes..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={resetForm} className="border-white/20 hover:bg-white/10 text-white">
              <X size={16} className="mr-2" /> Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-accent text-white">
              <Save size={16} className="mr-2" /> Salvar
            </Button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {['Buffet', 'Marmitex', 'Carnes', 'Pratos'].map(cat => {
          const catItems = items.filter(i => i.category === cat);
          if (catItems.length === 0) return null;
          return (
            <div key={cat} className="bg-secondary/20 rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-primary mb-4">{cat}</h3>
              <div className="space-y-4">
                {catItems.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/20 p-4 rounded-xl border border-white/5">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <h4 className="font-bold text-white text-lg">{item.name}</h4>
                        <span className="text-primary font-bold">{item.price}</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1">{item.description}</p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button onClick={() => handleEdit(item)} className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
