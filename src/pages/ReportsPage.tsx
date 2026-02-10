import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter
} from "@/components/ui/card";
import {
  Download, FileText, Clock, ArrowUpRight, Search,
  Filter, ChevronRight, Calendar, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { format } from "date-fns";

// Imagens de Fundo e Fallback
const REPORTS_HERO_BG = "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop";
const SAFE_FALLBACK_IMG = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000";

const ReportsPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [activeCategory, searchQuery, reports]);

  async function fetchReports() {
    try {
      const { data, error } = await supabase
        .from('public_reports')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });

      if (data) {
        setReports(data);
        setFilteredReports(data);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  }

  function filterReports() {
    let result = reports;

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter(r => r.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.title.toLowerCase().includes(lowerQuery) ||
        (r.description && r.description.toLowerCase().includes(lowerQuery))
      );
    }

    setFilteredReports(result);
  }

  // Helpers de Estilo
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Trading': return "bg-blue-100 text-blue-700 border-blue-200";
      case 'Asset Management': return "bg-green-100 text-green-700 border-green-200";
      case 'Research': return "bg-purple-100 text-purple-700 border-purple-200";
      case 'Operations': return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getFallbackCover = (category: string) => {
    switch (category) {
      case 'Trading': return "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000";
      case 'Asset Management': return "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000";
      case 'Research': return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000";
      default: return SAFE_FALLBACK_IMG;
    }
  };

  const featuredReport = !searchQuery && activeCategory === "All" && filteredReports.length > 0 ? filteredReports[0] : null;
  const gridReports = featuredReport ? filteredReports.slice(1) : filteredReports;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
        <Navbar />

        <section className="pt-32 pb-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 mb-6">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Market Intelligence</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
                ITIC <span className="text-red-600">Reports</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
                Access our archive of equity research, macro outlooks, and performance reports produced by our analysts.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">

            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar w-full md:w-auto">
              {["All", "Trading", "Asset Management", "Research", "Operations"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat
                      ? "bg-gray-900 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                className="pl-10 rounded-full bg-gray-100 border-transparent focus:bg-white focus:border-red-200 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="py-12 flex-grow">
          <div className="container mx-auto px-4">

            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {featuredReport && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1 h-6 bg-red-600 rounded-full" />
                      <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Latest Release</h2>
                    </div>

                    <div className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-xl grid md:grid-cols-2">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors z-10" />
                        <img
                          src={featuredReport.cover_url || getFallbackCover(featuredReport.category)}
                          alt={featuredReport.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => e.currentTarget.src = SAFE_FALLBACK_IMG}
                        />
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                          <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getCategoryStyle(featuredReport.category)}`}>
                            {featuredReport.category}
                          </span>
                          <span className="flex items-center text-gray-500 text-xs font-medium">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(new Date(featuredReport.created_at), 'MMMM d, yyyy')}
                          </span>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                          {featuredReport.title}
                        </h3>

                        <p className="text-gray-600 mb-8 leading-relaxed text-lg line-clamp-3">
                          {featuredReport.description}
                        </p>

                        <Button
                          className="w-fit rounded-full bg-gray-900 text-white hover:bg-red-600 px-8 py-6 text-lg font-bold transition-all shadow-lg hover:shadow-red-600/20"
                          onClick={() => window.open(featuredReport.file_url, '_blank')}
                        >
                          Read Report <ArrowUpRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {gridReports.length > 0 ? (
                  <div>
                    {featuredReport && (
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-6 bg-gray-300 rounded-full" />
                        <h2 className="text-lg font-bold text-gray-500 uppercase tracking-widest">Archive</h2>
                      </div>
                    )}

                    <motion.div
                      layout
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      <AnimatePresence>
                        {gridReports.map((report) => (
                          <motion.div
                            key={report.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card className="group h-full flex flex-col justify-between border border-gray-200 bg-white hover:border-red-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1">
                              <div className="relative h-56 w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                                <img
                                  src={report.cover_url || getFallbackCover(report.category)}
                                  alt={report.title}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                  onError={(e) => e.currentTarget.src = SAFE_FALLBACK_IMG}
                                />
                                <div className="absolute top-4 right-4">
                                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${getCategoryStyle(report.category)} bg-opacity-90`}>
                                    {report.category}
                                  </div>
                                </div>
                              </div>

                              <CardHeader className="pt-6 pb-2">
                                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-3">
                                  <Clock className="w-3 h-3" />
                                  {format(new Date(report.created_at), 'MMM d, yyyy')}
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                                  {report.title}
                                </CardTitle>
                              </CardHeader>

                              <CardContent>
                                <CardDescription className="line-clamp-3 text-sm text-gray-500 leading-relaxed">
                                  {report.description}
                                </CardDescription>
                              </CardContent>

                              <CardFooter className="pt-2 pb-6">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-between rounded-xl h-12 bg-gray-50 hover:bg-gray-900 hover:text-white text-gray-600 font-bold transition-all group/btn"
                                  onClick={() => window.open(report.file_url, '_blank')}
                                >
                                  Read Report
                                  <div className="bg-white rounded-full p-1 group-hover/btn:bg-gray-700 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-gray-900 group-hover/btn:text-white" />
                                  </div>
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Filter className="w-6 h-6 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No reports found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">
                      We couldn't find any reports matching your filters. Try selecting a different category or clearing your search.
                    </p>
                    <Button
                      variant="link"
                      className="text-red-600 mt-4"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All");
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ReportsPage;