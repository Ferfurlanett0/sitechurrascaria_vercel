import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useReservation } from "../contexts/ReservationContext";
import ReservationForm from "./ReservationForm";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const ReservationModal: React.FC = () => {
  const { isModalOpen, closeModal } = useReservation();

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[800px] p-0 bg-transparent border-none shadow-none text-white [&>button]:hidden overflow-hidden">
        {/* Usando VisuallyHidden para título e descrição de acessibilidade exigidos pelo Dialog */}
        <DialogPrimitive.Title className="sr-only">Fazer Reserva</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">Preencha os detalhes para fazer sua reserva no Novo Tempero Gaúcho.</DialogPrimitive.Description>
        
        <div className="relative">
          {/* Botão de Fechar Customizado */}
          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-primary transition-all border border-white/10"
            aria-label="Fechar modal"
          >
            ✕
          </button>
          
          <ReservationForm onComplete={closeModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
