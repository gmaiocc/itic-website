import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, TrendingUp, BarChart2, BookOpen } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const ResearchPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
                Research Department
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Dive deep into market analysis and financial research
              </p>
            </div>
          </div>
        </section>

        {/* Department Head */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-2">Department Lead</p>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">João Vitor</h2>
              <p className="text-primary font-semibold">Head of Research</p>
            </div>
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
                    <FileText className="w-6 h-6 text-primary" />
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
                    <TrendingUp className="w-6 h-6 text-primary" />
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
                    <BarChart2 className="w-6 h-6 text-primary" />
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
                    <BookOpen className="w-6 h-6 text-primary" />
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

export default ResearchPage;
