import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Megaphone, Handshake, Award } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import operationsImg from "@/assets/operationsheadv2.png";

const HumanResourcesPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <section className="py-20 gradient-hero overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full mb-6"
                    >
                      <p className="text-sm font-semibold text-primary-foreground">
                        OPERATIONS DEPARTMENT
                      </p>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
                    >
                      Operations & Member Experience
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl text-primary-foreground/90 leading-relaxed mb-8"
                    >
                      The Operations Department oversees ITIC’s communication,
                      recruitment, internal organization, and member experience.
                      The team coordinates processes, supports collaboration
                      across departments, and ensures that the club runs
                      smoothly and professionally.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-1 h-16 bg-primary-foreground/30" />
                      <div>
                        <p className="text-sm text-primary-foreground/70 mb-1">
                          Department Lead
                        </p>
                        <h3 className="text-2xl font-heading font-bold text-primary-foreground">
                          Margarida Balau
                        </h3>
                        <p className="text-primary-foreground/80">
                          Head of Operations
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative aspect-square max-w-md mx-auto">
                      <div className="absolute inset-0 bg-primary-foreground/10 rounded-full blur-3xl" />
                      <div className="relative z-10 w-full h-full flex items-end justify-center">
                        <div className="w-full h-full rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border-2 border-primary-foreground/20 flex items-center justify-center">
                          <img
                            src={operationsImg}
                            alt="Operations Department"
                            className="w-auto h-full object-contain object-bottom"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-heading font-bold text-foreground mb-12 text-center">
                  What We Do
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Megaphone className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Communication & Public Image
                    </h3>
                    <p className="text-muted-foreground">
                      Oversee ITIC’s communication and public image. The
                      department manages external messaging, supports brand
                      consistency, and coordinates how the club is presented to
                      students, partners, and institutions.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Recruitment & Integration
                    </h3>
                    <p className="text-muted-foreground">
                      Lead recruitment processes and integrate new members
                      effectively. The team structures selection stages,
                      onboarding moments, and follow-up to ensure that members
                      are aligned with the club’s culture and activities.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Handshake className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Collaboration & Partnerships
                    </h3>
                    <p className="text-muted-foreground">
                      Strengthen collaboration within the club and with
                      external partners. Operations supports coordination
                      between departments and helps manage relationships with
                      universities, companies, and student organizations.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Organizational Excellence & Member Experience
                    </h3>
                    <p className="text-muted-foreground">
                      Ensure organizational excellence and a positive member
                      experience. The department works on internal processes,
                      event logistics, and feedback routines so that ITIC
                      remains a structured and engaging environment for all
                      members.
                    </p>
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

export default HumanResourcesPage;