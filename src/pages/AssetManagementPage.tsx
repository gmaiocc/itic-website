import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, BarChart3, PieChart, Calculator } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const AssetManagementPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
              >
                Asset Management Department
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-primary-foreground/90 leading-relaxed"
              >
                ns ainda
              </motion.p>
            </div>
          </div>
        </section>

        {/* Department Head */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-lg text-muted-foreground mb-2">Department Lead</p>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Vasco Fontes</h2>
              <p className="text-primary font-semibold">Head of Asset Management</p>
            </motion.div>
          </div>
        </section>

        {/* What We Do */}
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
                    a espera de info
                  </h3>
                  <p className="text-muted-foreground">
                    a espera de info
                  </p>
                </div>

                <div className="p-8 bg-card rounded-lg shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                    a espera de info
                  </h3>
                  <p className="text-muted-foreground">
                    a espera de info
                  </p>
                </div>

                <div className="p-8 bg-card rounded-lg shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <PieChart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                    a espera de info
                  </h3>
                  <p className="text-muted-foreground">
                    a espera de info
                  </p>
                </div>

                <div className="p-8 bg-card rounded-lg shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                    a espera de info
                  </h3>
                  <p className="text-muted-foreground">
                    a espera de info  
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
