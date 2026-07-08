import React, { useState, useEffect } from "react";
import { Lock, LogOut, CalendarCheck, Utensils, Image as ImageIcon, DollarSign, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ReservationsTab } from "./admin/ReservationsTab";
import { MenuTab } from "./admin/MenuTab";
import { GalleryTab } from "./admin/GalleryTab";
import { CashFlowTab } from "./admin/CashFlowTab";
import { ConfigTab } from "./admin/ConfigTab";
import { ReportsTab } from "./admin/ReportsTab";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu' | 'gallery' | 'cashflow' | 'config'>('reservations');

  useEffect(() => {
    const auth = localStorage.getItem("gaucho_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "gaucho123") {
      setIsAuthenticated(true);
      localStorage.setItem("gaucho_admin_auth", "true");
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("gaucho_admin_auth");
  };

  const tabs = [
    { id: 'reservations', label: 'Reservas', icon: CalendarCheck },
    { id: 'menu', label: 'Cardápio', icon: Utensils },
    { id: 'gallery', label: 'Galeria', icon: ImageIcon },
    { id: 'cashflow', label: 'Caixa / Comandas', icon: DollarSign },
    { id: 'reports', label: 'Fluxo de Caixa', icon: BarChart3 },
    { id: 'config', label: 'Maquininhas', icon: Settings },
  ] as const;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-secondary/30 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
              <Lock className="text-primary w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-2xl font-playfair font-bold text-white text-center mb-2">Painel Restrito</h1>
          <p className="text-white/60 text-center text-sm mb-8">Digite a senha administrativa para acessar</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-center tracking-widest"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full py-6 bg-primary hover:bg-accent text-white font-bold rounded-xl text-lg">
              Entrar no Painel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-8 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header do Admin */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-secondary/30 p-6 rounded-2xl border border-white/10">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-white mb-1">Painel Administrativo</h1>
            <p className="text-white/60 text-sm">Controle total sobre o Novo Tempero Gaúcho</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm text-white/80 hover:text-white"
          >
            <LogOut size={16} /> Sair do Painel
          </button>
        </div>

        {/* Navegação por Abas */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-2 no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-secondary/40 text-white/70 hover:bg-secondary hover:text-white border border-white/5'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Renderização da Aba Ativa */}
        <div>
          {activeTab === 'reservations' && <ReservationsTab />}
          {activeTab === 'menu' && <MenuTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'cashflow' && <CashFlowTab />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'config' && <ConfigTab />}
        </div>
        
      </div>
    </div>
  );
};

export default Admin;
