import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, TrendingUp, FileText, BarChart3, Briefcase, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { format } from "date-fns"; // Podes instalar: npm install date-fns

const ReportsPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    // Puxa apenas os que estão marcados como VISÍVEIS
    const { data, error } = await supabase
      .from('public_reports')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });
    
    if (data) setReports(data);
    setLoading(false);
  }

  // Mapeamento de Icones por Departamento
  const getIcon = (category: string) => {
    switch(category) {
      case 'Trading': return <TrendingUp className="w-6 h-6 text-primary" />;
      case 'Asset Management': return <Briefcase className="w-6 h-6 text-primary" />;
      case 'Research': return <FileText className="w-6 h-6 text-primary" />;
      case 'Operations': return <Activity className="w-6 h-6 text-primary" />;
      default: return <BarChart3 className="w-6 h-6 text-primary" />;
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
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background flex-grow">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                Market Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Análises exclusivas produzidas pelos nossos departamentos.
              </p>
            </motion.div>

            <Tabs defaultValue="All" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-12 bg-transparent h-auto">
                <TabsTrigger value="All" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 rounded-full px-6">All</TabsTrigger>
                <TabsTrigger value="Trading" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 rounded-full px-6">Trading</TabsTrigger>
                <TabsTrigger value="Asset Management" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 rounded-full px-6">Asset Management</TabsTrigger>
                <TabsTrigger value="Research" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 rounded-full px-6">Research</TabsTrigger>
                <TabsTrigger value="Operations" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border border-transparent data-[state=active]:border-primary/20 rounded-full px-6">Operations</TabsTrigger>
              </TabsList>

              {["All", "Trading", "Asset Management", "Research", "Operations"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {reports
                      .filter((r) => tab === "All" || r.category === tab) // Nota: Assumimos que guardas o Departamento na coluna 'category'
                      .map((report, index) => (
                        <motion.div key={report.id || index} variants={itemVariants}>
                          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur h-full flex flex-col justify-between">
                            <CardHeader>
                              <div className="flex items-start justify-between mb-2">
                                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                  {getIcon(report.category)}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {format(new Date(report.created_at), 'MMM yyyy')}
                                </span>
                              </div>
                              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                                {report.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-3">{report.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button
                                variant="outline"
                                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                onClick={() => window.open(report.file_url, '_blank')}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Ler Report
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                      {reports.filter((r) => tab === "All" || r.category === tab).length === 0 && (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                          Nenhum report encontrado neste departamento.
                        </div>
                      )}
                  </motion.div>
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