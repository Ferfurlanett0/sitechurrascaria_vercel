import React from "react";
import { useToast } from "@/components/ui/use-toast";

const ReservationForm: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const dateRaw = (document.getElementById("date") as HTMLInputElement).value;
    const time = (document.getElementById("time") as HTMLInputElement).value;
    const guests = (document.getElementById("guests") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLTextAreaElement).value;
  
    // Converter a data para DD/MM/YYYY
    const dateParts = dateRaw.split("-");
    const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  
    // Número correto no formato internacional para WhatsApp
    const phoneNumber = "551936711191"; // DDD + número
  
    // Mensagem com emojis diretamente, sem codificação
    const text = `📌 NOVA RESERVA DE MESA 📌\n`
      + `----------------------------------\n`
      + `👤 Nome: ${name}\n`
      + `📞 Telefone: ${phone}\n`
      + `📅 Data: ${date}\n`
      + `⏰ Horário: ${time}\n`
      + `👥 Nº de Pessoas: ${guests}\n`
      + `📝 Observações: ${message}\n`
      + `----------------------------------\n`
      + `✅ Aguardando confirmação!`;
  
    // Codificando a mensagem completa para URL com encodeURIComponent
    const encodedText = encodeURIComponent(text);
  
    // Montando a URL para abrir no WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
  
    // Abrir WhatsApp
    window.open(url, "_blank");
  };
  

  return (
    <div className="bg-white/95 rounded-lg p-6 shadow-lg" id="contact">
      <h3 className="text-2xl font-bold mb-4 text-center">RESERVE SUA MESA</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Data
            </label>
            <input
              type="date"
              id="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              Horário
            </label>
            <input
              type="time"
              id="time"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="11:00"
              max="14:30"
              required
            />
          </div>
          <div>
            <label htmlFor="guests" className="block text-sm font-medium mb-1">
              Nº de pessoas
            </label>
            <input
              type="number"
              id="guests"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Observações
          </label>
          <textarea
            id="message"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-accent transition-colors"
        >
          CONFIRMAR RESERVA
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
