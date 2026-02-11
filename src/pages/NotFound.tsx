import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX } from "lucide-react";

const NOTFOUND_BG = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col font-sans">
        <Navbar />

        {/* 'overflow-hidden' é crucial aqui para o texto gigante de fundo não criar scroll lateral */}
        <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-24 md:pt-20 pb-12">

          <div className="absolute inset-0 z-0">
            <img src={NOTFOUND_BG} alt="Background" className="w-full h-full object-cover grayscale opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg mx-auto"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8">
                <div className="absolute inset-0 bg-red-100 rounded-full blur-xl animate-pulse" />
                <div className="relative w-full h-full bg-white rounded-full border border-red-100 shadow-lg flex items-center justify-center">
                  <SearchX className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
                </div>
              </div>

              {/* Tipografia responsiva: text-6xl em mobile, text-8xl em desktop */}
              <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-gray-900 mb-4 tracking-tighter">
                404
              </h1>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Asset Not Found
              </h2>

              <p className="text-gray-500 text-base md:text-lg mb-8 md:mb-10 leading-relaxed px-4">
                Oops! It seems the page you are looking for has been delisted or moved.
                Let's get you back to the main dashboard.
              </p>

              <div className="flex justify-center gap-4">
                <Link to="/">
                  <Button
                    className="h-11 md:h-12 px-6 md:px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20 transition-all group text-sm md:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Return Home
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Texto de fundo responsivo: text-[10rem] em mobile para não partir o layout */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none flex items-center justify-center w-full">
            <span className="text-[10rem] md:text-[20rem] font-bold text-gray-50 opacity-80 leading-none">404</span>
          </div>

        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFound;