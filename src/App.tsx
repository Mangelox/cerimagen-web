import { useState, useMemo } from 'react';
import { Camera, BookOpen, Star, ChevronRight, Send, Check, Image as ImageIcon, Heart } from 'lucide-react';

// --- Configuration Types ---
type BookSize = {
  id: string;
  label: string;
  width: number;
  height: number;
  basePrice: number;
  pricePerSheet: number;
};

// --- Pricing Model ---
const SIZES: BookSize[] = [
  { id: '5x7', label: '5 x 7"', width: 5, height: 7, basePrice: 15, pricePerSheet: 2.0 },
  { id: '6x8', label: '6 x 8"', width: 6, height: 8, basePrice: 18, pricePerSheet: 2.5   },
  { id: '8x10', label: '8 x 10"', width: 8, height: 10, basePrice: 25, pricePerSheet: 3.0 },
  { id: '8x12', label: '8 x 12"', width: 8, height: 12, basePrice: 35, pricePerSheet: 4.5 },
  { id: '10x12', label: '10 x 12"', width: 10, height: 12, basePrice: 45, pricePerSheet: 6.0 },
];

const MIN_SHEETS = 0;
const MAX_SHEETS = 24;

const App = () => {
  const [selectedSize, setSelectedSize] = useState<BookSize>(SIZES[2]); // Default 8x10
  const [sheets, setSheets] = useState<number>(20);

  // --- Calculations ---
  const totalPrice = useMemo(() => {
    return selectedSize.basePrice + (sheets * selectedSize.pricePerSheet);
  }, [selectedSize, sheets]);

  // --- WhatsApp Handler ---
  const handleWhatsAppClick = () => {
    const phoneNumber = "+5351110501"; // Replace with real studio number
    const message = `Hola Cerimagen! 📸\n\nEstoy interesado en un PhotoBook con las siguientes especificaciones:\n\n📖 Tamaño: ${selectedSize.label}\n📄 Hojas: ${sheets}\n💰 Precio Estimado: $${totalPrice.toFixed(2)}\n\n¿Me podrían dar más información sobre cómo enviar mis fotos?`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Helper for slider percentage
  const sliderPercentage = ((sheets - MIN_SHEETS) / (MAX_SHEETS - MIN_SHEETS)) * 100;

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-20 py-6 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Camera className="text-amber-500 w-6 h-6" />
          <span className="text-2xl font-bold tracking-widest text-white">CERIMAGEN</span>
        </div>
        <button 
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          className="hidden md:block px-6 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-slate-900 transition-all duration-300"
        >
          Cotizar Ahora
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
            alt="Wedding Photobook" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-amber-500 tracking-[0.2em] text-sm uppercase font-bold mb-4 block animate-fade-in">
            Impresión Profesional de Fotografía
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Tus recuerdos merecen <br />
            <span className="italic font-serif text-amber-400">ser eternos.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-light">
            Diseñamos PhotoBooks de calidad de museo. Impresión fine-art, encuadernación artesanal y acabados de lujo para tus momentos más preciados.
          </p>
          <button 
            onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-amber-600 font-semibold text-white transition-all duration-200 hover:bg-amber-500 hover:scale-105 rounded-full"
          >
            <span>Diseña tu Álbum</span>
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Features Marketing Section */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          <div className="flex flex-col items-center text-center p-6 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
            <div className="bg-slate-800 p-4 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Apertura Layflat 180°</h3>
            <p className="text-slate-400 leading-relaxed">
              Nuestras páginas se abren completamente planas, permitiendo que tus fotos panorámicas luzcan espectaculares.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
            <div className="bg-slate-800 p-4 rounded-full mb-6">
              <ImageIcon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Papel Fine Art</h3>
            <p className="text-slate-400 leading-relaxed">
              Impresión en papel especial, calidad de archivo y laminado. Colores vibrantes y negros profundos que duran generaciones.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
            <div className="bg-slate-800 p-4 rounded-full mb-6">
              <Star className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Acabados Premium</h3>
            <p className="text-slate-400 leading-relaxed">
              Portadas personalizadas, estudio o fotográficas. Cada detalle es revisado manualmente por nuestro personal.
            </p>
          </div>

        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section id="calculator" className="py-24 px-4 bg-slate-950 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-900 to-transparent opacity-50"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Controls */}
          <div className="w-full lg:w-3/5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Cotiza tu PhotoBook</h2>
              <p className="text-slate-400 text-lg">Personaliza las dimensiones y la cantidad de páginas para obtener un precio instantáneo.</p>
            </div>

            {/* Size Selector */}
            <div className="space-y-6">
              <h3 className="text-amber-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                1. Elige el tamaño (Pulgadas)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      relative p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 group h-full
                      ${selectedSize.id === size.id 
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                        : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:bg-slate-800'}
                    `}
                  >
                    {/* Visual representation of the Book Shape */}
                    <div 
                      className="flex items-center justify-center bg-slate-200/5 transition-all duration-500 relative"
                      style={{ 
                        width: `${size.width * 8}px`, 
                        height: `${size.height * 8}px`,
                        maxHeight: '90px',
                        maxWidth: '100%',
                        aspectRatio: `${size.width}/${size.height}`,
                        borderRadius: '2px 6px 6px 2px',
                        borderLeft: `4px solid ${selectedSize.id === size.id ? '#f59e0b' : '#64748b'}`, // Dynamic spine color
                        boxShadow: '2px 4px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {/* Photo/Icon Placeholder inside the "Book" */}
                      <div className="absolute inset-1 border border-white/10 rounded-sm flex items-center justify-center overflow-hidden">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedSize.id === size.id ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-700/50 text-slate-600'}`}>
                           <ImageIcon size={14} />
                         </div>
                      </div>
                    </div>

                    <span className="font-semibold text-lg">{size.label}</span>
                    
                    {selectedSize.id === size.id && (
                      <div className="absolute top-3 right-3 animate-scale-in">
                        <Check className="w-5 h-5 text-amber-500" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sheets Slider */}
            <div className="space-y-8 pt-6">
              <div className="flex justify-between items-end">
                <h3 className="text-amber-500 font-bold uppercase tracking-wider text-sm">
                  2. Cantidad de Hojas Adicionales
                </h3>
                <h6>
                  <span className="text-slate-400 text-sm">Nota: Una Hoja = 1 Página = 2 Fotos </span>
                </h6>
              </div>
              
              <div className="relative h-14 flex items-center justify-center">
                {/* Visual Track (Background & Fill) */}
                <div className="absolute w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 pointer-events-none">
                  {/* Fill Gradient */}
                  <div 
                    className="h-full bg-gradient-to-r from-amber-800 to-amber-500 transition-all duration-75 ease-out"
                    style={{ width: `${sliderPercentage}%` }}
                  ></div>
                </div>

                {/* Ticks/Markers (Visual only) */}
                <div className="absolute w-full flex justify-between px-[10px] pointer-events-none z-10 top-1/2 -translate-y-1/2 h-1">
                   {Array.from({length: 8}).map((_, i) => (
                      <div key={i} className="w-0.5 h-full bg-white/10"></div>
                   ))}
                </div>

                {/* Styled Native Input */}
                <input 
                  type="range" 
                  min={MIN_SHEETS} 
                  max={MAX_SHEETS} 
                  step={2}
                  value={sheets}
                  onChange={(e) => setSheets(parseInt(e.target.value))}
                  className="custom-range"
                  aria-label="Cantidad de hojas"
                />

                {/* Floating Tooltip (Visual only, follows calculation) */}
                <div 
                  className="absolute bottom-full mb-1 bg-amber-500 text-slate-900 font-bold text-sm px-3 py-1 rounded-lg shadow-lg whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-amber-500 transition-all duration-75 pointer-events-none z-40"
                  style={{ left: `${sliderPercentage}%`, transform: 'translateX(-50%)' }}
                >
                    {sheets} Hojas
                </div>
              </div>
              
              <div className="flex justify-between text-slate-500 text-sm font-medium">
                <span>{MIN_SHEETS} hojas</span>
                <span className="text-amber-500/50">{Math.round((MAX_SHEETS + MIN_SHEETS) / 2)} hojas</span>
                <span>{MAX_SHEETS} hojas</span>
              </div>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="w-full lg:w-2/5 sticky top-24">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-2xl font-serif text-white mb-8 pb-4 border-b border-slate-800">Resumen del Pedido</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Modelo</span>
                  <span className="font-semibold text-white">{selectedSize.label} Premium</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Precio Base (12 Fotos)</span>
                  <span>${selectedSize.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Hojas Adicionales ({sheets})</span>
                  <span>${(sheets * selectedSize.pricePerSheet).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl flex justify-between items-center mb-8 border border-slate-700">
                <span className="text-slate-400">Total Estimado</span>
                <span className="text-4xl font-bold text-amber-500">${totalPrice.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-[#25D366]/20 transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5" />
                <span>Ordenar por WhatsApp</span>
              </button>
              
              <p className="text-center text-xs text-slate-500 mt-4">
                *El precio final puede variar según materiales de portada extra o envío.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Camera className="text-amber-500 w-5 h-5" />
            <span className="text-xl font-bold tracking-widest text-white">CERIMAGEN</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Cerimagen. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors"><Heart className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;