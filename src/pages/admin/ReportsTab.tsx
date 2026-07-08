import React, { useState, useEffect, useCallback } from "react";
import {
  Plus, Trash2, Edit2, Save, X, Download, ChevronRight, ChevronDown,
  BarChart3
} from "lucide-react";
import {
  getCategories, addCategory, updateCategory, deleteCategory,
  getComandas, getManualEntries, saveManualEntry, getManualValue,
  getCategoryValue, getDatesOfMonth,
  FlowCategory, Comanda, ManualEntry
} from "../../utils/cashflowData";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../../components/ConfirmModal";

const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const MONTH_NAMES = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

// Heights for sticky positioning (must match actual rendered heights)
const ROW1_H = 44; // header row height in px
const ROW2_H = 36; // saldo diário row height in px

// Common sticky cell classes
const stickyLabel  = "sticky left-0 z-[11] bg-[#141414]";
const stickyTotal  = "sticky left-[220px] z-[11] bg-[#141414]";
const stickyCorner = "sticky left-0 z-[31] bg-[#141414]";
const stickyCornerTotal = "sticky left-[220px] z-[31] bg-[#141414]";
const stickyRow2Label = "sticky left-0 z-[21] bg-[#1a1a1a]";
const stickyRow2Total = "sticky left-[220px] z-[21] bg-[#1a1a1a]";

export const ReportsTab = () => {
  const now = new Date();
  const [year, setYear]   = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [categories, setCategories]     = useState<FlowCategory[]>([]);
  const [comandas, setComandas]         = useState<Comanda[]>([]);
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([]);
  const [collapsed, setCollapsed]       = useState<Set<string>>(new Set());
  const [editMode, setEditMode]         = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatName, setEditingCatName] = useState("");

  // Add category form
  const [showAddForm, setShowAddForm] = useState(false);
  const [addKind, setAddKind]   = useState<"entrada"|"saida">("saida");
  const [addName, setAddName]   = useState("");
  const [addType, setAddType]   = useState<"item"|"sum">("item");
  const [addParentId, setAddParentId] = useState("");

  // Inline cell editing
  const [editingCell, setEditingCell] = useState<{catId:string;date:string}|null>(null);
  const [editingCellVal, setEditingCellVal] = useState("");

  // Confirm modal
  const [confirm, setConfirm] = useState<{
    open: boolean; title: string; message: string; onConfirm: () => void;
  }>({ open: false, title: "", message: "", onConfirm: () => {} });

  const askConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirm({ open: true, title, message, onConfirm });
  };

  const load = useCallback(() => {
    setCategories(getCategories());
    setComandas(getComandas());
    setManualEntries(getManualEntries());
  }, []);

  useEffect(() => { load(); }, []);

  const dates = getDatesOfMonth(year, month);
  const sortedCats = [...categories].sort((a, b) => a.order - b.order);
  const topLevel   = sortedCats.filter(c => !c.parentId);

  const getValue = (cat: FlowCategory, date: string) =>
    getCategoryValue(cat, date, categories, comandas, manualEntries);

  const getMonthTotal = (cat: FlowCategory) =>
    dates.reduce((acc, d) => acc + getValue(cat, d), 0);

  const toggleCollapse = (id: string) =>
    setCollapsed(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const handleCellClick = (cat: FlowCategory, date: string) => {
    if (cat.type !== "item") return;
    setEditingCell({ catId: cat.id, date });
    const v = getManualValue(cat.id, date);
    setEditingCellVal(v === 0 ? "" : String(v));
  };

  const commitCell = () => {
    if (!editingCell) return;
    const v = parseFloat(editingCellVal.replace(",", ".")) || 0;
    saveManualEntry(editingCell.catId, editingCell.date, v);
    setEditingCell(null);
    load();
  };

  const handleAddCat = () => {
    if (!addName) return;
    const maxOrder = Math.max(...categories.map(c => c.order), 0);
    
    let kind = addKind;
    if (addType === "item") {
      if (!addParentId) {
        alert("Selecione a categoria principal onde este item vai ficar.");
        return;
      }
      const parent = categories.find(c => c.id === addParentId);
      if (parent) kind = parent.kind;
    }

    addCategory({ name: addName, kind, type: addType, parentId: addType === "item" ? addParentId : undefined, order: maxOrder + 1 });
    setAddName(""); setAddParentId(""); setShowAddForm(false);
    load();
  };

  const handleDeleteCat = (id: string, name: string) => {
    askConfirm("Apagar categoria", `Deseja apagar "${name}" e todas as suas subcategorias?`, () => {
      deleteCategory(id);
      load();
      setConfirm(c => ({ ...c, open: false }));
    });
  };

  const startEditCat  = (cat: FlowCategory) => { setEditingCatId(cat.id); setEditingCatName(cat.name); };
  const commitEditCat = () => {
    if (editingCatId) { updateCategory(editingCatId, { name: editingCatName }); load(); }
    setEditingCatId(null);
  };

  // Export CSV
  const exportCSV = () => {
    const header = ["Categoria", "Total Mês", ...dates.map(d => new Date(d + "T12:00:00").getDate())];
    const rows: (string|number)[][] = [header];
    for (const cat of sortedCats) {
      const indent = cat.parentId ? "   → " : "";
      rows.push([indent + cat.name, getMonthTotal(cat).toFixed(2).replace(".", ","),
        ...dates.map(d => { const v = getValue(cat, d); return v === 0 ? "" : v.toFixed(2).replace(".", ","); })
      ]);
    }
    const csv = rows.map(r => r.join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `fluxo_${MONTH_NAMES[month-1]}_${year}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const totalEntradas = topLevel.filter(c => c.kind === "entrada").reduce((a, c) => a + getMonthTotal(c), 0);
  const totalSaidas   = topLevel.filter(c => c.kind === "saida").reduce((a, c) => a + getMonthTotal(c), 0);
  const saldo = totalEntradas - totalSaidas;

  // ---- ROW RENDERER ----
  const renderCatRow = (cat: FlowCategory, depth = 0) => {
    const children  = sortedCats.filter(c => c.parentId === cat.id);
    const isCollapsed = collapsed.has(cat.id);
    const isSum  = cat.type === "sum";
    const isAuto = cat.type === "auto";
    const monthTotal = getMonthTotal(cat);

    const rowBg = isSum ? "bg-[#1c1c1c]" : "bg-[#141414]";
    const labelBg = isSum ? "bg-[#1c1c1c]" : "bg-[#141414]";

    return (
      <React.Fragment key={cat.id}>
        <tr className={`border-b border-white/5 transition-colors group ${isSum ? "" : "hover:bg-white/[0.03]"}`}>

          {/* Label — sticky left */}
          <td className={`${stickyLabel} ${labelBg} p-0 min-w-[220px] border-r border-white/5`}>
            <div className="flex items-center gap-1 px-3 py-2" style={{ paddingLeft: depth * 14 + 12 + "px" }}>
              {isSum && (
                <button onClick={() => toggleCollapse(cat.id)} className="text-white/30 hover:text-white/70 transition-colors mr-0.5">
                  {isCollapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                </button>
              )}
              {editMode && editingCatId === cat.id ? (
                <div className="flex items-center gap-1 flex-1">
                  <input value={editingCatName} onChange={e => setEditingCatName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && commitEditCat()}
                    className="bg-black/60 border border-primary rounded px-2 py-0.5 text-white text-xs flex-1"
                    autoFocus />
                  <button onClick={commitEditCat}><Save size={12} className="text-primary" /></button>
                  <button onClick={() => setEditingCatId(null)}><X size={12} className="text-white/40" /></button>
                </div>
              ) : (
                <span className={`text-xs leading-tight ${isSum ? "font-bold text-white" : isAuto ? "text-sky-300/90" : "text-white/80"}`}>
                  {cat.name}
                  {isAuto && <span className="text-white/25 text-[10px] ml-1">auto</span>}
                </span>
              )}
              {editMode && editingCatId !== cat.id && (
                <div className="flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100">
                  <button onClick={() => startEditCat(cat)} className="p-0.5 hover:text-white text-white/40 transition-colors"><Edit2 size={11} /></button>
                  {!isAuto && (
                    <button onClick={() => handleDeleteCat(cat.id, cat.name)} className="p-0.5 text-red-400/60 hover:text-red-400 transition-colors"><X size={11} /></button>
                  )}
                </div>
              )}
            </div>
          </td>

          {/* Total Mês — sticky second column */}
          <td className={`${stickyTotal} ${labelBg} p-2 text-right text-xs border-r border-white/10 min-w-[105px] ${isSum ? "font-bold" : ""}`}>
            {monthTotal !== 0
              ? <span className={cat.kind === "entrada" ? "text-green-400" : "text-orange-400"}>{fmt(monthTotal)}</span>
              : <span className="text-white/15">—</span>}
          </td>

          {/* Day cells */}
          {dates.map(date => {
            const v = getValue(cat, date);
            const isEditingThis = editingCell?.catId === cat.id && editingCell?.date === date;
            return (
              <td key={date}
                className={`px-1 py-2 text-right min-w-[80px] border-l border-white/5 ${cat.type === "item" ? "cursor-pointer hover:bg-primary/10" : ""}`}
                onClick={() => handleCellClick(cat, date)}
              >
                {isEditingThis ? (
                  <input autoFocus value={editingCellVal}
                    onChange={e => setEditingCellVal(e.target.value)}
                    onBlur={commitCell}
                    onKeyDown={e => { if (e.key === "Enter") commitCell(); if (e.key === "Escape") setEditingCell(null); }}
                    className="w-full bg-primary/20 border border-primary/60 rounded px-1 py-0.5 text-white text-right text-xs focus:outline-none"
                  />
                ) : (
                  <span className={`text-xs ${v !== 0 ? (cat.kind === "entrada" ? "text-green-400" : "text-orange-400") : "text-white/15"}`}>
                    {v !== 0 ? fmt(v) : "—"}
                  </span>
                )}
              </td>
            );
          })}
        </tr>
        {!isCollapsed && children.map(child => renderCatRow(child, depth + 1))}
      </React.Fragment>
    );
  };

  // Separator row (non-sticky, simple divider)
  const SectionSeparator = ({ label, kind }: { label: string; kind: "entrada"|"saida" }) => (
    <tr>
      <td colSpan={dates.length + 2}
        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${kind === "entrada" ? "bg-green-500/10 text-green-400/80" : "bg-orange-500/10 text-orange-400/80"}`}>
        {kind === "entrada" ? "▲" : "▼"} {label}
      </td>
    </tr>
  );

  return (
    <div className="mt-6 space-y-4">

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirm.open}
        title={confirm.title}
        message={confirm.message}
        confirmLabel="Apagar"
        onConfirm={confirm.onConfirm}
        onCancel={() => setConfirm(c => ({ ...c, open: false }))}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-secondary/20 p-5 rounded-2xl border border-white/10">
          <div className="text-xs text-white/40 mb-1 uppercase tracking-wider">Total Entradas</div>
          <div className="text-2xl font-playfair font-bold text-green-400">{fmt(totalEntradas)}</div>
        </div>
        <div className="bg-secondary/20 p-5 rounded-2xl border border-white/10">
          <div className="text-xs text-white/40 mb-1 uppercase tracking-wider">Total Saídas</div>
          <div className="text-2xl font-playfair font-bold text-orange-400">{fmt(totalSaidas)}</div>
        </div>
        <div className={`p-5 rounded-2xl border ${saldo >= 0 ? "bg-primary/20 border-primary/30" : "bg-red-500/10 border-red-500/30"}`}>
          <div className="text-xs text-white/60 mb-1 uppercase tracking-wider">Saldo do Mês</div>
          <div className={`text-2xl font-playfair font-bold ${saldo >= 0 ? "text-primary" : "text-red-400"}`}>{fmt(saldo)}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 bg-secondary/20 p-4 rounded-2xl border border-white/10">
        <BarChart3 size={18} className="text-primary" />
        <select value={month} onChange={e => setMonth(+e.target.value)}
          className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm">
          {MONTH_NAMES.map((n, i) => <option key={i} value={i+1}>{n}</option>)}
        </select>
        <input type="number" value={year} onChange={e => setYear(+e.target.value)}
          className="w-24 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm" />
        <div className="flex-1" />
        <button onClick={() => { setEditMode(!editMode); setShowAddForm(false); }}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 border ${editMode ? "bg-primary/20 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}>
          <Edit2 size={13} /> {editMode ? "Editando…" : "Editar Categorias"}
        </button>
        <Button onClick={() => setShowAddForm(!showAddForm)}
          className={`text-sm gap-1.5 border ${showAddForm ? "bg-primary text-white border-primary" : "bg-secondary hover:bg-secondary/80 text-white border-white/10"}` }>
          <Plus size={13} /> Nova Categoria
        </Button>
        <Button onClick={exportCSV} variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm gap-1.5">
          <Download size={13} /> Exportar CSV
        </Button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="bg-secondary/30 p-5 rounded-2xl border border-primary/20 flex flex-col gap-4 animate-in fade-in zoom-in-95">
          <div className="text-sm font-bold text-white/80 border-b border-white/10 pb-2">Nova Categoria</div>
          
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="text-xs text-white/50 mb-1 block">O que você deseja criar?</label>
              <select value={addType} onChange={e => setAddType(e.target.value as any)}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                <option value="item">Um sub-item (ex: Conta de Luz, Aluguel, Feira)</option>
                <option value="sum">Um Grupo Principal (ex: Fornecedores, Impostos)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/50 mb-1 block">Nome</label>
              <input value={addName} onChange={e => setAddName(e.target.value)} placeholder="Ex: Conta de Telefone"
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary min-w-[200px]" />
            </div>

            {addType === "sum" ? (
              <div>
                <label className="text-xs text-white/50 mb-1 block">Tipo do Grupo</label>
                <select value={addKind} onChange={e => setAddKind(e.target.value as any)}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                  <option value="entrada">Entradas / Receitas</option>
                  <option value="saida">Saídas / Despesas</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="text-xs text-white/50 mb-1 block">Dentro de qual grupo?</label>
                <select value={addParentId} onChange={e => setAddParentId(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm min-w-[200px]">
                  <option value="" disabled hidden>Selecione um grupo...</option>
                  {sortedCats.filter(c => c.type === "sum").map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}

            <Button onClick={handleAddCat} className="bg-primary hover:bg-accent text-white gap-1.5 text-sm ml-auto">
              <Plus size={13} /> Criar e Salvar
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)} className="border-white/20 text-white hover:bg-white/10">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* ---- MATRIX TABLE ---- */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#141414]">
        {/* Scrollable container — overflow BOTH directions */}
        <div className="overflow-auto" style={{ maxHeight: "65vh" }}>
          <table className="border-collapse text-sm" style={{ minWidth: Math.max(dates.length * 82 + 325, 500) + "px" }}>
            <thead>
              {/* ---- ROW 1: Column headers ---- */}
              <tr>
                {/* Categoria header */}
                <th className={`${stickyCorner} top-0 p-3 text-left min-w-[220px] border-b border-r border-white/10 text-xs font-bold text-white/60 uppercase tracking-wider`}
                  style={{ top: 0 }}>
                  Categoria
                </th>
                {/* Total Mês header */}
                <th className={`${stickyCornerTotal} top-0 p-3 text-right min-w-[105px] border-b border-r border-white/10 text-xs font-bold text-white/60 uppercase tracking-wider`}
                  style={{ top: 0 }}>
                  Total Mês
                </th>
                {/* Day headers */}
                {dates.map(d => {
                  const dt = new Date(d + "T12:00:00");
                  return (
                    <th key={d} style={{ top: 0 }}
                      className="sticky bg-[#141414] z-[20] p-2 text-center min-w-[82px] border-b border-l border-white/5 text-xs text-white/50">
                      <div className="font-bold text-white/80">{dt.getDate()}</div>
                      <div className="text-[10px] text-white/30 normal-case font-normal">
                        {dt.toLocaleDateString("pt-BR", { weekday: "short" })}
                      </div>
                    </th>
                  );
                })}
              </tr>

              {/* ---- ROW 2: Saldo Diário (summary row) ---- */}
              <tr className="bg-[#1a1a1a]">
                <td className={`${stickyRow2Label} border-b border-r border-white/10 px-3 py-2 text-xs font-bold text-white/50`}
                  style={{ top: ROW1_H }}>
                  Saldo Diário
                </td>
                <td className={`${stickyRow2Total} border-b border-r border-white/10 px-3 py-2 text-right text-xs font-bold`}
                  style={{ top: ROW1_H }}>
                  <span className={saldo >= 0 ? "text-primary" : "text-red-400"}>{fmt(saldo)}</span>
                </td>
                {dates.map(d => {
                  const dayEnt = topLevel.filter(c => c.kind === "entrada").reduce((a, c) => a + getValue(c, d), 0);
                  const daySai = topLevel.filter(c => c.kind === "saida").reduce((a, c) => a + getValue(c, d), 0);
                  const daySaldo = dayEnt - daySai;
                  return (
                    <td key={d}
                      className="sticky bg-[#1a1a1a] z-[20] border-b border-l border-white/5 px-1 py-2 text-center text-xs font-bold"
                      style={{ top: ROW1_H }}>
                      <span className={daySaldo > 0 ? "text-green-400" : daySaldo < 0 ? "text-red-400" : "text-white/15"}>
                        {daySaldo !== 0 ? fmt(daySaldo) : "—"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {/* ENTRADAS */}
              <SectionSeparator label="Entradas" kind="entrada" />
              {topLevel.filter(c => c.kind === "entrada").map(cat => renderCatRow(cat))}

              {/* SAÍDAS */}
              <SectionSeparator label="Saídas / Despesas" kind="saida" />
              {topLevel.filter(c => c.kind === "saida").map(cat => renderCatRow(cat))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
