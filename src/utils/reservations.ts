export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  message: string;
  status: 'Pendente' | 'Confirmada' | 'Cancelada';
  createdAt: number;
}

const STORAGE_KEY = 'gaucho_reservations';

export const getReservations = (): Reservation[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao ler reservas", error);
    return [];
  }
};

export const addReservation = (reservationData: Omit<Reservation, 'id' | 'status' | 'createdAt'>): void => {
  try {
    const current = getReservations();
    const newReservation: Reservation = {
      ...reservationData,
      id: Math.random().toString(36).substring(2, 9),
      status: 'Pendente',
      createdAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newReservation, ...current]));
  } catch (error) {
    console.error("Erro ao salvar reserva", error);
  }
};

export const updateReservationStatus = (id: string, status: Reservation['status']): void => {
  try {
    const current = getReservations();
    const updated = current.map(res => res.id === id ? { ...res, status } : res);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Erro ao atualizar status", error);
  }
};

export const deleteReservation = (id: string): void => {
  try {
    const current = getReservations();
    const updated = current.filter(res => res.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Erro ao excluir reserva", error);
  }
};
