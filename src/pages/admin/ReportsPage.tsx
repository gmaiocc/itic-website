import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Loader2,
    MoreHorizontal,
    Plus,
    Search,
    FileText,
    Pencil,
    Trash2,
    Download,
    Filter,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Report, ReportsResponse } from "@/types/report";

// Form Schema
const reportSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    category: z.enum(["sundayscan", "research", "marketanalysis"], {
        required_error: "Please select a category",
    }),
    // For file, we'll handle validation manually or assume it's optional for edits
    // file: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

const ReportsPage = () => {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingReport, setEditingReport] = useState<Report | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const queryClient = useQueryClient();

    // Fetch Reports directly from Supabase
    const { data, isLoading } = useQuery<ReportsResponse>({
        queryKey: ["reports", { search, category: categoryFilter }],
        queryFn: async () => {
            let query = supabase.from('reports').select('*').order('created_at', { ascending: false });

            if (categoryFilter !== "all") {
                query = query.eq('category', categoryFilter);
            }

            if (search) {
                query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            return { reports: data || [], total: data?.length || 0 };
        },
    });

    // Create Mutation
    const createMutation = useMutation({
        mutationFn: async (values: ReportFormValues & { file?: File }) => {
            // 1. Upload file if exists
            let fileUrl = "";
            let fileSize = "";

            if (values.file) {
                try {
                    // Import and use upload service
                    const { uploadReport } = await import('@/lib/upload');
                    const result = await uploadReport(values.file);
                    fileUrl = result.url;
                    fileSize = `${(result.size / (1024 * 1024)).toFixed(2)} MB`;
                } catch (uploadError: any) {
                    console.error('Upload error:', uploadError);
                    throw new Error(`File upload failed: ${uploadError.message}`);
                }
            }

            // 2. Create report in Supabase
            const { data, error } = await supabase
                .from('reports')
                .insert([{
                    title: values.title,
                    description: values.description,
                    date: values.date,
                    category: values.category,
                    file_url: fileUrl,
                    file_size: fileSize,
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
            setIsCreateOpen(false);
            setSelectedFile(null);
            toast.success("Report created successfully");
        },
        onError: (error: Error) => {
            toast.error(`Failed to create report: ${error.message}`);
        },
    });

    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: ReportFormValues & { file?: File } }) => {
            const updateData: Record<string, unknown> = {
                title: data.title,
                description: data.description,
                date: data.date,
                category: data.category,
            };

            // If new file is provided, update file info
            if (data.file) {
                updateData.file_url = data.file.name;
                updateData.file_size = `${(data.file.size / (1024 * 1024)).toFixed(2)} MB`;
            }

            const { data: result, error } = await supabase
                .from('reports')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
            setIsCreateOpen(false);
            setEditingReport(null);
            toast.success("Report updated successfully");
        },
        onError: (error: Error) => {
            toast.error(`Failed to update report: ${error.message}`);
        },
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('reports')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
            setIsDeleteOpen(false);
            setReportToDelete(null);
            toast.success("Report deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete report: ${error.message}`);
        },
    });

    const form = useForm<ReportFormValues>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            title: "",
            description: "",
            date: new Date().toISOString().split("T")[0],
            category: "research",
        },
    });

    const onSubmit = (values: ReportFormValues) => {
        if (editingReport && editingReport.id) {
            // @ts-ignore - Assuming file handling logic exists
            updateMutation.mutate({ id: editingReport.id, data: { ...values, file: selectedFile || undefined } });
        } else {
            // @ts-ignore
            createMutation.mutate({ ...values, file: selectedFile || undefined });
        }
    };

    const handleEdit = (report: Report) => {
        setEditingReport(report);
        form.reset({
            title: report.title,
            description: report.description,
            date: report.date,
            category: report.category,
        });
        setIsCreateOpen(true);
    };

    const handleDelete = (report: Report) => {
        setReportToDelete(report);
        setIsDeleteOpen(true);
    };

    const openCreateDialog = () => {
        setEditingReport(null);
        form.reset({
            title: "",
            description: "",
            date: new Date().toISOString().split("T")[0],
            category: "research",
        });
        setSelectedFile(null);
        setIsCreateOpen(true);
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "sundayscan":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case "research":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
            case "marketanalysis":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case "sundayscan": return "Sunday Scan";
            case "marketanalysis": return "Market Analysis";
            case "research": return "Research";
            default: return category;
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between chat-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold">Reports</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your research reports, Sunday scans, and market analysis.
                    </p>
                </div>
                <Button onClick={openCreateDialog} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Report
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search reports..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <SelectValue placeholder="Category" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="sundayscan">Sunday Scans</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="marketanalysis">Market Analysis</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg bg-white dark:bg-slate-900 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Loading reports...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data?.reports && data.reports.length > 0 ? (
                            data.reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{report.title}</span>
                                            {report.description && (
                                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {report.description}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getCategoryColor(report.category)}>
                                            {getCategoryLabel(report.category)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {new Date(report.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => window.open(report.downloadUrl, '_blank')} disabled={!report.downloadUrl}>
                                                    <Download className="mr-2 w-4 h-4" />
                                                    View File
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleEdit(report)}>
                                                    <Pencil className="mr-2 w-4 h-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(report)}
                                                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                                                >
                                                    <Trash2 className="mr-2 w-4 h-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No reports found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingReport ? "Edit Report" : "Add New Report"}</DialogTitle>
                        <DialogDescription>
                            {editingReport ? "Update the details of this report." : "Upload and publish a new research report."}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Weekly Market Outlook" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="sundayscan">Sunday Scan</SelectItem>
                                                <SelectItem value="research">Research</SelectItem>
                                                <SelectItem value="marketanalysis">Market Analysis</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Brief summary of the report..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>File (PDF)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                </FormControl>
                                {editingReport && !selectedFile && (
                                    <p className="text-xs text-muted-foreground">Leave empty to keep existing file.</p>
                                )}
                            </FormItem>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                                    {(createMutation.isPending || updateMutation.isPending) && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    )}
                                    {editingReport ? "Update Report" : "Create Report"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the report "{reportToDelete?.title}". This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => reportToDelete?.id && deleteMutation.mutate(reportToDelete.id)}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ReportsPage;
