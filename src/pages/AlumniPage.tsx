import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Linkedin, Quote, Building2, MapPin, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Nota: Certifica-te que tens estas imagens ou substitui pelos caminhos corretos
import a1 from "@/assets/a1.jpeg"; // Bárbara
import a2 from "@/assets/a2.jpeg"; // Ruslan
import a3 from "@/assets/a3.jpeg"; // Fábio

const ALUMNI_HERO_BG = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

const alumniStories = [
  {
    name: "Bárbara Conde",
    role: "Structured Products Manager",
    department: "Client Treasury",
    company: "ABANCA Portugal",
    location: "Lisbon, Portugal",
    quote: "The direct exposure to real-world applications of finance amplified my understanding of diverse career paths while still at university. Learning from industry professionals and publishing my research were key for a smooth transition to the job market. I am grateful for all my peers and Alumni who shared this experience with me.",
    image: a1,
    linkedin: "#"
  },
  {
    name: "Ruslan Pushkar",
    role: "Asset-Backed Lending",
    department: "Credit Risk",
    company: "Goldman Sachs",
    location: "Frankfurt, Germany",
    quote: "ITIC played a pivotal role in my early career, allowing me to apply classroom knowledge to real financial cases and sharpen my technical and analytical skills. The network I built—with both peers and professionals—proved invaluable, helping me secure an internship abroad. If you want to challenge yourself, ITIC is where you should start!",
    image: a2,
    linkedin: "#"
  },
  {
    name: "Fábio Maltêz",
    role: "AI Product Manager",
    department: "Tech & Product",
    company: "McKinsey & Company",
    location: "New York, USA",
    quote: "ITIC was my first real step into the investment world. I got hands-on experience with research and financial modeling, learned directly from industry professionals about different finance careers. On top of that, ITIC has great people. If you’re into finance and investing, ITIC is 100% the place to be!",
    image: a3,
    linkedin: "#"
  }
];

const companies = [
  "Goldman Sachs", "McKinsey & Company", "ABANCA", "J.P. Morgan", "Deloitte", 
  "KPMG", "BNP Paribas", "BPI", "Morgan Stanley", "Santander", "BlackRock"
];

const AlumniPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white font-sans">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden min-h-[60vh] flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={ALUMNI_HERO_BG} 
                alt="Global Finance Architecture" 
                className="w-full h-full object-cover grayscale opacity-20" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white" />
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:32px_32px] opacity-40 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100 mb-8 shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Our Legacy</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                  From ITIC to the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                    World Stage
                  </span>
                </h1>

                <p className="text-xl text-gray-500 leading-relaxed font-light max-w-2xl mx-auto mb-10">
                  Our alumni network spans across major financial hubs and top-tier institutions globally, proving that ITIC is the launchpad for a successful career.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Infinite Marquee Section */}
          <section className="py-12 bg-gray-900 border-y border-gray-800 overflow-hidden relative">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none w-full" />
            
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-16 items-center flex-nowrap pr-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  repeat: Infinity, 
                  ease: "linear", 
                  duration: 25 
                }}
              >
                {[...companies, ...companies].map((company, i) => (
                  <div key={i} className="flex items-center gap-3 whitespace-nowrap group cursor-default">
                    <Building2 className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
                    <span className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                      {company}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Stories Grid Section */}
          <section className="py-24 bg-white relative">
            {/* Decoration Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 skew-x-12 -z-10" />

            <div className="container mx-auto px-4">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                  Alumni Success Stories
                </h2>
                <p className="text-gray-600 text-lg">
                  See how ITIC helped shape the careers of our former members who are now leading in their fields.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {alumniStories.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col h-full bg-white rounded-3xl border border-gray-100 p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-red-900/5 hover:-translate-y-2 transition-all duration-300 group"
                  >
                    {/* Header: Avatar & Name */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-100 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <Avatar className="w-16 h-16 border-2 border-white shadow-md relative z-10">
                          {/* Note: using .src if it's an imported image object, or just the variable if string */}
                          <AvatarImage src={story.image as unknown as string} className="object-cover" />
                          <AvatarFallback className="bg-red-50 text-red-600 font-bold">{story.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 leading-tight">{story.name}</h4>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-wide mt-1">{story.company}</p>
                      </div>
                    </div>

                    {/* Quote - Flex grow to push footer down */}
                    <div className="relative mb-8 flex-grow">
                      <Quote className="absolute -top-2 -left-2 text-red-100/50 w-10 h-10 -z-10 transform -scale-x-100" />
                      <p className="text-gray-600 italic leading-relaxed text-[0.95rem]">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Footer: Details */}
                    <div className="pt-6 border-t border-gray-100 space-y-3">
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-semibold block text-gray-900">{story.role}</span>
                          <span className="text-xs text-gray-500">{story.department}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 text-center relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700" />
                
                <Linkedin className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Are you an ITIC Alumni?
                </h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg">
                  We'd love to hear from you. Reconnect with the club, mentor current students, or simply update us on your career path.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/company/iticiscte/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#0077b5] hover:bg-[#006396] text-white font-bold h-12 px-8 rounded-full text-lg shadow-lg shadow-blue-900/10 transition-all hover:scale-105">
                      <Linkedin className="w-5 h-5 mr-2" />
                      Connect on LinkedIn
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 h-12 px-8 rounded-full text-lg">
                      Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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