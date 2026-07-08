import React, { useState, useEffect, useCallback } from "react";
import {
  Plus, Trash2, DollarSign, ArrowUpRight, ArrowDownRight,
  Calculator, Download, Edit2, X, Save
} from "lucide-react";
import {
  getMachines, getComandas, addComanda, deleteComanda, updateComanda,
  Machine, Comanda, PaymentMethod, toDateStr
} from "../../utils/cashflowData";
import { Button } from "@/components/ui/button";

const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const todayStr = () => new Date().toISOString().split("T")[0];

export const CashFlowTab = () => {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr());
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [numero, setNumero] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("Dinheiro");
  const [machineId, setMachineId] = useState("");
  const [obs, setObs] = useState("");
  const [formDate, setFormDate] = useState(todayStr());

  const load = useCallback(() => {
    const m = getMachines();
    setMachines(m);
    setComandas(getComandas());
    if (m.length > 0 && !machineId) setMachineId(m[0].id);
  }, [machineId]);

  useEffect(() => { load(); }, []);

  const handleSave = () => {
    const val = parseFloat(amount.replace(",", "."));
    if (isNaN(val) || val <= 0) return;

    if (editingId) {
      // recalculate net
      const machine = machines.find(m => m.id === machineId);
      let net = val;
      if (method !== "Dinheiro" && machine) {
        const rate = method === "Débito" ? machine.debitRate
                   : method === "Crédito" ? machine.creditRate
                   : machine.pixRate;
        net = val * (1 - rate / 100);
      }
      updateComanda(editingId, {
        numero, amount: val, netAmount: net,
        method, machineId: method !== "Dinheiro" ? machineId : undefined,
        machineName: method !== "Dinheiro" ? machine?.name : undefined,
        obs, date: new Date(formDate + "T12:00:00").getTime()
      });
      setEditingId(null);
    } else {
      addComanda(numero, val, method,
        method !== "Dinheiro" ? machineId : undefined,
        obs || undefined,
        new Date(formDate + "T12:00:00").getTime()
      );
    }
    setNumero(""); setAmount(""); setObs("");
    load();
  };

  const startEdit = (c: Comanda) => {
    setEditingId(c.id);
    setNumero(c.numero);
    setAmount(String(c.amount));
    setMethod(c.method);
    setMachineId(c.machineId ?? (machines[0]?.id ?? ""));
    setObs(c.obs ?? "");
    setFormDate(toDateStr(c.date));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNumero(""); setAmount(""); setObs("");
    setFormDate(todayStr());
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apagar esta comanda?")) { deleteComanda(id); load(); }
  };

  // Filter display
  const displayed = selectedDate === "all"
    ? comandas
    : comandas.filter(c => toDateStr(c.date) === selectedDate);

  const totalBruto  = displayed.reduce((a, c) => a + c.amount, 0);
  const totalLiquido= displayed.reduce((a, c) => a + c.netAmount, 0);
  const totalTaxas  = totalBruto - totalLiquido;

  // Export CSV
  const exportCSV = () => {
    const rows = [
      ["Nº Comanda","Data","Método","Maquininha","Valor Bruto","Taxa","Valor Líquido","Obs"],
      ...displayed.map(c => [
        c.numero,
        new Date(c.date).toLocaleDateString("pt-BR"),
        c.method,
        c.machineName ?? "-",
        c.amount.toFixed(2).replace(".",","),
        (c.amount - c.netAmount).toFixed(2).replace(".",","),
        c.netAmount.toFixed(2).replace(".",","),
        c.obs ?? ""
      ])
    ];
    const csv = rows.map(r => r.join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comandas_${selectedDate === "all" ? "todas" : selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 space-y-6">

      {/* Resumo do Período */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/60 mb-2 text-sm">
            <ArrowUpRight size={16} className="text-green-400" /> Total Bruto
          </div>
          <div className="text-3xl font-playfair font-bold text-white">{fmt(totalBruto)}</div>
        </div>
        <div className="bg-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/60 mb-2 text-sm">
            <ArrowDownRight size={16} className="text-red-400" /> Taxas Pagas
          </div>
          <div className="text-3xl font-playfair font-bold text-white">{fmt(totalTaxas)}</div>
        </div>
        <div className="bg-primary/20 p-6 rounded-2xl border border-primary/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/80 mb-2 text-sm">
            <DollarSign size={16} className="text-primary" /> Valor Líquido
          </div>
          <div className="text-3xl font-playfair font-bold text-primary">{fmt(totalLiquido)}</div>
        </div>
      </div>

      {/* Filtro de data */}
      <div className="flex flex-wrap items-center gap-3 bg-secondary/20 p-4 rounded-2xl border border-white/10">
        <span className="text-white/60 text-sm">Visualizando:</span>
        <input
          type="date"
          value={selectedDate === "all" ? "" : selectedDate}
          onChange={e => setSelectedDate(e.target.value || "all")}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm"
        />
        <button
          onClick={() => setSelectedDate("all")}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedDate === "all" ? "bg-primary text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
        >
          Todas
        </button>
        <button
          onClick={() => setSelectedDate(todayStr())}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${selectedDate === todayStr() && selectedDate !== "all" ? "bg-primary text-white" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
        >
          Hoje
        </button>
        <div className="flex-1" />
        <Button onClick={exportCSV} variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm gap-2">
          <Download size={14} /> Exportar CSV
        </Button>
      </div>

      {/* Formulário de Lançamento */}
      <div className="bg-secondary/20 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calculator className="text-primary" />
          {editingId ? "Editar Comanda" : "Lançar Comanda"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Nº Comanda</label>
            <input
              value={numero} onChange={e => setNumero(e.target.value)}
              placeholder="Ex: 21"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Data</label>
            <input
              type="date" value={formDate} onChange={e => setFormDate(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Valor Bruto R$</label>
            <input
              value={amount} onChange={e => setAmount(e.target.value)}
              type="number" step="0.01" placeholder="0,00"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Forma de Pgto</label>
            <select
              value={method} onChange={e => setMethod(e.target.value as PaymentMethod)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Maquininha</label>
            <select
              value={machineId}
              onChange={e => setMachineId(e.target.value)}
              disabled={method === "Dinheiro"}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary disabled:opacity-40"
            >
              {machines.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              {machines.length === 0 && <option value="">Cadastre uma maquininha</option>}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Obs (opcional)</label>
            <input
              value={obs} onChange={e => setObs(e.target.value)}
              placeholder="Anotação..."
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          {editingId && (
            <Button variant="outline" onClick={cancelEdit} className="border-white/20 text-white hover:bg-white/10">
              <X size={14} className="mr-1" /> Cancelar
            </Button>
          )}
          <Button onClick={handleSave} className="bg-primary hover:bg-accent text-white">
            {editingId ? <><Save size={14} className="mr-1" /> Salvar</> : <><Plus size={14} className="mr-1" /> Lançar</>}
          </Button>
        </div>
      </div>

      {/* Tabela de Comandas */}
      <div className="bg-secondary/20 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-bold">Comandas ({displayed.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-black/40 text-white/60 uppercase tracking-wider text-xs">
                <th className="p-3 border-b border-white/10">Nº</th>
                <th className="p-3 border-b border-white/10">Data</th>
                <th className="p-3 border-b border-white/10">Método</th>
                <th className="p-3 border-b border-white/10">Maquininha</th>
                <th className="p-3 border-b border-white/10 text-right">Bruto</th>
                <th className="p-3 border-b border-white/10 text-right">Taxa</th>
                <th className="p-3 border-b border-white/10 text-right text-primary">Líquido</th>
                <th className="p-3 border-b border-white/10">Obs</th>
                <th className="p-3 border-b border-white/10 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr><td colSpan={9} className="p-8 text-center text-white/40">Nenhuma comanda encontrada.</td></tr>
              ) : (
                displayed.map(c => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono text-white font-bold">{c.numero || "—"}</td>
                    <td className="p-3 text-white/70">{new Date(c.date).toLocaleDateString("pt-BR")}</td>
                    <td className="p-3 text-white">{c.method}</td>
                    <td className="p-3 text-white/60">{c.machineName ?? "—"}</td>
                    <td className="p-3 text-right text-white/60">{fmt(c.amount)}</td>
                    <td className="p-3 text-right text-red-400/80">{fmt(c.amount - c.netAmount)}</td>
                    <td className="p-3 text-right font-bold text-primary">{fmt(c.netAmount)}</td>
                    <td className="p-3 text-white/50 text-xs max-w-[120px] truncate">{c.obs || "—"}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => startEdit(c)} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {displayed.length > 0 && (
              <tfoot>
                <tr className="bg-black/30 font-bold text-sm">
                  <td colSpan={4} className="p-3 text-white/60">TOTAL</td>
                  <td className="p-3 text-right text-white/80">{fmt(totalBruto)}</td>
                  <td className="p-3 text-right text-red-400">{fmt(totalTaxas)}</td>
                  <td className="p-3 text-right text-primary">{fmt(totalLiquido)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
