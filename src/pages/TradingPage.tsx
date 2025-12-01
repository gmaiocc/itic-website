import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Target, LineChart, Trophy } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import tradingImg from "@/assets/tradingheadv2.png";

const TradingPage = () => {
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
                        TRADING DEPARTMENT
                      </p>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
                    >
                      Trading & Market Strategy
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl text-primary-foreground/90 leading-relaxed mb-8"
                    >
                      The Trading Department develops and evaluates trading
                      strategies, applies structured risk management, and
                      monitors the markets throughout the week. The team focuses
                      on systematic analysis, weekly preparation, and clear
                      trading frameworks that support disciplined execution
                      across different market conditions.
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
                          David Costa
                        </h3>
                        <p className="text-primary-foreground/80">
                          Head of Trading
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
                            src={tradingImg}
                            alt="Trading Department"
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
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Sunday Scan
                    </h3>
                    <p className="text-muted-foreground">
                      Weekly session focused on preparing for the upcoming
                      market week. The team reviews macro events, identifies key
                      assets, outlines potential market scenarios, and highlights
                      important technical levels.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Quantitative Strategies
                    </h3>
                    <p className="text-muted-foreground">
                      Development and testing of systematic and data-driven
                      trading approaches. The team works with backtesting,
                      performance metrics, and statistical tools to evaluate and
                      refine trading models.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <LineChart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Market Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Continuous monitoring of equities, FX, indices, and
                      crypto. The department produces weekly recaps and outlooks
                      focused on price structure, technical context, and
                      relevant events.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Competition Training
                    </h3>
                    <p className="text-muted-foreground">
                      Preparation for investment challenges and trading
                      competitions. The team practices risk-controlled decision
                      making and conducts post-competition reviews to improve
                      performance and consistency.
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

export default TradingPage;