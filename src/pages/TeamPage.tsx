import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Camera, Calendar, MapPin, ArrowUpRight, Image as ImageIcon } from "lucide-react";

const GALLERY_HERO_BG = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop";

const galleryPhotos = [
  {
    id: 1,
    title: "Annual Trading Dinner",
    category: "Social",
    date: "Dec 2023",
    image: "",
    vertical: false
  },
];

const GalleryPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main>
          
          <section className="relative pt-32 pb-20 overflow-hidden min-h-[60vh] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <img src={GALLERY_HERO_BG} alt="Gallery Background" className="w-full h-full object-cover grayscale opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white border border-red-700 mb-6 shadow-lg shadow-red-900/20">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Our Memories</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                  Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">ITIC</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                  More than just finance. A collection of our events, workshops, and community moments.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              
              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                
                {galleryPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="break-inside-avoid"
                  >
                    <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100">
                      
                      <img 
                        src={photo.image} 
                        alt={photo.title}
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center justify-between mb-2">
                            <span className="inline-block px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                              {photo.category}
                            </span>
                            <div className="flex items-center text-gray-300 text-xs font-medium">
                              <Calendar className="w-3 h-3 mr-1" />
                              {photo.date}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-1">{photo.title}</h3>
                          
                          <div className="flex items-center text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>ISCTE Business School</span>
                            <ArrowUpRight className="w-3 h-3 ml-auto text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Camera className="w-4 h-4 text-white" />
                      </div>

                    </div>
                  </motion.div>
                ))}

              </div>

              <div className="text-center mt-20">
                <p className="text-gray-400 text-sm uppercase tracking-widest">End of Gallery</p>
                <div className="w-1 h-12 bg-gray-200 mx-auto mt-4 rounded-full" />
              </div>

            </div>
          </section>

        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default GalleryPage;