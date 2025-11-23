import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Megaphone, Handshake, Award } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const HumanResourcesPage = () => {
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
                Operations Department
              </h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                The backbone of our club - managing people, partnerships, and experiences
              </p>
            </div>
          </div>
        </section>

        {/* Department Head */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-2">Department Lead</p>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Margarida Balau</h2>
              <p className="text-primary font-semibold">Head of Operations</p>
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
                    <Megaphone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                    Communication & Image
                  </h3>
                  <p className="text-muted-foreground">
                    Oversee ITIC's communication and public image. Manage our brand presence and external communications.
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
                    Lead recruitment processes and integrate new members effectively. Build a strong, cohesive community.
                  </p>
                </div>

                <div className="p-8 bg-card rounded-lg shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Handshake className="w-6 h-6 text-primary" />
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
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-card-foreground mb-3">
                    Member Experience
                  </h3>
                  <p className="text-muted-foreground">
                    Ensure organizational excellence and a positive member experience. Create an environment where everyone thrives.
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
