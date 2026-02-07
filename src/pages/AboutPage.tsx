import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Quote, User, Users, Target, Calendar, Briefcase, ChevronRight, Linkedin } from "lucide-react";
import presidentImg from "@/assets/presidentv2.png";
import vicepresidentImg from "@/assets/vicepresidentv2.png";
import vicepresident2Img from "@/assets/vicepresident2.png";
import fotopresidente from "@/assets/fotopresidente.png";
import fotovicepresidente1 from "@/assets/fotovicepresidente1.png";
import fotovicepresidente2 from "@/assets/fotovicepresidente2.png";
import aboutpageImg from "@/assets/aboutpage.jpg";

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* --- HEADER SECTION --- */}
        <div className="relative pt-32 pb-20 overflow-hidden bg-gray-50 border-b border-gray-200">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold uppercase tracking-widest text-red-600 mb-6">
                Who We Are
              </span>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">ITIC</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                ISCTE Trading & Investment Club. <br />
                <span className="text-gray-400 text-lg">#FinancialKnowledge</span>
              </p>
            </motion.div>
          </div>
        </div>

        <main>
          {/* --- LEADERSHIP SECTION (HIERARCHY) --- */}
          <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                  Executive Leadership
                </h2>
                <div className="w-20 h-1 bg-red-600 mx-auto rounded-full mb-6" />
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Guiding the strategic vision and fostering a culture of excellence within ISCTE's financial community.
                </p>
              </motion.div>

              {/* HIERARCHY CONTAINER */}
              <div className="flex flex-col items-center gap-12 lg:gap-16">

                {/* LEVEL 1: PRESIDENT (Centered & Slightly Larger) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group relative w-full max-w-lg"
                >
                  <div className="absolute -inset-1 bg-gradient-to-b from-gray-200 to-white rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white border border-gray-100 rounded-[2rem] p-10 text-center shadow-xl hover:shadow-2xl hover:shadow-red-900/5 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative w-56 h-56 mx-auto mb-8">
                      <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      <img
                        src={fotopresidente}
                        alt="Francisco Branco"
                        className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-red-600 text-white p-3 rounded-full shadow-lg">
                        <User className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-900 mb-1">Francisco Branco</h3>

                    {/* Role + LinkedIn */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <p className="text-red-600 font-bold text-sm uppercase tracking-wider">President</p>
                      <span className="text-gray-300">|</span>
                      <a
                        href="https://www.linkedin.com/in/francisco--branco/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#0077b5] transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="relative">
                      <Quote className="w-8 h-8 text-gray-200 absolute -top-4 -left-2 transform -scale-x-100" />
                      <p className="text-gray-500 text-base leading-relaxed italic px-6">
                        QUOTE
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* LEVEL 2: VICE PRESIDENTS (Grid Side by Side) */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl">

                  {/* VP 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-b from-gray-200 to-white rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-500" />
                    <div className="relative bg-white border border-gray-100 rounded-[2rem] p-8 text-center shadow-lg hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300">
                      <div className="relative w-40 h-40 mx-auto mb-6">
                        <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <img
                          src={fotovicepresidente1}
                          alt="Daniel Silva"
                          className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                        />
                        <div className="absolute bottom-1 right-1 bg-gray-800 text-white p-2 rounded-full shadow-lg">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-1">Daniel Silva</h3>

                      {/* Role + LinkedIn */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <p className="text-red-600 font-medium text-xs uppercase tracking-wider">Vice President</p>
                        <span className="text-gray-300">|</span>
                        <a
                          href="https://www.linkedin.com/in/danielsantossilva1009/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#0077b5] transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-gray-500 text-sm leading-relaxed italic px-2">
                        QUOTE
                      </p>
                    </div>
                  </motion.div>

                  {/* VP 2 (NOVO CARD) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-b from-gray-200 to-white rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-500" />
                    <div className="relative bg-white border border-gray-100 rounded-[2rem] p-8 text-center shadow-lg hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300">
                      <div className="relative w-40 h-40 mx-auto mb-6">
                        <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        {/* ATENÇÃO: Substituir 'vicepresidentImg' pela imagem do novo VP quando tiveres */}
                        <img
                          src={fotovicepresidente2}
                          alt="New VP Name"
                          className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                        />
                        <div className="absolute bottom-1 right-1 bg-gray-800 text-white p-2 rounded-full shadow-lg">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-1">David Costa</h3>

                      {/* Role + LinkedIn */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <p className="text-red-600 font-medium text-xs uppercase tracking-wider">Vice President</p>
                        <span className="text-gray-300">|</span>
                        <a
                          href="https://www.linkedin.com/in/david-carias-pinto-costa/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#0077b5] transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-gray-500 text-sm leading-relaxed italic px-2">
                        QUOTE
                      </p>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          </section>

          {/* --- ABOUT THE CLUB SECTION --- */}
          <section className="py-24 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                  {/* Left Column: Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                        Bridging Academics & <br />
                        <span className="text-red-600">Real Markets</span>
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        ITIC – ISCTE Trading & Investment Club is more than just a student group; it is a professional training ground.
                        Founded to bridge the gap between classroom theory and the fast-paced reality of the financial world, we provide a unique platform for skill development.
                      </p>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        We are structured like a real financial institution, divided into specialized departments: Trading, Asset Management, Research, and Operations. This structure allows members to gain specialized skills while understanding how different functions interact in a professional setting.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Target, title: "Mission Driven", text: "Developing the next generation of finance leaders." },
                        { icon: Calendar, title: "Active Events", text: "Trading competitions, workshops, and networking." },
                        { icon: Briefcase, title: "Professional Prep", text: "Direct interaction with industry experts." },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-red-200 transition-colors">
                          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-500">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right Column: Image/Visual */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div className="bg-gray-200 w-full aspect-[4/5] relative">
                        <img
                          src={aboutpageImg}
                          alt="ITIC Community"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop";
                          }}
                        />
                      </div>
                      <div className="absolute bottom-8 left-8 z-20 text-white max-w-xs">
                        <p className="text-sm font-bold uppercase tracking-widest text-red-400 mb-2">Our Community</p>
                        <h3 className="text-2xl font-bold leading-tight">Building the future of finance together.</h3>
                      </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl -z-10" />
                  </motion.div>

                </div>
              </div>
            </div>
          </section>

          {/* --- CTA SECTION --- */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-700/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Ready to join the club?
                  </h2>

                  <p className="text-gray-300 text-lg">
                    Whether you are interested in markets, risk, corporate finance or consulting,
                    there is a place for you at ITIC.
                  </p>

                  <div className="flex justify-center pt-4">
                    <a
                      href="/departments"
                      className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10 group"
                    >
                      Explore Departments
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
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

export default AboutPage;