import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { 
  Users, Megaphone, Handshake, Award, Layout, Share2, 
  Calendar, Mail, ArrowRight, ChevronDown 
} from "lucide-react";
import operationsImg from "@/assets/operationsheadv2.png";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

// Imagem de fundo temática (Teamwork/Events/Collaboration)
const OPS_HERO_BG = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop";

const OperationsPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configuração do Globo (Estético)
  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
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
      baseColor: [0.8, 0.1, 0.1], // Vermelho ITIC
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
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const activities = [
    {
      icon: Megaphone,
      title: "Brand & Communication",
      desc: "The voice of ITIC. We manage external messaging, social media strategy, and ensure brand consistency across all platforms."
    },
    {
      icon: Users,
      title: "Talent Acquisition",
      desc: "Finding the best. We structure rigorous recruitment processes, from screening to interviews, ensuring cultural and technical fit."
    },
    {
      icon: Handshake,
      title: "Strategic Partnerships",
      desc: "Building bridges. We manage relationships with corporate partners, alumni, and other student organizations to create value."
    },
    {
      icon: Award,
      title: "Member Experience",
      desc: "Cultivating excellence. We organize team-building events, manage internal feedback loops, and ensure a thriving club culture."
    }
  ];

  const tools = [
    { name: "Notion Systems", icon: Layout },
    { name: "LinkedIn Recruiter", icon: Share2 },
    { name: "Event Management", icon: Calendar },
    { name: "Internal Comms", icon: Mail },
  ];

  const scrollToContent = () => {
    const element = document.getElementById('head-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main>
          
          {/* --- HERO SECTION --- */}
          <section className="relative h-screen flex flex-col justify-center overflow-hidden">
            
            {/* Background com Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img src={OPS_HERO_BG} alt="Team Collaboration" className="w-full h-full object-cover grayscale opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
            </div>

            {/* Conteúdo Central */}
            <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center pb-32">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Texto */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl" 
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white border border-red-700 mb-6 shadow-lg shadow-red-900/20">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Department</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                    Operations & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                      Member Experience
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-red-600 pl-6">
                    The engine behind the club. We oversee recruitment, internal organization, partnerships, and brand strategy.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {["Talent Management", "Branding", "Event Planning", "Networking"].map((tag, i) => (
                      <span key={i} className="px-4 py-2 bg-white/50 backdrop-blur-sm text-gray-700 font-semibold rounded-lg text-sm border border-gray-200 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* GLOBO DECORATIVO */}
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
                        width: '100%', 
                        height: '100%', 
                        opacity: 0.8,
                        transition: 'opacity 1s ease',
                        filter: 'drop-shadow(0 0 40px rgba(220, 38, 38, 0.5))'
                      }}
                    />
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Scroll Button */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
              onClick={scrollToContent}
            >
              <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-red-600 transition-colors bg-white/50 backdrop-blur-sm p-2 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-widest">Meet the Team</span>
                <ChevronDown className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Tech Stack Strip */}
            <div className="absolute bottom-0 w-full bg-gray-900 border-t border-gray-800 py-6 z-20">
               <div className="container mx-auto px-4">
                  <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-90">
                     {tools.map((tool, i) => (
                       <div key={i} className="flex items-center gap-3 text-gray-400 group hover:text-white transition-colors">
                         <tool.icon className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                         <span className="font-mono text-sm md:text-base font-medium">{tool.name}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </section>

          {/* --- HEAD OF DEPARTMENT --- */}
          <section id="head-section" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-5 relative"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={operationsImg}
                      alt="Margarida Balau"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute bottom-8 left-8 text-white">
                      <p className="text-red-400 font-bold uppercase tracking-widest text-sm mb-1">Head of Operations</p>
                      <h2 className="text-4xl font-bold">Margarida Balau</h2>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-600 rounded-2xl -z-10" />
                  <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gray-100 rounded-2xl -z-10" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7 space-y-8"
                >
                  <div>
                    <h3 className="text-3xl font-heading font-bold text-gray-900 mb-6">Building Culture & Excellence</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      "A financial club is only as strong as its community. Our goal in Operations is to ensure that every member feels integrated, motivated, and empowered to contribute. We are the glue that holds ITIC together."
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Margarida ensures smooth execution of all club activities, from large-scale recruitment drives to exclusive networking events with top-tier firms. She bridges the gap between strategy and execution.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                    <div>
                      <div className="text-3xl font-bold text-red-600">3+</div>
                      <div className="text-sm text-gray-500 font-medium uppercase">Years Exp.</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-red-600">Culture</div>
                      <div className="text-sm text-gray-500 font-medium uppercase">Specialty</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-red-600">50+</div>
                      <div className="text-sm text-gray-500 font-medium uppercase">Members Mgd</div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* --- METHODOLOGY (PROCESS) --- */}
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Operational Cycle</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We treat the club like a company. Every event and process follows a structured path.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  { step: "01", title: "Strategize", text: "We plan the semester's calendar, defining key recruitment goals and brand positioning targets." },
                  { step: "02", title: "Connect", text: "We engage with students and corporate partners, managing communication channels effectively." },
                  { step: "03", title: "Elevate", text: "We gather feedback and refine internal processes to constantly improve the member experience." }
                ].map((phase, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-red-200 transition-all">
                    <div className="text-8xl font-bold text-gray-100 absolute -top-4 -right-4 select-none group-hover:text-red-50 transition-colors">
                      {phase.step}
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{phase.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{phase.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- ACTIVITIES GRID --- */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Core Deliverables</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {activities.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                        <item.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- RECRUITMENT CALLOUT --- */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold">Join the Operations Team</h2>
                <p className="text-gray-400 text-lg">
                  Are you organized, creative, and a people person? Help us build the brand and culture of the most prestigious finance club at ISCTE.
                </p>
                <div className="pt-4">
                  <a href="/contact" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all">
                    Apply for Operations <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
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

export default OperationsPage;