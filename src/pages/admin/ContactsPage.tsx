import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Loader2,
    MoreHorizontal,
    Search,
    MessageSquare,
    Mail,
    Eye,
    Trash2,
    Filter,
    CheckCircle,
    Clock,
    Reply,
} from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/api/client";
import { contactApi } from "@/api/contact";
import { Contact, ContactsResponse } from "@/types/contact";

const ContactsPage = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

    const queryClient = useQueryClient();

    // Fetch Contacts
    const { data, isLoading } = useQuery<ContactsResponse>({
        queryKey: ["contacts", { search, status: statusFilter }],
        queryFn: () =>
            apiClient.get("/contacts", {
                ...(search && { search }),
                ...(statusFilter !== "all" && { status: statusFilter }),
            }),
    });

    // Update Status Mutation
    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: Contact["status"] }) =>
            contactApi.updateContactStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            toast.success("Contact status updated");
        },
        onError: (error: Error) => {
            toast.error(`Failed to update status: ${error.message}`);
        },
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: (id: string) => contactApi.deleteContact(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            setIsDeleteOpen(false);
            setContactToDelete(null);
            toast.success("Contact deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete contact: ${error.message}`);
        },
    });

    const handleViewDetails = (contact: Contact) => {
        setSelectedContact(contact);
        setIsDetailOpen(true);

        // Mark as read if it's new
        if (contact.status === "new" && contact.id) {
            updateStatusMutation.mutate({ id: contact.id, status: "read" });
        }
    };

    const handleMarkAsReplied = (contact: Contact) => {
        if (contact.id) {
            updateStatusMutation.mutate({ id: contact.id, status: "replied" });
        }
    };

    const handleDelete = (contact: Contact) => {
        setContactToDelete(contact);
        setIsDeleteOpen(true);
    };

    const getStatusColor = (status: Contact["status"]) => {
        switch (status) {
            case "new":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            case "read":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "replied":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getStatusIcon = (status: Contact["status"]) => {
        switch (status) {
            case "new":
                return <Clock className="w-3 h-3" />;
            case "read":
                return <Eye className="w-3 h-3" />;
            case "replied":
                return <CheckCircle className="w-3 h-3" />;
        }
    };

    const getStatusLabel = (status: Contact["status"]) => {
        switch (status) {
            case "new":
                return "New";
            case "read":
                return "Read";
            case "replied":
                return "Replied";
            default:
                return status;
        }
    };

    const filteredContacts = data?.contacts || [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold">Contact Messages</h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage contact form submissions.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                        {data?.total || 0} Total Messages
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor("new")}>
                        {filteredContacts.filter((c) => c.status === "new").length} New
                    </Badge>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or subject..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <SelectValue placeholder="Status" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg bg-white dark:bg-slate-900 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Contact</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Loading contacts...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => (
                                <TableRow
                                    key={contact.id}
                                    className={
                                        contact.status === "new"
                                            ? "bg-blue-50/50 dark:bg-blue-950/20"
                                            : ""
                                    }
                                >
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium flex items-center gap-2">
                                                {contact.name}
                                                {contact.status === "new" && (
                                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                                )}
                                            </span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {contact.email}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="line-clamp-1">{contact.subject}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`${getStatusColor(contact.status)} flex items-center gap-1 w-fit`}
                                        >
                                            {getStatusIcon(contact.status)}
                                            {getStatusLabel(contact.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(contact.created_at), "MMM d, yyyy")}
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
                                                <DropdownMenuItem
                                                    onClick={() => handleViewDetails(contact)}
                                                >
                                                    <Eye className="mr-2 w-4 h-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {contact.status !== "replied" && (
                                                    <DropdownMenuItem
                                                        onClick={() => handleMarkAsReplied(contact)}
                                                    >
                                                        <Reply className="mr-2 w-4 h-4" />
                                                        Mark as Replied
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(contact)}
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
                                <TableCell colSpan={5} className="h-24 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <MessageSquare className="w-12 h-12 text-muted-foreground/50" />
                                        <p className="text-muted-foreground">No contacts found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* View Details Dialog */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Contact Details</DialogTitle>
                        <DialogDescription>
                            Received on{" "}
                            {selectedContact &&
                                format(new Date(selectedContact.created_at), "MMMM d, yyyy 'at' h:mm a")}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedContact && (
                        <div className="space-y-4">
                            <Card>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Name
                                            </label>
                                            <p className="mt-1 font-medium">{selectedContact.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">
                                                Email
                                            </label>
                                            <p className="mt-1">
                                                <a
                                                    href={`mailto:${selectedContact.email}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {selectedContact.email}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Subject
                                        </label>
                                        <p className="mt-1 font-medium">{selectedContact.subject}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Message
                                        </label>
                                        <p className="mt-1 text-sm whitespace-pre-wrap bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                                            {selectedContact.message}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                            Status
                                        </label>
                                        <div className="mt-2">
                                            <Badge
                                                variant="secondary"
                                                className={`${getStatusColor(selectedContact.status)} flex items-center gap-1 w-fit`}
                                            >
                                                {getStatusIcon(selectedContact.status)}
                                                {getStatusLabel(selectedContact.status)}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {selectedContact.status !== "replied" && (
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => {
                                            handleMarkAsReplied(selectedContact);
                                            setIsDetailOpen(false);
                                        }}
                                        className="gap-2"
                                    >
                                        <Reply className="w-4 h-4" />
                                        Mark as Replied
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the message from "{contactToDelete?.name}".
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() =>
                                contactToDelete?.id && deleteMutation.mutate(contactToDelete.id)
                            }
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

export default ContactsPage;
