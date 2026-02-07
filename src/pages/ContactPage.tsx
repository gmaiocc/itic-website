import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Linkedin, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Imagem de fundo temática (Communication/Connection)
const CONTACT_HERO_BG = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop";

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We will get back to you shortly.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main>
          
          {/* --- HERO SECTION --- */}
          <section className="relative pt-32 pb-24 overflow-hidden min-h-[50vh] flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0">
              <img src={CONTACT_HERO_BG} alt="Contact Support" className="w-full h-full object-cover grayscale opacity-30" />
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
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Get in Touch</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                  Let's Start a <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Conversation</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed font-light max-w-xl mx-auto">
                  Whether you're a student, a potential partner, or just curious about finance, we're here to answer your questions.
                </p>
              </motion.div>
            </div>
          </section>

          {/* --- CONTACT CONTENT --- */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
                
                {/* Left Column: Info Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-10"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Channels</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Reach out directly through email or follow our latest updates on social media. We usually respond within 24 hours.
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {/* Email Card */}
                    <a href="mailto:itic@iscte-iul.pt" className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 hover:shadow-lg hover:shadow-red-900/5 transition-all group">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">Email Us</p>
                        <p className="text-gray-500 group-hover:text-red-600 transition-colors">itic@iscte-iul.pt</p>
                      </div>
                    </a>

                    {/* Location Card */}
                    <div className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <MapPin className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">Visit Us</p>
                        <p className="text-gray-500">ISCTE Business School, Lisbon</p>
                      </div>
                    </div>

                    {/* Socials Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <a 
                        href="https://instagram.com/itic_ibs" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 hover:bg-white hover:shadow-md transition-all group text-center"
                      >
                        <Instagram className="w-8 h-8 text-gray-400 group-hover:text-red-600 mb-3 transition-colors" />
                        <span className="font-bold text-gray-900">Instagram</span>
                        <span className="text-xs text-gray-400">@itic_ibs</span>
                      </a>

                      <a 
                        href="https://www.linkedin.com/company/iticiscte" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 hover:bg-white hover:shadow-md transition-all group text-center"
                      >
                        <Linkedin className="w-8 h-8 text-gray-400 group-hover:text-red-600 mb-3 transition-colors" />
                        <span className="font-bold text-gray-900">LinkedIn</span>
                        <span className="text-xs text-gray-400">/iticiscte</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-2xl shadow-gray-200/50"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
                    <p className="text-gray-500 text-sm">
                      Fill out the form below and our team will get back to you as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-200 h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-200 h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Partnership / Recruitment / General Inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-200 h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-200 rounded-xl resize-none p-4"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-all shadow-lg shadow-red-600/20"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..." 
                      ) : (
                        <span className="flex items-center gap-2">Send Message <Send className="w-4 h-4" /></span>
                      )}
                    </Button>
                  </form>
                </motion.div>

              </div>
            </div>
          </section>

          {/* --- MAP PLACEHOLDER (Optional Visual) --- */}
          <section className="h-[400px] w-full bg-gray-100 relative grayscale opacity-80 border-t border-gray-200">
             {/* Podes substituir este iframe pelo link real do Google Maps do ISCTE */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.567860226847!2d-9.15582362349791!3d38.74768395669527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19330362f92d6d%3A0x7376662703473206!2sISCTE%20-%20Instituto%20Universit%C3%A1rio%20de%20Lisboa!5e0!3m2!1sen!2spt!4v1710000000000!5m2!1sen!2spt" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
             {/* Overlay para manter o estilo da marca */}
             <div className="absolute inset-0 bg-red-900/10 pointer-events-none" />
          </section>

        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;