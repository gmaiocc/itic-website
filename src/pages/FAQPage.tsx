import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, HelpCircle, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dados das Perguntas
const faqs = [
  {
    category: "Recruitment",
    questions: [
      {
        q: "Do I need a background in Finance to join?",
        a: "No. While helpful, we look for curiosity and logical thinking above all. We provide training for all new members, regardless of their major."
      },
      {
        q: "When does recruitment start?",
        a: "We recruit twice a year: in September (Fall Semester) and February (Spring Semester). Keep an eye on our Instagram for specific dates."
      },
      {
        q: "What is the selection process like?",
        a: "It typically involves an online application form, followed by a group dynamic or technical challenge, and a final individual interview with the board."
      }
    ]
  },
  {
    category: "Club Life",
    questions: [
      {
        q: "What is the expected time commitment?",
        a: "We expect around 4-6 hours per week. This includes department meetings, workshops, and individual work on reports or projects."
      },
      {
        q: "Can I be in multiple departments?",
        a: "Generally, members are assigned to one primary department to ensure focus. However, cross-departmental projects are common and encouraged."
      }
    ]
  },
  {
    category: "Departments",
    questions: [
      {
        q: "What software do you use in Trading?",
        a: "We primarily use TradingView for charting, MT4/MT5 for execution simulation, and Python for quantitative backtesting."
      },
      {
        q: "Do I get access to the Bloomberg Terminal?",
        a: "Yes. ITIC has dedicated slots for accessing the Bloomberg Terminal at ISCTE, primarily used by our Research and Asset Management teams."
      }
    ]
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  // Filtragem simples
  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          
          {/* --- HERO SECTION --- */}
          <section className="py-20 bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
                  <HelpCircle className="w-6 h-6 text-red-600" />
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6">
                  Frequently Asked <br /> Questions
                </h1>
                <p className="text-xl text-gray-500 mb-8">
                  Everything you need to know about joining and thriving at ITIC.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search for keywords (e.g., 'Recruitment')..." 
                    className="pl-10 h-12 rounded-xl bg-white border-gray-200 focus:border-red-500 focus:ring-red-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* --- FAQ CONTENT --- */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
              {filteredFaqs.length > 0 ? (
                <div className="space-y-12">
                  {filteredFaqs.map((category, catIndex) => (
                    <div key={catIndex}>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                        {category.category}
                      </h3>
                      <div className="space-y-4">
                        {category.questions.map((item, index) => {
                          const id = `${catIndex}-${index}`;
                          const isOpen = openIndex === id;
                          
                          return (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className={`border rounded-2xl transition-all duration-300 ${isOpen ? "border-red-200 bg-red-50/30" : "border-gray-200 bg-white hover:border-gray-300"}`}
                            >
                              <button
                                onClick={() => toggleFAQ(id)}
                                className="flex items-center justify-between w-full p-6 text-left"
                              >
                                <span className={`font-semibold text-lg ${isOpen ? "text-red-700" : "text-gray-900"}`}>
                                  {item.q}
                                </span>
                                <span className={`p-1 rounded-full transition-colors ${isOpen ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </span>
                              </button>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                      {item.a}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  No questions found matching your search.
                </div>
              )}
            </div>
          </section>

          {/* --- CTA SECTION --- */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <MessageCircle className="w-12 h-12 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                <p className="text-gray-400 mb-8">
                  Can't find the answer you're looking for? Our team is here to help.
                </p>
                <a href="/contact">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-6 rounded-full text-lg">
                    Contact Support
                  </Button>
                </a>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default FAQPage;