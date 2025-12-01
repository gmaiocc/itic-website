import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, TrendingUp, BarChart2, BookOpen } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import researchImg from "@/assets/researchheadv2.png";

const ResearchPage = () => {
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
                        RESEARCH DEPARTMENT
                      </p>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
                    >
                      Macroeconomic & Equity Research
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl text-primary-foreground/90 leading-relaxed mb-8"
                    >
                      The Research Department analyses macroeconomic reports,
                      industry studies, and equity research to understand what
                      drives global markets. The team works with real-world
                      data, professional reports, and research tools such as the
                      Bloomberg Terminal.
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
                          João Vitor
                        </h3>
                        <p className="text-primary-foreground/80">
                          Head of Research
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
                            src={researchImg}
                            alt="Research Department"
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
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Macroeconomic Research
                    </h3>
                    <p className="text-muted-foreground">
                      Decode the economy by working with real macroeconomic
                      reports and policy documents. The team studies inflation,
                      growth, interest rates, and other drivers behind global
                      markets.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Industry & Thematic Research
                    </h3>
                    <p className="text-muted-foreground">
                      Explore industry and thematic reports to spot emerging
                      trends before they go mainstream. Research focuses on
                      sectors, structural changes, and long-term themes in the
                      economy and markets.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BarChart2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Equity Research & Company Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Break down professional equity research reports and
                      company data. The department practices building investment
                      cases and learning how analysts structure their views on
                      individual stocks.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Bloomberg & Research Tools
                    </h3>
                    <p className="text-muted-foreground">
                      Get hands-on experience with the Bloomberg Terminal and
                      other research tools. The focus is on extracting data,
                      navigating functions, and linking information to concrete
                      research outputs.
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

export default ResearchPage;