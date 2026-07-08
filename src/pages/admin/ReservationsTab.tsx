import React, { useState, useEffect } from "react";
import { CheckCircle2, Clock, XCircle, Trash2, Calendar, Phone, Users } from "lucide-react";
import { getReservations, updateReservationStatus, deleteReservation, Reservation } from "../../utils/reservations";
import { ConfirmModal } from "../../components/ConfirmModal";

export const ReservationsTab = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [confirm, setConfirm] = useState<{ open: boolean; id: string }>({ open: false, id: "" });

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = () => {
    setReservations(getReservations());
  };

  const handleStatusUpdate = (id: string, status: Reservation["status"]) => {
    updateReservationStatus(id, status);
    loadReservations();
  };

  const handleDelete = (id: string) => {
    setConfirm({ open: true, id });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmada': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Cancelada': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    }
  };

  return (
    <div className="bg-secondary/20 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm mt-6">
      <ConfirmModal
        isOpen={confirm.open}
        title="Apagar reserva"
        message="Tem certeza que deseja apagar esta reserva permanentemente?"
        confirmLabel="Apagar"
        onConfirm={() => { deleteReservation(confirm.id); loadReservations(); setConfirm({ open: false, id: "" }); }}
        onCancel={() => setConfirm({ open: false, id: "" })}
      />
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold">Gerenciar Reservas</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/40 text-white/70 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium border-b border-white/10">Cliente</th>
              <th className="p-4 font-medium border-b border-white/10">Data / Hora</th>
              <th className="p-4 font-medium border-b border-white/10">Pessoas</th>
              <th className="p-4 font-medium border-b border-white/10">Status</th>
              <th className="p-4 font-medium border-b border-white/10 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/50">
                  Nenhuma reserva encontrada ainda.
                </td>
              </tr>
            ) : (
              reservations.map((res) => (
                <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-white">{res.name}</div>
                    <div className="flex items-center gap-1 text-sm text-white/60 mt-1">
                      <Phone size={12} /> {res.phone}
                    </div>
                    {res.message && <div className="text-xs text-primary mt-1">Obs: {res.message}</div>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-white/90">
                      <Calendar size={14} className="text-white/50" /> {res.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-white/60 mt-1">
                      <Clock size={14} className="text-white/50" /> {res.time}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-white/90">
                      <Users size={14} className="text-white/50" /> {res.guests} ({res.occasion})
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(res.status)}`}>
                      {res.status === 'Confirmada' && <CheckCircle2 size={12} />}
                      {res.status === 'Pendente' && <Clock size={12} />}
                      {res.status === 'Cancelada' && <XCircle size={12} />}
                      {res.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      {res.status !== 'Confirmada' && (
                        <button 
                          onClick={() => handleStatusUpdate(res.id, 'Confirmada')}
                          className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                          title="Confirmar"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      {res.status !== 'Cancelada' && (
                        <button 
                          onClick={() => handleStatusUpdate(res.id, 'Cancelada')}
                          className="p-2 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors"
                          title="Cancelar"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(res.id)}
                        className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors ml-2"
                        title="Apagar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
