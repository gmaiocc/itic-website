import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// --- TIPO DE DADOS ---
type TickerItem = {
  symbol: string;
  val: string;
  change: string;
  up: boolean;
  apiSymbol: string; // Símbolo para a API da Binance
};

// --- COMPONENTE TICKER (APENAS DADOS REAIS) ---
const TickerTape = () => {
  // Estado Inicial apenas com ativos REAIS disponíveis na API pública
  const [items, setItems] = useState<TickerItem[]>([
    { symbol: "BTC/USD", val: "Loading...", change: "0.00%", up: true, apiSymbol: "BTCUSDT" },
    { symbol: "ETH/USD", val: "Loading...", change: "0.00%", up: true, apiSymbol: "ETHUSDT" },
    { symbol: "SOL/USD", val: "Loading...", change: "0.00%", up: true, apiSymbol: "SOLUSDT" },
    { symbol: "BNB/USD", val: "Loading...", change: "0.00%", up: true, apiSymbol: "BNBUSDT" },
    { symbol: "EUR/USD", val: "Loading...", change: "0.00%", up: true, apiSymbol: "EURUSDT" }, // Euro vs Dólar
    { symbol: "GOLD (PAXG)", val: "Loading...", change: "0.00%", up: true, apiSymbol: "PAXGUSDT" }, // Paxos Gold (Preço real do ouro tokenizado)
  ]);

  useEffect(() => {
    // FUNÇÃO PARA BUSCAR DADOS REAIS (Binance)
    const fetchRealData = async () => {
      try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
        const data = await res.json();

        setItems(prevItems => prevItems.map(item => {
          const marketData = data.find((d: any) => d.symbol === item.apiSymbol);
          if (marketData) {
            const price = parseFloat(marketData.lastPrice);
            const change = parseFloat(marketData.priceChangePercent);
            
            // Formatação: 4 casas decimais para Forex (EUR), 2 para o resto
            const minimumDigits = item.symbol.includes("EUR") ? 4 : 2;
            
            const formattedPrice = price.toLocaleString('en-US', { 
              minimumFractionDigits: minimumDigits, 
              maximumFractionDigits: minimumDigits 
            });

            return {
              ...item,
              val: formattedPrice,
              change: `${change > 0 ? '+' : ''}${change.toFixed(2)}%`,
              up: change >= 0
            };
          }
          return item;
        }));
      } catch (error) {
        console.error("Erro ao atualizar Ticker:", error);
      }
    };

    // Atualização Inicial
    fetchRealData();

    // Atualizar a cada 5 segundos
    const realDataInterval = setInterval(fetchRealData, 5000);

    return () => clearInterval(realDataInterval);
  }, []);

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 py-3 overflow-hidden flex z-20 shadow-sm h-12">
      <motion.div
        className="flex space-x-16 whitespace-nowrap items-center"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {/* Renderiza a lista 4 vezes para criar o loop infinito visual fluido (já que a lista é menor agora) */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs font-mono tracking-wider min-w-fit">
            <span className="text-gray-900 font-bold">{item.symbol}</span>
            <span className="text-gray-600 tabular-nums">{item.val}</span>
            <span className={`flex items-center tabular-nums ${item.up ? 'text-green-600' : 'text-red-600'}`}>
              {item.up ? '▲' : '▼'} {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- COMPONENTE HERO ---
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      
      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Badge de Fundação */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
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

          {/* Stats Grid - CENTRADO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-12 md:gap-24 pt-16 border-t border-gray-200 mt-16 max-w-4xl mx-auto"
          >
            {[
              { label: "Years Active", value: "7+" },
              { label: "Active Members", value: "50+" },
              { label: "Departments", value: "4" },
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