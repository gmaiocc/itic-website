import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Linkedin, Quote, Building2, Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Imagem de fundo (City/Finance District)
const ALUMNI_HERO_BG = "https://images.unsplash.com/photo-1444653614773-995cb1ef902a?q=80&w=2076&auto=format&fit=crop";

// Dados dos Alumni (Exemplo)
const alumniStories = [
  {
    name: "Ricardo Silva",
    role: "Investment Banking Analyst",
    company: "J.P. Morgan",
    location: "London, UK",
    quote: "ITIC gave me the technical foundation and the network I needed to break into London's banking scene.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Beatriz Costa",
    role: "Consultant",
    company: "Deloitte",
    location: "Lisbon, PT",
    quote: "The soft skills and leadership experience I gained as Head of Operations were invaluable for my consulting career.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "Tiago Mendes",
    role: "Equity Research Associate",
    company: "CaixaBI",
    location: "Lisbon, PT",
    quote: "Writing weekly reports at ITIC simulated the real pressure of a research desk. It was the perfect preparation.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
  }
];

// Empresas onde estão (Placeholder logos - usar texto estilizado se não tiver logos)
const companies = [
  "J.P. Morgan", "Goldman Sachs", "Deloitte", "KPMG", "BNP Paribas", 
  "CaixaBI", "BPI", "McKinsey & Co", "Morgan Stanley", "Santander"
];

const AlumniPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main>
          
          {/* --- HERO SECTION --- */}
          <section className="relative pt-32 pb-24 overflow-hidden min-h-[60vh] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <img src={ALUMNI_HERO_BG} alt="Global Finance" className="w-full h-full object-cover grayscale opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white border border-red-700 mb-6 shadow-lg shadow-red-900/20">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Our Legacy</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                  From ITIC to the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">World</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                  Our alumni network spans across major financial hubs and top-tier institutions globally.
                </p>
              </motion.div>
            </div>
          </section>

          {/* --- PLACEMENT TICKER (Marquee) --- */}
          <section className="py-10 bg-gray-900 border-y border-gray-800 overflow-hidden relative">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none" />
            
            <div className="flex gap-16 animate-marquee whitespace-nowrap">
              {[...companies, ...companies, ...companies].map((company, i) => (
                <div key={i} className="flex items-center gap-2 text-2xl font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors cursor-default">
                  <Building2 className="w-6 h-6 text-red-600" />
                  {company}
                </div>
              ))}
            </div>
          </section>

          {/* --- SUCCESS STORIES --- */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Alumni Stories</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See how ITIC helped shape the careers of our former members.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {alumniStories.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-1 transition-all duration-300 relative group"
                  >
                    <Quote className="absolute top-8 right-8 text-gray-100 w-12 h-12 group-hover:text-red-50 transition-colors" />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="w-16 h-16 border-2 border-gray-100">
                        <AvatarImage src={story.image} className="object-cover" />
                        <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wide">{story.company}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 italic leading-relaxed mb-6 relative z-10">
                      "{story.quote}"
                    </p>

                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>{story.role}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- JOIN NETWORK CTA --- */}
          <section className="py-20 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-gray-200">
                <Linkedin className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Are you an ITIC Alumni?</h2>
                <p className="text-gray-600 mb-8">
                  Reconnect with the club, mentor current students, or simply stay updated with our latest newsletters.
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
                  >
                    Join Alumni Group
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

export default AlumniPage;