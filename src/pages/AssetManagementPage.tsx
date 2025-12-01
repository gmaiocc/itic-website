import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, BarChart3, PieChart, Calculator } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import assetmImg from "@/assets/assetm-head.png";

const AssetManagementPage = () => {
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
                        ASSET MANAGEMENT DEPARTMENT
                      </p>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
                    >
                      Market Analysis & Portfolio Management
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl text-primary-foreground/90 leading-relaxed mb-8"
                    >
                      The Asset Management Department screens markets, develops
                      equity research, and structures diversified portfolios.
                      The team works with valuation methods, sector and company
                      analysis, and investment frameworks designed to support
                      robust and well-founded portfolio decisions.
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
                          Vasco Fontes
                        </h3>
                        <p className="text-primary-foreground/80">
                          Head of Asset Management
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
                            src={assetmImg}
                            alt="Asset Management Department"
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
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Market Screening
                    </h3>
                    <p className="text-muted-foreground">
                      Regular screening of global markets to track trends,
                      sector rotations, and emerging opportunities. The team
                      monitors price action, macro context, and key indicators
                      to identify potential ideas for further analysis.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Equity Research
                    </h3>
                    <p className="text-muted-foreground">
                      Development of equity research on sectors and companies,
                      with attention to fundamentals, earnings, cash flows, and
                      other key metrics. The department structures research
                      notes to support clear investment views.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <PieChart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Portfolio Management
                    </h3>
                    <p className="text-muted-foreground">
                      Construction and follow-up of diversified investment
                      portfolios. The team works with allocation, position
                      sizing, rebalancing, and risk–return profiles across
                      different strategies and time horizons.
                    </p>
                  </div>

                  <div className="p-8 bg-card rounded-lg shadow-card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Calculator className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                      Valuation & Investment Decisions
                    </h3>
                    <p className="text-muted-foreground">
                      Application of valuation methods to support investment
                      decisions, from relative valuation multiples to
                      cash-flow-based approaches. The department links
                      valuation outputs with portfolio construction and risk
                      considerations.
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

export default AssetManagementPage;