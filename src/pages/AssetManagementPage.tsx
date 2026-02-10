import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import {
  PieChart,
  Search,
  BarChart3,
  Calculator,
  Activity,
  Monitor,
  FileSpreadsheet,
  Presentation,
  ArrowRight,
  ChevronDown,
  Quote
} from "lucide-react";
import assetmImg from "@/assets/assetm-head.png";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const AM_HERO_BG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

const AssetManagementPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: 6,
      baseColor: [0.8, 0.1, 0.1],
      markerColor: [0.8, 0.1, 0.1],
      glowColor: [1, 0.5, 0.5],
      opacity: 0.6,
      markers: [],
      onRender: (state) => {
        phi += 0.003;
        state.phi = phi;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const activities = [
    {
      icon: Search,
      title: "Market Screening",
      desc: "Regular screening of global markets to track trends, sector rotations and emerging opportunities using macro and financial indicators."
    },
    {
      icon: BarChart3,
      title: "Equity Research",
      desc: "In-depth company and sector analysis. We study financial statements, earnings and competitive positioning to build robust investment cases."
    },
    {
      icon: Calculator,
      title: "Valuation Models",
      desc: "Application of discounted cash flow and relative valuation techniques to estimate intrinsic value and support investment decisions."
    },
    {
      icon: PieChart,
      title: "Portfolio Management",
      desc: "Construction of diversified portfolios through asset allocation, position sizing and continuous rebalancing based on risk and return objectives."
    }
  ];

  const tools = [
    { name: "Market Screening", icon: Monitor },
    { name: "Excel Modeling", icon: FileSpreadsheet },
    { name: "Financial Reporting", icon: Activity },
    { name: "Pitch Decking", icon: Presentation }
  ];

  const scrollToContent = () => {
    const element = document.getElementById("head-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white font-sans">
        <Navbar />

        <main>
          {/* HERO SECTION */}
          <section className="relative h-screen flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={AM_HERO_BG}
                alt="Modern Architecture"
                className="w-full h-full object-cover grayscale opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center pb-32">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white border border-red-700 mb-6 shadow-lg shadow-red-900/20">
                    <PieChart className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Department
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                    Asset <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                      Management
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-red-600 pl-6">
                    This department focuses on financial analysis, portfolio
                    construction and active asset management, providing members
                    with hands-on investment experience.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "Financial Analysis",
                      "Valuation",
                      "Portfolio Construction",
                      "Active Management"
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/50 backdrop-blur-sm text-gray-700 font-semibold rounded-lg text-sm border border-gray-200 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative w-full h-[500px] flex items-center justify-center pointer-events-none select-none"
                >
                  <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-600/20 rounded-full blur-[120px] transform scale-110" />
                    <canvas
                      ref={canvasRef}
                      style={{
                        width: "100%",
                        height: "100%",
                        opacity: 0.8,
                        transition: "opacity 1s ease",
                        filter:
                          "drop-shadow(0 0 40px rgba(220, 38, 38, 0.5))"
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
              onClick={scrollToContent}
            >
              <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-red-600 transition-colors bg-white/50 backdrop-blur-sm p-2 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-widest">
                  Meet the Team
                </span>
                <ChevronDown className="w-6 h-6" />
              </div>
            </motion.div>

            <div className="absolute bottom-0 w-full bg-gray-900 border-t border-gray-800 py-6 z-20">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-90">
                  {tools.map((tool, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-400 group hover:text-white transition-colors"
                    >
                      <tool.icon className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                      <span className="font-mono text-sm md:text-base font-medium">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* HEAD OF DEPARTMENT */}
          <section
            id="head-section"
            className="py-24 bg-white relative overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-[100px] opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-5 relative group"
                >
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100">
                    <img
                      src={assetmImg}
                      alt="Vasco Fontes"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-8 left-8 text-white">
                      <div className="w-12 h-1 bg-red-500 mb-4 rounded-full" />
                      <p className="text-gray-300 font-bold uppercase tracking-widest text-xs mb-1">
                        Head of Asset Management
                      </p>
                      <h2 className="text-3xl font-bold">Vasco Fontes</h2>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-600 rounded-[1.5rem] -z-10" />
                  <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gray-100 rounded-[2rem] -z-10" />
                </motion.div>

                {/* Text Side */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7 space-y-10"
                >
                  <div>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">
                      From Analysis to <br /> Portfolio Decisions
                    </h3>
                    
                    <div className="relative pl-8 border-l-4 border-red-500">
                      <Quote className="absolute -top-4 -left-6 text-red-100 w-12 h-12 -z-10 fill-red-50" />
                      <p className="text-xl text-gray-800 italic leading-relaxed mb-6 font-medium">
                        "The Asset Management Department is built around disciplined analysis and structured decision-making. Our goal is to transform financial data and company research into well-founded investment ideas."
                      </p>
                    </div>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      Vasco leads the department with a strong focus on equity analysis, valuation and portfolio construction, ensuring that members gain hands-on experience in active asset management.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                    <div>
                      <div className="text-4xl font-bold text-gray-900">1+</div>
                      <div className="text-xs text-red-600 font-bold uppercase tracking-wider mt-1">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-gray-900">Valuation</div>
                      <div className="text-xs text-red-600 font-bold uppercase tracking-wider mt-1">Core Specialty</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-gray-900">10+</div>
                      <div className="text-xs text-red-600 font-bold uppercase tracking-wider mt-1">Team Members</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PROCESS SECTION - Timeline Layout */}
          <section className="py-24 bg-gray-50 border-y border-gray-200">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  The Investment Process
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  From idea generation to portfolio inclusion, every asset goes through a rigorous workflow.
                </p>
              </div>

              <div className="relative max-w-6xl mx-auto">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 rounded-full" />

                <div className="grid md:grid-cols-3 gap-12">
                  {[
                    {
                      step: "01",
                      title: "Idea Generation",
                      text: "We screen markets regularly to identify trends, sector opportunities and potential investment ideas using financial and macro indicators."
                    },
                    {
                      step: "02",
                      title: "Valuation Analysis",
                      text: "We build equity research on companies and sectors, apply valuation models such as DCF and relative multiples, and assess business quality."
                    },
                    {
                      step: "03",
                      title: "Portfolio Construction",
                      text: "Selected ideas are combined into diversified portfolios, with continuous monitoring, rebalancing and performance evaluation."
                    }
                  ].map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="relative pt-10"
                    >
                      {/* Timeline Dot */}
                      <div className="hidden md:flex absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full items-center justify-center ring-8 ring-gray-50 z-10 shadow-sm">
                         <span className="w-2 h-2 bg-white rounded-full" />
                      </div>

                      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center group">
                        <div className="text-5xl font-bold text-gray-100 mb-6 group-hover:text-red-50 transition-colors">
                          {phase.step}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                          {phase.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {phase.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CORE FUNCTIONS */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                    Core Functions
                  </h2>
                  <div className="w-20 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {activities.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-red-900/5 hover:border-red-100 transition-all duration-300 group flex items-start gap-6"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors duration-300">
                        <item.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default AssetManagementPage;