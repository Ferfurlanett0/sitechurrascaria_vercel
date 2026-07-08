import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Settings2, Download, Upload } from "lucide-react";
import { getMachines, addMachine, deleteMachine, Machine } from "../../utils/cashflowData";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../../components/ConfirmModal";

export const ConfigTab = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [name, setName] = useState("");
  const [debitRate, setDebitRate] = useState("");
  const [creditRate, setCreditRate] = useState("");
  const [pixRate, setPixRate] = useState("");
  const [confirm, setConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMachines();
  }, []);

  const loadMachines = () => setMachines(getMachines());

  const handleAdd = () => {
    if (!name || !debitRate || !creditRate || !pixRate) return;
    addMachine({
      name,
      debitRate: parseFloat(debitRate.replace(',', '.')),
      creditRate: parseFloat(creditRate.replace(',', '.')),
      pixRate: parseFloat(pixRate.replace(',', '.'))
    });
    setName("");
    setDebitRate("");
    setCreditRate("");
    setPixRate("");
    loadMachines();
  };

  const handleDelete = (id: string) => {
    setConfirm({ open: true, id });
  };

  const handleExportBackup = () => {
    const data = {
      gaucho_reservations: localStorage.getItem("gaucho_reservations"),
      gaucho_menu: localStorage.getItem("gaucho_menu"),
      gaucho_machines: localStorage.getItem("gaucho_machines"),
      gaucho_comandas: localStorage.getItem("gaucho_comandas"),
      gaucho_flow_categories: localStorage.getItem("gaucho_flow_categories"),
      gaucho_manual_entries: localStorage.getItem("gaucho_manual_entries"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup_tempero_gaucho_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.gaucho_reservations) localStorage.setItem("gaucho_reservations", data.gaucho_reservations);
        if (data.gaucho_menu) localStorage.setItem("gaucho_menu", data.gaucho_menu);
        if (data.gaucho_machines) localStorage.setItem("gaucho_machines", data.gaucho_machines);
        if (data.gaucho_comandas) localStorage.setItem("gaucho_comandas", data.gaucho_comandas);
        if (data.gaucho_flow_categories) localStorage.setItem("gaucho_flow_categories", data.gaucho_flow_categories);
        if (data.gaucho_manual_entries) localStorage.setItem("gaucho_manual_entries", data.gaucho_manual_entries);
        
        alert("Backup restaurado com sucesso! A página será recarregada para aplicar os dados.");
        window.location.reload();
      } catch (err) {
        alert("Erro ao ler arquivo de backup. O arquivo pode ser inválido ou estar corrompido.");
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // clear input
  };

  return (
    <div className="mt-6 space-y-6">
      <ConfirmModal
        isOpen={confirm.open}
        title="Remover Maquininha"
        message="Tem certeza que deseja remover esta maquininha permanentemente?"
        confirmLabel="Remover"
        onConfirm={() => { deleteMachine(confirm.id); loadMachines(); setConfirm({ open: false, id: "" }); }}
        onCancel={() => setConfirm({ open: false, id: "" })}
      />
      <div className="bg-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings2 className="text-primary" /> Cadastrar Maquininha
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input 
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Nome (ex: Stone)"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
          />
          <input 
            value={debitRate} onChange={(e) => setDebitRate(e.target.value)}
            type="number" step="0.01"
            placeholder="Taxa Débito (%)"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
          />
          <input 
            value={creditRate} onChange={(e) => setCreditRate(e.target.value)}
            type="number" step="0.01"
            placeholder="Taxa Crédito (%)"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
          />
          <input 
            value={pixRate} onChange={(e) => setPixRate(e.target.value)}
            type="number" step="0.01"
            placeholder="Taxa Pix (%)"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
          />
          <Button onClick={handleAdd} className="bg-primary hover:bg-accent text-white">
            <Plus size={16} className="mr-2" /> Adicionar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {machines.map(m => (
          <div key={m.id} className="bg-secondary/20 rounded-2xl border border-white/10 p-6 relative group">
            <h3 className="text-lg font-bold text-white mb-4">{m.name}</h3>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Débito:</span>
                <span className="text-white font-medium">{m.debitRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Crédito:</span>
                <span className="text-white font-medium">{m.creditRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Pix:</span>
                <span className="text-white font-medium">{m.pixRate}%</span>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(m.id)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mt-8">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          Backup e Restauração de Dados
        </h2>
        <p className="text-sm text-white/60 mb-6">
          Exporte todo o seu sistema (Fluxo de Caixa, Cardápio, Reservas e Configurações) para um arquivo seguro, ou restaure um arquivo de backup anterior.
        </p>
        
        <div className="flex gap-4">
          <Button onClick={handleExportBackup} className="bg-primary hover:bg-accent text-white border border-primary gap-2">
            <Download size={16} /> Exportar Backup (Baixar)
          </Button>

          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleImportBackup} 
            className="hidden" 
          />
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
            <Upload size={16} /> Importar Backup (Restaurar)
          </Button>
        </div>
      </div>
    </div>
  );
};
