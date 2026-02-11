import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-[100svh]">
        <Navbar />
        <Hero />
        <About />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
