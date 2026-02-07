import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// --- COMPONENTES AUXILIARES ---

// 1. Ticker (Mantido com os mesmos dados)
const TickerTape = () => {
  const items = [
    { symbol: "S&P 500", val: "5,234.12", change: "+0.45%", up: true },
    { symbol: "NASDAQ", val: "16,428.80", change: "+0.82%", up: true },
    { symbol: "BTC/USD", val: "68,420.50", change: "+1.24%", up: true },
    { symbol: "EUR/USD", val: "1.0845", change: "-0.12%", up: false },
    { symbol: "GOLD", val: "2,345.10", change: "+0.30%", up: true },
    { symbol: "CRUDE OIL", val: "78.45", change: "-0.85%", up: false },
    { symbol: "TSLA", val: "175.30", change: "+2.10%", up: true },
    { symbol: "NVDA", val: "942.80", change: "+1.55%", up: true },
    { symbol: "PSI 20", val: "6,240.10", change: "+0.15%", up: true }
  ];

  return (
    // Removido o backdrop-blur e a transparência excessiva já que o fundo agora é branco sólido
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 py-3 overflow-hidden flex z-20 shadow-sm">
      <motion.div
        className="flex space-x-16 whitespace-nowrap"
        animate={{ x: [0, -1500] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-xs font-mono tracking-wider">
            <span className="text-gray-900 font-bold">{item.symbol}</span>
            <span className="text-gray-500">{item.val}</span>
            <span className={`flex items-center ${item.up ? 'text-green-600' : 'text-red-600'}`}>
              {item.up ? '▲' : '▼'} {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const Hero = () => {
  return (
    // A secção já tem bg-white, por isso ao remover a imagem fica o fundo branco limpo
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      
      {/* --- CONTEÚDO PRINCIPAL --- */}
      {/* Removi a div 'absolute inset-0 z-0' que continha a imagem e o overlay */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Badge de Fundação */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {/* Removido backdrop-blur pois não há imagem atrás */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-100 shadow-sm text-xs font-semibold text-red-700 uppercase tracking-widest hover:border-red-200 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Est. 2017 | Lisbon, Portugal
            </div>
          </motion.div>

          {/* Título Principal */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-gray-900 leading-[1.1] tracking-tight drop-shadow-sm"
            >
              ISCTE Trading & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-900">
                Investment Club
              </span>
            </motion.h1>
          </div>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Empowering ambitious ISCTE students to master the world of finance, trading and investments through rigorous analysis and real-world practice.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
          >
            <Link to="/about">
              <button className="h-12 px-8 rounded-full bg-gray-900 text-white font-semibold text-sm hover:bg-red-700 transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-red-600/20 transform hover:-translate-y-0.5">
                Explore Departments
              </button>
            </Link>
            <Link to="/reports" className="group flex items-center gap-2 text-gray-600 hover:text-red-700 transition-colors text-sm font-medium">
              Read Market Reports <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-200 mt-16 max-w-4xl mx-auto"
          >
            {[
              { label: "Years Active", value: "7+" },
              { label: "Active Members", value: "50+" },
              { label: "Departments", value: "4" },
              { label: "Community", value: "Growing" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="text-3xl font-bold text-gray-900 font-heading">{stat.value}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <TickerTape />
    </section>
  );
};

export default Hero;