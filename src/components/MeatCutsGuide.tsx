import React, { useState } from 'react';
import { Info, Flame, ChefHat } from 'lucide-react';
import { BoiCortesSVG } from './BoiCortesSVG';
import EmberParticles from './EmberParticles';

type Cut = {
  id: string;
  label: string;
  name: string;
  description: string;
  doneness: string;
  preparo: string;
  area: { top: string; left: string; width: string; height: string };
  polygon?: string;
};

const cuts: Cut[] = [
  {
    id: '1_musculo_dianteiro',
    label: '1',
    name: 'Músculo Dianteiro',
    description: 'Corte magro e muito saboroso, rico em colágeno. Ideal para cozimentos longos, caldos e sopas.',
    doneness: 'Cozimento Lento',
    preparo: 'Ensopados / Sopas',
    area: { top: '70%', left: '34%', width: '6%', height: '12%' },
    polygon: '800,1350 820,1650 780,1680 720,1680 740,1500 680,1500 680,1380',
  },
  {
    id: '2_peito',
    label: '2',
    name: 'Peito',
    description: 'Parte dianteira com fibras longas. Muito usado para defumação (Brisket) ou cozido na panela.',
    doneness: 'Cozimento Longo',
    preparo: 'Defumador / Forno',
    area: { top: '50%', left: '20%', width: '6%', height: '10%' },
    polygon: '400,1020 530,880 620,950 760,1300 700,1380 500,1200',
  },
  {
    id: '3_pescoco',
    label: '3',
    name: 'Pescoço',
    description: 'Corte com gordura entremeada, excelente para pratos que exigem cozimento demorado e molhos ricos.',
    doneness: 'Cozimento Lento',
    preparo: 'Panela / Ensopado',
    area: { top: '32%', left: '20%', width: '8%', height: '12%' },
    polygon: '400,1020 180,750 350,450 550,200 680,900',
  },
  {
    id: '4_acem',
    label: '4',
    name: 'Acém',
    description: 'O maior corte do dianteiro. Carnudo e versátil, muito apreciado para carne de panela e blends de hambúrguer.',
    doneness: 'Ao Ponto / Bem Passado',
    preparo: 'Panela / Moído',
    area: { top: '23%', left: '28%', width: '7%', height: '15%' },
    polygon: '550,200 680,900 900,800 800,350',
  },
  {
    id: '5_cupim',
    label: '5',
    name: 'Cupim',
    description: 'Exclusivo do zebu (Nelore). Fibroso e muito entremeado de gordura, derrete após longo assado no celofane.',
    doneness: 'Bem Passado',
    preparo: 'Churrasqueira (Lento)',
    area: { top: '8%', left: '33%', width: '10%', height: '8%' },
    polygon: '550,200 800,350 980,350 900,100 650,80',
  },
  {
    id: '6_paleta',
    label: '6',
    name: 'Paleta',
    description: 'Corte localizado nas pernas dianteiras. Possui fibras longas e sabor acentuado, ideal para assados.',
    doneness: 'Ao Ponto para Mal',
    preparo: 'Forno / Grelha',
    area: { top: '48%', left: '28%', width: '12%', height: '12%' },
    polygon: '680,900 900,800 1050,1080 1000,1300 820,1350 780,1300',
  },
  {
    id: '7_capa_file',
    label: '7',
    name: 'Capa de Filé',
    description: 'Carne de textura desigual e muita fibra. Ideal para preparos com bastante molho e cozimento lento.',
    doneness: 'Cozimento Lento',
    preparo: 'Ensopado',
    area: { top: '20%', left: '40%', width: '8%', height: '10%' },
    polygon: '800,350 900,800 1180,750 1180,380',
  },
  {
    id: '8_file_costela',
    label: '8',
    name: 'Filé de Costela',
    description: 'Também conhecido como Noix ou Ancho. Muito marmorizado, suculento e perfeito para cortes grossos na grelha.',
    doneness: 'Mal Passado a Ao Ponto',
    preparo: 'Grelha Fogo Alto',
    area: { top: '22%', left: '50%', width: '8%', height: '10%' },
    polygon: '1180,380 1180,750 1430,750 1430,420',
  },
  {
    id: '10_ponta_agulha',
    label: '10',
    name: 'Ponta de Agulha',
    description: 'A famosa Costela Minga. Formada por ossos finos e cartilagem, com bastante gordura. O sabor do churrasco gaúcho.',
    doneness: 'Bem Passado',
    preparo: 'Fogo de Chão / Lento',
    area: { top: '42%', left: '46%', width: '16%', height: '16%' },
    polygon: '1050,1080 900,800 1180,750 1430,750 1600,800 1750,1000 1750,1200 1500,1100 1200,1150 1000,1300',
  },
  {
    id: '11_contrafile',
    label: '11',
    name: 'Contrafilé',
    description: 'O corte mais longo do lombo bovino. Macio, com sabor acentuado e clássica capa de gordura.',
    doneness: 'Ao Ponto para Mal',
    preparo: 'Grelha / Chapa',
    area: { top: '17%', left: '61%', width: '9%', height: '8%' },
    polygon: '1430,420 1430,750 1600,800 1700,800 1730,400',
  },
  {
    id: '12_file_mignon',
    label: '12',
    name: 'Filé Mignon',
    description: 'O corte mais macio do boi, com sabor suave e pouca gordura. Ideal para medalhões, estrogonofe e pratos finos.',
    doneness: 'Mal Passado',
    preparo: 'Chapa / Frigideira',
    area: { top: '25%', left: '61%', width: '8%', height: '6%' },
    polygon: '1400,600 1680,620 1750,750 1400,750',
  },
  {
    id: '13_fraldinha',
    label: '13',
    name: 'Fraldinha',
    description: 'Corte do fraldão com fibras grossas e soltas. Cortada contra a fibra, é extremamente macia e suculenta na brasa.',
    doneness: 'Ao Ponto',
    preparo: 'Grelha Forte',
    area: { top: '35%', left: '65%', width: '7%', height: '10%' },
    polygon: '1600,800 1750,1000 1750,1150 1800,1150 1750,800',
  },
  {
    id: '14_maminha',
    label: '14',
    name: 'Maminha',
    description: 'Ponta do alcatra, formato triangular. Muito macia e suculenta, ideal para assar inteira na grelha.',
    doneness: 'Ao Ponto para Mal',
    preparo: 'Espeto / Grelha',
    area: { top: '45%', left: '74%', width: '6%', height: '6%' },
    polygon: '1750,800 1800,1150 1950,1100 2000,950 1900,800',
  },
  {
    id: '15_alcatra',
    label: '15',
    name: 'Alcatra',
    description: 'Corte nobre e versátil, muito macio e com pouca gordura superficial. Rende excelentes bifes e espetos.',
    doneness: 'Ao Ponto para Mal',
    preparo: 'Grelha / Espeto',
    area: { top: '27%', left: '76%', width: '6%', height: '6%' },
    polygon: '1730,400 1700,800 1900,800 2000,950 2050,850 2080,700',
  },
  {
    id: '16_picanha',
    label: '16',
    name: 'Picanha',
    description: 'A estrela do churrasco. Capa de gordura espessa, formato triangular, carne muito macia e de sabor intenso.',
    doneness: 'Ao Ponto para Mal',
    preparo: 'Grelha / Espeto',
    area: { top: '17%', left: '76%', width: '7%', height: '7%' },
    polygon: '1730,400 2080,700 2100,650 2120,450',
  },
  {
    id: '17_patinho',
    label: '17',
    name: 'Patinho',
    description: 'Carne magra da coxa. Muito usada para bifes, moída para dietas ou preparações como kibe cru e tartar.',
    doneness: 'Mal Passado',
    preparo: 'Chapa / Cru',
    area: { top: '56%', left: '78%', width: '6%', height: '8%' },
    polygon: '1900,1350 1950,1100 2000,950 2100,1200 2100,1320',
  },
  {
    id: '18_coxao_mole',
    label: '18',
    name: 'Coxão Mole',
    description: 'Macia e de fibras curtas, ótima para bifes à milanesa, rolês e assados curtos.',
    doneness: 'Ao Ponto',
    preparo: 'Forno / Chapa',
    area: { top: '36%', left: '76%', width: '6%', height: '8%' },
    polygon: '1850,900 2000,800 2080,950 2000,1050 1850,1050',
  },
  {
    id: '19_lagarto',
    label: '19',
    name: 'Lagarto',
    description: 'Cor clara, formato cilíndrico e fibras longas magras. Clássico para carne louca, carpaccio e assados de panela.',
    doneness: 'Cozimento Longo / Fatiado Cru',
    preparo: 'Panela / Carpaccio',
    area: { top: '38%', left: '88%', width: '5%', height: '12%' },
    polygon: '2150,600 2150,1100 2250,1000 2250,650',
  },
  {
    id: '20_coxao_duro',
    label: '20',
    name: 'Coxão Duro',
    description: 'Fibras longas e consistentes. Fica excelente em cozimentos longos ou moído.',
    doneness: 'Cozimento Longo',
    preparo: 'Ensopado',
    area: { top: '26%', left: '84%', width: '6%', height: '10%' },
    polygon: '2080,700 2050,850 2000,950 2100,1200 2100,1320 2200,1320 2300,1000 2200,400 2120,450',
  },
  {
    id: '21_musculo_traseiro',
    label: '21',
    name: 'Músculo Traseiro',
    description: 'No centro dele fica o tutano. Conhecido também como Ossobuco, rico em colágeno, exige longo cozimento.',
    doneness: 'Muito Bem Passado',
    preparo: 'Cozido / Forno Lento',
    area: { top: '73%', left: '81%', width: '5%', height: '10%' },
    polygon: '2100,1320 2200,1320 2200,1680 2050,1680',
  },
  {
    id: 'aba_do_file',
    label: '9',
    name: 'Aba do Filé',
    description: 'Corte da região abdominal, fino e com fibras longas. Muito saboroso na brasa, especialmente quando marinado.',
    doneness: 'Ao Ponto',
    preparo: 'Grelha / Brasa Rápida',
    area: { top: '65%', left: '46%', width: '18%', height: '8%' },
  }
];

const MeatCutsGuide: React.FC = () => {
  const [activeCut, setActiveCut] = useState<Cut | null>(null);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary tracking-widest uppercase text-sm font-bold mb-3">Conheça a Origem</p>
          <h2 className="text-4xl md:text-5xl font-playfair text-white font-bold mb-6">Guia de Cortes</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-white/70 max-w-2xl mx-auto">
            Descubra os segredos por trás dos nossos cortes mais nobres interagindo com o diagrama abaixo.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Diagrama SVG do Boi com Efeitos */}
          <div className="w-full lg:w-3/5 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-black/30 backdrop-blur-sm min-h-[300px] flex items-center justify-center">
              
              {/* Brilho Radial Suave (Spotlight) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0" />

              {/* Partículas de Brasa Restritas a esta área */}
              <div className="absolute inset-0 z-0 opacity-100">
                <EmberParticles />
              </div>

              {/* SVG do Boi */}
              <div className="relative z-10 w-full">
                <BoiCortesSVG 
                  activeCutId={activeCut?.id} 
                  onCutHover={(id) => {
                    const cut = cuts.find((c) => c.id === id);
                    if (cut) setActiveCut(cut);
                  }} 
                  onCutLeave={() => {
                    setActiveCut(null);
                  }}
                  onCutClick={(id) => {
                    const cut = cuts.find((c) => c.id === id);
                    if (cut) setActiveCut(cut);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Painel de Informações */}
          <div className="w-full lg:w-2/5 min-h-[350px]">
            {activeCut ? (
              <div className="bg-black/40 backdrop-blur-md border border-primary/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
                
                <h3 className="text-3xl font-playfair text-primary font-bold mb-2">{activeCut.name}</h3>
                <div className="w-12 h-0.5 bg-white/20 mb-6" />
                
                <p className="text-white/80 leading-relaxed mb-8 text-lg">
                  {activeCut.description}
                </p>
                
                <div className="bg-secondary/50 rounded-xl p-5 border border-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Flame className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Preparo Ideal</p>
                      <p className="text-white font-medium">{activeCut.preparo}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ChefHat className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Ponto Recomendado</p>
                      <p className="text-white font-medium">{activeCut.doneness}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-secondary/10 rounded-2xl border border-white/5 border-dashed min-h-[350px]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Info className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Interaja com o Diagrama</h3>
                <p className="text-white/50 max-w-sm">
                  Passe o mouse ou clique nas regiões do boi para descobrir os detalhes de cada corte premium.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MeatCutsGuide;
