import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, HelpCircle, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    category: "Recruitment Process",
    questions: [
      {
        q: "What does the selection process look like in detail?",
        a: "Our recruitment is a comprehensive three-stage process designed to assess both your potential and fit:\n\n1. Group Activity (In-Person): Candidates work together to solve a case study prepared by each department. We focus on your reasoning process, collaboration skills, and how you build solutions as a team.\n\n2. Interview (Online): A one-on-one conversation to evaluate your hard and soft skills. More importantly, we want to understand your motivations, goals, and who you are as a person.\n\n3. Final Task: You will develop a concrete project related to your department and present it in a pitch to the ITIC Board. This demonstrates your creativity and ability to structure ideas."
      },
      {
        q: "Is the process online or in-person?",
        a: "We operate with a hybrid model to ensure the best evaluation environment. The Group Activity is held in-person at the university to foster real-time interaction and teamwork. The Interviews are conducted online for flexibility. The Final Task pitch is typically online, though this may vary by semester."
      },
      {
        q: "When does recruitment start?",
        a: "We open our doors twice a year: typically in September (Fall Semester) and February (Spring Semester). We recommend following our Instagram to catch the exact dates for the Launch Event and application deadlines."
      },
      {
        q: "Do I need a background in Finance or Economics?",
        a: "Not necessarily. While a background in Finance is helpful, it is not a requirement. We look for curiosity, logical thinking, and a willingness to learn above all else. We provide extensive internal training and mentorship for all new members to bridge any knowledge gaps."
      }
    ]
  },
  {
    category: "Departments & Roles",
    questions: [
      {
        q: "What exactly does the Research Department do?",
        a: "The Research Department is the intellectual core where we decode the economy. Analysts produce three types of key reports: Industry, Equity, and Macroeconomic reports. \n\nA major benefit is hands-on access to the Bloomberg Terminal, the most important financial tool globally, allowing you to analyze real-time data and understand what drives global markets."
      },
      {
        q: "What will I learn in the Trading Department?",
        a: "In Trading, the focus is on practical market execution. You will learn to identify multi-month winning stocks, manage risk to ensure consistent trades, and develop outperforming quantitative strategies. You will also train to compete in national and international investment challenges."
      },
      {
        q: "How does the Asset Management Department work?",
        a: "This department offers a simulation of professional fund management. You will focus on financial analysis, portfolio construction, and active asset management. Members gain hands-on investment experience by applying valuation methods to make strong, strategic investment decisions."
      },
      {
        q: "I'm not into analysis. What about the Operations Department?",
        a: "Operations is the backbone of ITIC. Here, you handle the club's communication, manage our public image, and lead recruitment processes. It is ideal for those looking to develop skills in marketing, human resources, event planning, and external partnership management."
      },
      {
        q: "Can I apply to multiple departments?",
        a: "You usually apply to a specific department that aligns with your interests. The recruitment challenges (especially the Case Study and Final Task) are tailored to the specific skills of each area. However, you can express interest in more than one area during your interview."
      }
    ]
  },
  {
    category: "Benefits & Impact",
    questions: [
      {
        q: "Why should I join ITIC? What's in it for me?",
        a: "Joining ITIC is a career accelerator. You gain:\n• Practical Skills: Learn tools like Bloomberg and technical analysis that aren't always taught in class.\n• Networking: Connect with ambitious peers and alumni in top firms.\n• Career Opportunities: Exclusive access to internships and recruitment events.\n• Personal Growth: Develop soft skills in leadership, presentation, and teamwork."
      },
      {
        q: "What is the expected time commitment?",
        a: "Commitment is crucial. You should expect to attend weekly meetings, participate in training sessions, and complete department-specific tasks (such as writing reports or market analysis). We value quality over quantity, but consistency is key to getting the full value of the club experience."
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

  const filteredFaqs = faqs.map((cat, catIndex) => ({
    ...cat,
    originalIndex: catIndex,
    questions: cat.questions.map((q, qIndex) => ({
      ...q,
      id: `${catIndex}-${qIndex}`
    })).filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-20">
          
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
                  Everything you need to know about the recruitment process, departments, and life at ITIC.
                </p>

                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search keywords (e.g., 'Bloomberg', 'Recruitment')..." 
                    className="pl-10 h-12 rounded-xl bg-white border-gray-200 focus:border-red-500 focus:ring-red-200 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
              {filteredFaqs.length > 0 ? (
                <div className="space-y-12">
                  {filteredFaqs.map((category) => (
                    <div key={category.originalIndex}>
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-red-600 rounded-full inline-block" />
                        {category.category}
                      </h3>
                      <div className="space-y-4">
                        {category.questions.map((item) => {
                          const isOpen = openIndex === item.id;
                          
                          return (
                            <motion.div 
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                                isOpen 
                                  ? "border-red-200 bg-red-50/30 shadow-sm" 
                                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                              }`}
                            >
                              <button
                                onClick={() => toggleFAQ(item.id)}
                                className="flex items-center justify-between w-full p-6 text-left"
                              >
                                <span className={`font-semibold text-lg pr-8 ${isOpen ? "text-red-700" : "text-gray-900"}`}>
                                  {item.q}
                                </span>
                                <span className={`flex-shrink-0 p-1 rounded-full transition-colors duration-300 ${
                                  isOpen ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                                }`}>
                                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </span>
                              </button>
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                  >
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed whitespace-pre-line">
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
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-gray-500 text-lg">No questions found matching "{searchTerm}".</p>
                  <Button 
                    variant="link" 
                    className="text-red-600 mt-2"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </Button>
                </motion.div>
              )}
            </div>
          </section>

          <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="max-w-2xl mx-auto">
                <MessageCircle className="w-12 h-12 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Can't find the answer you're looking for? Feel free to reach out to us directly on our social media or via email.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-6 rounded-full text-lg w-full sm:w-auto">
                      Contact Us
                    </Button>
                  </a>
                  <a href="https://www.instagram.com/itic_ibs/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-gray-700 text-gray-900 hover:bg-gray-800 hover:text-white font-bold px-8 py-6 rounded-full text-lg w-full sm:w-auto">
                      Visit Instagram <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
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

export default FAQPage;