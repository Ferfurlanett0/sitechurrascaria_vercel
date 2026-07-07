import React, { useState } from "react";
import { ChevronRight, ChevronLeft, CalendarHeart, Briefcase, Heart, Utensils, CheckCircle2 } from "lucide-react";

const ReservationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    guests: "2",
    date: "",
    time: "12:00",
    name: "",
    phone: "",
    occasion: "Comum",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOccasion = (occasion: string) => {
    setFormData({ ...formData, occasion });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }
  
    // Converter a data para DD/MM/YYYY
    const dateParts = formData.date.split("-");
    const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : formData.date;
  
    const phoneNumber = "551936711191";
  
    // Mensagem formatada
    const text = `\uD83D\uDCCC *NOVA RESERVA VIP* \uD83D\uDCCC\n`
      + `----------------------------------\n`
      + `\uD83D\uDC64 *Nome:* ${formData.name}\n`
      + `\uD83D\uDCDE *Telefone:* ${formData.phone}\n`
      + `\uD83D\uDCC5 *Data:* ${formattedDate}\n`
      + `\u23F0 *Horário:* ${formData.time}\n`
      + `\uD83D\uDC65 *Pessoas:* ${formData.guests}\n`
      + `\uD83C\uDF89 *Ocasião:* ${formData.occasion}\n`
      + `\uD83D\uDCDD *Obs:* ${formData.message || "Nenhuma"}\n`
      + `----------------------------------\n`
      + `\u2705 *Aguardando confirmação!*`;
  
    const encodedText = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group min-h-[450px] flex flex-col" id="contact">
      {/* Decoração sutil */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-bl-full -z-10 transition-colors duration-500" />
      
      {/* Progresso */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10 -translate-y-1/2" />
        <div className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${(step - 1) * 50}%` }} />
        
        {[1, 2, 3].map((num) => (
          <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= num ? 'bg-primary text-white shadow-[0_0_15px_rgba(234,88,12,0.5)]' : 'bg-secondary text-white/30 border border-white/10'}`}>
            {step > num ? <CheckCircle2 size={16} /> : num}
          </div>
        ))}
      </div>

      <h3 className="text-3xl font-playfair font-bold mb-2 text-white text-center">
        {step === 1 && "Detalhes da Mesa"}
        {step === 2 && "Seus Dados"}
        {step === 3 && "Toque Final"}
      </h3>
      <p className="text-white/50 text-center text-sm mb-8">
        {step === 1 && "Quando e quantos seremos?"}
        {step === 2 && "Como podemos te chamar?"}
        {step === 3 && "É uma ocasião especial?"}
      </p>
      
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        
        {/* PASSO 1: Mesa */}
        <div className={`space-y-6 transition-all duration-500 flex-grow ${step === 1 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-white/80">Data da Reserva</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]"
                required={step === 1}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium text-white/80">Horário</label>
              <input
                type="time"
                id="time"
                min="11:00"
                max="14:30"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]"
                required={step === 1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Número de Pessoas</label>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-2 w-full max-w-[200px] mx-auto">
               <button type="button" onClick={() => setFormData(p => ({...p, guests: Math.max(1, parseInt(p.guests) - 1).toString()}))} className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-xl font-bold">-</button>
               <span className="flex-grow text-center text-xl font-bold text-white">{formData.guests}</span>
               <button type="button" onClick={() => setFormData(p => ({...p, guests: (parseInt(p.guests) + 1).toString()}))} className="w-10 h-10 rounded-lg bg-white/10 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-xl font-bold">+</button>
            </div>
          </div>
        </div>

        {/* PASSO 2: Contato */}
        <div className={`space-y-6 transition-all duration-500 flex-grow ${step === 2 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">Nome completo</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Ex: João da Silva"
              required={step === 2}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-white/80">Telefone (WhatsApp)</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="(19) 99999-9999"
              required={step === 2}
            />
          </div>
        </div>

        {/* PASSO 3: Ocasião */}
        <div className={`space-y-6 transition-all duration-500 flex-grow ${step === 3 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
          <div className="grid grid-cols-2 gap-3">
             <button type="button" onClick={() => handleOccasion("Comum")} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.occasion === 'Comum' ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}>
                <Utensils size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Almoço</span>
             </button>
             <button type="button" onClick={() => handleOccasion("Aniversário")} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.occasion === 'Aniversário' ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}>
                <CalendarHeart size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Aniversário</span>
             </button>
             <button type="button" onClick={() => handleOccasion("Casal")} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.occasion === 'Casal' ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}>
                <Heart size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Casal</span>
             </button>
             <button type="button" onClick={() => handleOccasion("Negócios")} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.occasion === 'Negócios' ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}>
                <Briefcase size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Negócios</span>
             </button>
          </div>
          
          <div className="space-y-2 mt-4">
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Alguma restrição alimentar ou observação?"
            ></textarea>
          </div>
        </div>
        
        {/* Navegação */}
        <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-4 rounded-xl font-bold tracking-wide text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button
            type="submit"
            className="flex-grow bg-primary text-white py-4 rounded-xl font-bold tracking-wide hover:bg-accent hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {step < 3 ? (
               <>Próximo Passo <ChevronRight size={20} /></>
            ) : (
               "Confirmar Reserva"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;

