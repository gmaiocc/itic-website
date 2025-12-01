import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import presidentImg from "@/assets/presidentv2.png";
import vicepresidentImg from "@/assets/vicepresidentv2.png";

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <section className="py-20 gradient-hero">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
                >
                  About ITIC
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-primary-foreground/90 leading-relaxed"
                >
                  ISCTE Trading &amp; Investment Club | #FinancialKnowledge
                </motion.p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Leadership
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                  Our Executive Team
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The leadership team sets the strategic direction for ITIC,
                  coordinating departments and representing the club within ISCTE
                  and the wider financial community.
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                {/* President */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="relative w-64 h-64 mb-2">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 blur-2xl" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
                      <img
                        src={presidentImg}
                        alt="President"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wide">
                    President
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Francisco Branco
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    short bio
                  </p>
                </motion.div>

                {/* Vice President */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="relative w-64 h-64 mb-2">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 blur-2xl" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
                      <img
                        src={vicepresidentImg}
                        alt="Vice President"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wide">
                    Vice President
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Daniel Silva
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    short bio
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="pt-16 pb-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                    About the Club
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    A student-led community connecting academic finance with real-world markets.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-6 text-muted-foreground text-center"
                >
                  <p className="text-lg leading-relaxed">
                    ITIC – ISCTE Trading &amp; Investment Club is a student-led organization
                    dedicated to promoting knowledge and hands-on experience in financial markets
                    among ISCTE students. Founded with the mission of bridging the gap between
                    academic learning and the professional financial world, the club offers a unique
                    platform for skill development and discovery.
                  </p>

                  <div className="flex justify-center my-4">
                    <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-card border border-border/60 bg-background">
                      <img
                        src="/images/itic-club-photo.jpg"
                        alt="ITIC members"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed">
                    Throughout the academic year, ITIC organizes workshops, trading competitions,
                    market outlook sessions, and company events where members can interact with
                    professionals from investment banks, asset managers, and fintechs. This mix of
                    technical learning and networking allows students to apply theoretical concepts
                    to real situations and understand how markets behave in practice.
                  </p>

                  <p className="text-lg leading-relaxed">
                    The club is structured into four main departments – Trading, Asset Management,
                    Research, and Operations – mirroring how professional finance organizations are
                    built. Each department focuses on different skills, from discretionary and
                    quantitative trading to portfolio construction, macroeconomic analysis, and
                    internal organization.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Our commitment is to help develop the next generation of finance professionals
                    by providing experiences that complement formal education, build confidence, and
                    prepare students for the challenges of a career in global financial markets.
                  </p>
                </motion.div>
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