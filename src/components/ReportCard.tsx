// Reusable Report Card component
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, FileText, BarChart3, ExternalLink } from "lucide-react";
import type { Report } from "@/types/report";

interface ReportCardProps {
    report: Report;
    onDownload?: (report: Report) => void;
}

const getCategoryIcon = (category: Report['category']) => {
    switch (category) {
        case 'marketanalysis':
            return <TrendingUp className="w-6 h-6 text-primary" />;
        case 'research':
            return <FileText className="w-6 h-6 text-primary" />;
        case 'sundayscan':
            return <BarChart3 className="w-6 h-6 text-primary" />;
        default:
            return <FileText className="w-6 h-6 text-primary" />;
    }
};

export const ReportCard = ({ report, onDownload }: ReportCardProps) => {
    // Get the file URL (check both field names)
    const fileUrl = report.file_url || report.downloadUrl;
    const hasFile = !!fileUrl && fileUrl.length > 0 && !fileUrl.startsWith('blob:');

    const handleClick = () => {
        if (hasFile) {
            // Open file in new tab
            window.open(fileUrl, '_blank');
        }
        // Also call the onDownload callback if provided
        onDownload?.(report);
    };

    return (
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {getCategoryIcon(report.category)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {report.date}
                    </span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                    {report.title}
                </CardTitle>
                <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={handleClick}
                    disabled={!hasFile}
                >
                    {hasFile ? (
                        <>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver Relatório
                        </>
                    ) : (
                        <>
                            <FileText className="w-4 h-4 mr-2" />
                            Ficheiro indisponível
                        </>
                    )}
                </Button>
                {report.file_size && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                        {report.file_size}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
