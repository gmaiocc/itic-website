import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";

const galleryPhotos = [

];

const TeamPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
          <section className="py-20 gradient-hero">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-heading font-bold text-primary-foreground mb-6"
                >
                  Gallery
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-primary-foreground/90 leading-relaxed"
                >
                  Momentos e eventos do ITIC
                </motion.p>
              </div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {galleryPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className={index % 5 === 0 ? 'row-span-2' : ''}
                  >
                    <Card className="overflow-hidden group cursor-pointer h-full">
                      <div className={`${index % 5 === 0 ? 'aspect-[3/4]' : 'aspect-square'} relative bg-muted h-full`}>
                        <img 
                          src={photo.image} 
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <h4 className="text-foreground font-heading font-bold">{photo.title}</h4>
                            <p className="text-sm text-muted-foreground">{photo.description}</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                          <Camera className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
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
