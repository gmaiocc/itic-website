import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const TeamPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6">
                Our Team
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Meet the passionate individuals driving ITIC forward
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                quando o operations mandar fotos e isso
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default TeamPage;
