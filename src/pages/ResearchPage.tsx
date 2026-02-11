import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import {
  FileText,
  TrendingUp,
  Globe2,
  Monitor,
  Search,
  BookOpen,
  Presentation,
  ArrowRight,
  ChevronDown,
  Quote,
  Newspaper
} from "lucide-react";
import researchImg from "@/assets/researchheadv2.png";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const RESEARCH_HERO_BG =
  "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop";

const ResearchPage = () => {
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
      baseColor: [0.8, 0.1, 0.1], // Mantendo o vermelho do ITIC
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
      icon: Globe2,
      title: "Macroeconomic Analysis",
      desc: "We decode the economy by diving into real macroeconomic reports, policy decisions, and geopolitical events to understand what drives global markets."
    },
    {
      icon: TrendingUp,
      title: "Industry Reports",
      desc: "We explore cutting-edge industry reports to spot emerging trends, structural shifts, and sector-specific opportunities before they go mainstream."
    },
    {
      icon: Search,
      title: "Equity Research",
      desc: "We break down company financials and business models to learn how to think like professional analysts, producing institutional-grade equity reports."
    },
    {
      icon: Monitor,
      title: "Bloomberg Expertise",
      desc: "We get hands-on experience with the Bloomberg Terminal—the financial world's most powerful tool—to gather data and screen for opportunities."
    }
  ];

  const tools = [
    { name: "Bloomberg Terminal", icon: Monitor },
    { name: "Macro Reports", icon: Newspaper },
    { name: "Financial Modeling", icon: TrendingUp },
    { name: "Presentations", icon: Presentation }
  ];

  const scrollToContent = () => {
    const element = document.getElementById("head-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PageTransition>
      {/* Container principal com overflow-x-hidden para evitar scroll lateral */}
      <div className="min-h-screen bg-white font-sans overflow-x-hidden">
        <Navbar />

        <main>
          {/* HERO SECTION */}
          {/* Ajustado para 100dvh e padding responsivo */}
          <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-24 pb-12 lg:pt-20 lg:pb-20">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={RESEARCH_HERO_BG}
                alt="Global Markets"
                className="w-full h-full object-cover grayscale opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-grow flex flex-col justify-center pb-24">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white border border-red-700 mb-6 shadow-lg shadow-red-900/20">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Department
                    </span>
                  </div>

                  {/* Título Responsivo */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                    Research <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                      Department
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 border-l-0 lg:border-l-4 border-red-600 lg:pl-6 px-2 lg:px-0">
                    We decode the economy. From macro trends to company specifics, 
                    we produce reports that allow members to understand the 
                    financial world using professional tools.
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {[
                      "Macroeconomics",
                      "Equity Research",
                      "Bloomberg Terminal",
                      "Industry Trends"
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

                {/* Globo com altura responsiva */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center pointer-events-none select-none mt-8 lg:mt-0"
                >
                  <div className="relative w-full max-w-[400px] md:max-w-[600px] aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-600/20 rounded-full blur-[80px] md:blur-[120px] transform scale-110" />
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

            {/* CORREÇÃO DO BOTÃO "MEET THE TEAM" */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
              className="absolute bottom-24 lg:bottom-28 left-1/2 -translate-x-1/2 z-30 cursor-pointer hidden md:flex"
              onClick={scrollToContent}
            >
              <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-red-600 transition-colors bg-white/50 backdrop-blur-sm p-2 rounded-xl border border-white/20">
                <span className="text-xs font-bold uppercase tracking-widest">
                  Meet the Team
                </span>
                <ChevronDown className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Barra de Ferramentas - Responsiva */}
            <div className="absolute bottom-0 w-full bg-gray-900 border-t border-gray-800 py-4 md:py-6 z-20">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8 opacity-90">
                  {tools.map((tool, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 md:gap-3 text-gray-400 group hover:text-white transition-colors"
                    >
                      <tool.icon className="w-4 h-4 md:w-5 md:h-5 group-hover:text-red-500 transition-colors" />
                      <span className="font-mono text-xs md:text-sm lg:text-base font-medium whitespace-nowrap">
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
            className="py-16 md:py-24 bg-white relative overflow-hidden"
          >
            {/* Background Decor - Ajustado para evitar overflow */}
            <div className="absolute top-0 right-0 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-red-50 rounded-full blur-[60px] md:blur-[100px] opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-5 relative group w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none"
                >
                  <div className="relative aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100">
                    <img
                      src={researchImg}
                      alt="João Vitor"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                      <div className="w-12 h-1 bg-red-500 mb-4 rounded-full" />
                      <p className="text-gray-300 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1">
                        Head of Research
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold">João Vitor</h2>
                    </div>
                  </div>
                  
                  {/* Decorative Elements - Hidden on mobile */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-600 rounded-[1.5rem] -z-10 hidden sm:block" />
                  <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gray-100 rounded-[2rem] -z-10 hidden sm:block" />
                </motion.div>

                {/* Text Side */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7 space-y-8 md:space-y-10"
                >
                  <div>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 md:mb-8 text-center lg:text-left">
                      Deep Dive into <br /> Global Markets
                    </h3>
                    
                    <div className="relative pl-6 md:pl-8 border-l-4 border-red-500 max-w-xl mx-auto lg:mx-0">
                      <Quote className="absolute -top-4 -left-6 text-red-100 w-10 h-10 md:w-12 md:h-12 -z-10 fill-red-50" />
                      <p className="text-lg md:text-xl text-gray-800 italic leading-relaxed mb-6 font-medium">
                        "At the Research Department, our analysts produce industry, equity and macro reports that allow them to understand how companies and business operate while using the Bloomberg Terminal to do the reports, which is an important financial tool."
                      </p>
                    </div>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed text-justify lg:text-left">
                      João Vitor leads the department with a focus on comprehensive market analysis. Under his guidance, members learn to synthesize complex economic data into clear, actionable insights using professional standards.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 md:gap-6 pt-8 border-t border-gray-100 text-center lg:text-left">
                    <div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">3</div>
                      <div className="text-[10px] md:text-xs text-red-600 font-bold uppercase tracking-wider mt-1">Report Types</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Macro</div>
                      <div className="text-[10px] md:text-xs text-red-600 font-bold uppercase tracking-wider mt-1">Focus Area</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">10+</div>
                      <div className="text-[10px] md:text-xs text-red-600 font-bold uppercase tracking-wider mt-1">Analysts</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PROCESS SECTION - Timeline Layout */}
          <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 md:mb-20">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                  The Research Cycle
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                  From raw data collection to institutional-grade publication.
                </p>
              </div>

              <div className="relative max-w-6xl mx-auto">
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 rounded-full" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {[
                    {
                      step: "01",
                      title: "Data Gathering",
                      text: "We leverage the Bloomberg Terminal and official sources to collect real-time data on macroeconomics, industries, and company financials."
                    },
                    {
                      step: "02",
                      title: "Analysis & Synthesis",
                      text: "Analysts connect the dots between global events and market reactions, applying financial modeling and critical thinking to form a view."
                    },
                    {
                      step: "03",
                      title: "Publication",
                      text: "Insights are structured into professional reports (Equity, Macro, Industry) and presented to the club and external partners."
                    }
                  ].map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="relative pt-0 md:pt-10"
                    >
                      {/* Timeline Dot (Desktop Only) */}
                      <div className="hidden md:flex absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full items-center justify-center ring-8 ring-gray-50 z-10 shadow-sm">
                         <span className="w-2 h-2 bg-white rounded-full" />
                      </div>

                      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center group">
                        <div className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 group-hover:text-red-50 transition-colors">
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
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                    Core Functions
                  </h2>
                  <div className="w-20 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {activities.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4 }}
                      className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-red-900/5 hover:border-red-100 transition-all duration-300 group flex flex-col sm:flex-row items-start gap-6"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors duration-300">
                        <item.icon className="w-6 h-6 md:w-7 md:h-7 text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
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

export default ResearchPage;