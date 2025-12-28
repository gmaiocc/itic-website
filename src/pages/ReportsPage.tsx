import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useReports } from "@/hooks/queries/useReports";
import { ReportCard } from "@/components/ReportCard";
import type { Report } from "@/types/report";
import { useState } from "react";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | Report['category']>('all');

  // Fetch reports based on active tab
  const { data, isLoading, error } = useReports(
    activeTab !== 'all' ? { category: activeTab } : undefined
  );

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

  const handleDownload = (report: Report) => {
    // TODO: Implement actual download logic
    console.log('Download report:', report);
  };

  const reports = data?.reports || [];

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
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
                Reports
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access our latest market analysis, research reports, and investment insights
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sundayscan">Sunday Scan</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="marketanalysis">Market Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {isLoading && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading reports...</p>
                  </div>
                )}

                {error && (
                  <div className="text-center py-12">
                    <p className="text-destructive">Failed to load reports. Please try again later.</p>
                  </div>
                )}

                {!isLoading && !error && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {reports.map((report, index) => (
                      <motion.div key={report.id || index} variants={itemVariants}>
                        <ReportCard report={report} onDownload={handleDownload} />
                      </motion.div>
                    ))}

                    {reports.length === 0 && (
                      <div className="col-span-2 text-center py-12">
                        <p className="text-muted-foreground">No reports found in this category.</p>
                      </div>
                    )}
                  </motion.div>
                )}
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