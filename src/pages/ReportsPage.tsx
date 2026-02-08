import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, TrendingUp, FileText, PieChart, Activity, FileBarChart, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const REPORTS_HERO_BG = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop";

const SAFE_FALLBACK_IMG = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000";

const ReportsPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const { data, error } = await supabase
        .from('public_reports')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });
      
      if (data) setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  }

  const getFallbackCover = (category: string) => {
    switch(category) {
      case 'Trading': 
        return "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000";
      case 'Asset Management': 
        return "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000";
      case 'Research': 
        return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000";
      case 'Operations': 
        return "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000";
      default: 
        return "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1000";
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Trading': return "bg-blue-600";
      case 'Asset Management': return "bg-green-600";
      case 'Research': return "bg-purple-600";
      case 'Operations': return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />

        <section className="relative pt-32 pb-24 overflow-hidden min-h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img src={REPORTS_HERO_BG} alt="Market Analysis" className="w-full h-full object-cover grayscale opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-60 mix-blend-multiply"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white border border-red-700 mb-6 shadow-lg shadow-red-900/20">
                <FileBarChart className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Knowledge Hub</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Insights</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                Exclusive analysis, equity reports, and macroeconomic views produced by our departments.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-white flex-grow">
          <div className="container mx-auto px-4 max-w-7xl">
            
            <Tabs defaultValue="All" className="w-full space-y-12">
              <div className="flex justify-center">
                <TabsList className="inline-flex h-auto flex-wrap justify-center p-1 bg-gray-100/50 rounded-full gap-2 border border-gray-200">
                  {["All", "Trading", "Asset Management", "Research", "Operations"].map((tab) => (
                    <TabsTrigger 
                      key={tab} 
                      value={tab} 
                      className="rounded-full px-6 py-2.5 text-sm font-medium transition-all
                      data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md
                      text-gray-600 hover:text-red-600 hover:bg-white"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {["All", "Trading", "Asset Management", "Research", "Operations"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  
                  {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-96 rounded-2xl bg-gray-100 animate-pulse border border-gray-200" />
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {reports
                        .filter((r) => tab === "All" || r.category === tab)
                        .map((report, index) => {
                          const coverImage = report.cover_url ? report.cover_url : getFallbackCover(report.category || 'Default');
                          const categoryColor = getCategoryColor(report.category);

                          return (
                            <motion.div key={report.id || index} variants={itemVariants}>
                              <Card className="group h-full flex flex-col justify-between border border-gray-200 bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 rounded-2xl overflow-hidden hover:-translate-y-1">
                                
                                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                  <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors z-10" />
                                  <img 
                                    src={coverImage} 
                                    alt="Report Cover" 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                      e.currentTarget.src = SAFE_FALLBACK_IMG;
                                    }}
                                  />
                                  <div className="absolute top-4 left-4 z-20">
                                    <Badge className={`${categoryColor} text-white hover:${categoryColor} border-none px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg`}>
                                      {report.category || 'General'}
                                    </Badge>
                                  </div>
                                </div>

                                <CardHeader className="space-y-3 pt-6">
                                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium uppercase tracking-wide">
                                    <span className="flex items-center gap-1">
                                      <FileText className="w-3 h-3" /> Report
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {report.created_at ? format(new Date(report.created_at), 'MMM d, yyyy') : 'Recently'}
                                    </span>
                                  </div>
                                  
                                  <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                                    {report.title}
                                  </CardTitle>
                                  
                                  <CardDescription className="line-clamp-3 text-gray-500 text-sm leading-relaxed">
                                    {report.description}
                                  </CardDescription>
                                </CardHeader>
                                
                                <CardFooter className="pt-2 pb-6">
                                  <Button
                                    variant="outline"
                                    className="w-full rounded-xl h-11 border-gray-200 text-gray-700 font-bold hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all group/btn"
                                    onClick={() => window.open(report.file_url, '_blank')}
                                  >
                                    Read Full Report
                                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                  </Button>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          );
                        })}
                        
                      {!loading && reports.filter((r) => tab === "All" || r.category === tab).length === 0 && (
                        <div className="col-span-full py-20 text-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <FileText className="w-8 h-8 text-gray-300" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">No reports found</h3>
                          <p className="text-gray-500">Check back later for new insights from this department.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ReportsPage;