import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { Target, Users, TrendingUp } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const AboutPage = () => {
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
                About ITIC
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                ISCTE Trading & Investment Club - Where finance meets ambition
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  To develop the next generation of financial professionals through hands-on learning and real market experience.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Our Community
                </h3>
                <p className="text-muted-foreground">
                  A diverse group of passionate students united by a common interest in trading, investment, and financial markets.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Our Vision
                </h3>
                <p className="text-muted-foreground">
                  To be Portugal's leading student-led investment club, bridging the gap between academic knowledge and industry practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <About />
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default AboutPage;
