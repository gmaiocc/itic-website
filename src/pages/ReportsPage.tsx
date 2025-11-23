import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, TrendingUp, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ReportsPage = () => {
  const reports = [
    {
      title: "Market Analysis Q3 2025",
      description: "...",
      date: "October 2025",
      category: "Research",
    },
    {
      title: "Crypto Report",
      description: "...",
      date: "November 2025",
      category: "Market Analysis",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-foreground to-primary bg-clip-text text-transparent">
                Research Reports
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access our latest market analysis, research reports, and investment insights
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="market">Sunday Scan</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 gap-6"
                >
                  {reports.map((report, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              {report.category === "Market Analysis" && <TrendingUp className="w-6 h-6 text-primary" />}
                              {report.category === "Research" && <FileText className="w-6 h-6 text-primary" />}
                              {report.category === "Performance" && <BarChart3 className="w-6 h-6 text-primary" />}
                            </div>
                            <span className="text-sm text-muted-foreground">{report.date}</span>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {report.title}
                          </CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Ver mais
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="market">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 gap-6"
                >
                  {reports.filter(r => r.category === "Market Analysis").map((report, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">{report.date}</span>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="research">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 gap-6"
                >
                  {reports.filter(r => r.category === "Research").map((report, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">{report.date}</span>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            ver mais
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="performance">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 gap-6"
                >
                  {reports.filter(r => r.category === "Performance").map((report, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <BarChart3 className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">{report.date}</span>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            ver mais
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ReportsPage;
