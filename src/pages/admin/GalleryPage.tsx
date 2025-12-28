import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import {
    Loader2,
    Plus,
    Search,
    Image as ImageIcon,
    Pencil,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/api/client";
import { galleryApi } from "@/api/gallery";
import { GalleryPhoto, GalleryResponse } from "@/types/gallery";

// Form Schema
const photoSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().optional(),
    category: z.string().optional(),
    date: z.string().optional(),
});

type PhotoFormValues = z.infer<typeof photoSchema>;

const GalleryPage = () => {
    const [search, setSearch] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState<GalleryPhoto | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const queryClient = useQueryClient();

    // Fetch Gallery Photos
    const { data, isLoading } = useQuery<GalleryResponse>({
        queryKey: ["gallery", { search }],
        queryFn: () => apiClient.get("/gallery", { ...(search && { search }) }),
    });

    // Create Mutation
    const createMutation = useMutation({
        mutationFn: async (values: PhotoFormValues & { file?: File }) => {
            let imageUrl = "";
            let thumbnailUrl = "";

            if (values.file) {
                // Upload image to server
                const formData = new FormData();
                formData.append("file", values.file);

                try {
                    const uploadRes = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });
                    const uploadData = await uploadRes.json();
                    imageUrl = uploadData.url;
                    thumbnailUrl = uploadData.thumbnail || uploadData.url;
                } catch (error) {
                    // Fallback to object URL for preview
                    imageUrl = URL.createObjectURL(values.file);
                    thumbnailUrl = imageUrl;
                }
            }

            return galleryApi.createPhoto({
                title: values.title,
                description: values.description || "",
                image: imageUrl,
                thumbnail: thumbnailUrl,
                category: values.category,
                date: values.date,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
            setIsCreateOpen(false);
            setSelectedFile(null);
            setPreviewUrl(null);
            toast.success("Photo added successfully");
        },
        onError: (error: Error) => {
            toast.error(`Failed to add photo: ${error.message}`);
        },
    });

    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: async ({
            id,
            data,
        }: {
            id: string;
            data: PhotoFormValues & { file?: File };
        }) => {
            let updateData: any = { ...data };

            if (data.file) {
                const formData = new FormData();
                formData.append("file", data.file);

                try {
                    const uploadRes = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });
                    const uploadData = await uploadRes.json();
                    updateData.image = uploadData.url;
                    updateData.thumbnail = uploadData.thumbnail || uploadData.url;
                } catch (error) {
                    // Keep existing image
                }
            }

            return galleryApi.updatePhoto(id, updateData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
            setIsCreateOpen(false);
            setEditingPhoto(null);
            setSelectedFile(null);
            setPreviewUrl(null);
            toast.success("Photo updated successfully");
        },
        onError: (error: Error) => {
            toast.error(`Failed to update photo: ${error.message}`);
        },
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: (id: string) => galleryApi.deletePhoto(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
            setIsDeleteOpen(false);
            setPhotoToDelete(null);
            toast.success("Photo deleted successfully");
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete photo: ${error.message}`);
        },
    });

    const form = useForm<PhotoFormValues>({
        resolver: zodResolver(photoSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
        },
    });

    const onSubmit = (values: PhotoFormValues) => {
        if (editingPhoto && editingPhoto.id) {
            updateMutation.mutate({
                id: editingPhoto.id,
                data: { ...values, file: selectedFile || undefined },
            });
        } else {
            // @ts-ignore
            createMutation.mutate({ ...values, file: selectedFile || undefined });
        }
    };

    const handleEdit = (photo: GalleryPhoto) => {
        setEditingPhoto(photo);
        form.reset({
            title: photo.title,
            description: photo.description,
            category: photo.category,
            date: photo.date,
        });
        setPreviewUrl(photo.image);
        setIsCreateOpen(true);
    };

    const handleDelete = (photo: GalleryPhoto) => {
        setPhotoToDelete(photo);
        setIsDeleteOpen(true);
    };

    const openCreateDialog = () => {
        setEditingPhoto(null);
        form.reset({
            title: "",
            description: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsCreateOpen(true);
    };

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(editingPhoto?.image || null);
        }
    };

    // Drag and drop handlers
    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find((file) => file.type.startsWith("image/"));

        if (imageFile) {
            handleFileChange(imageFile);
        } else {
            toast.error("Please drop an image file");
        }
    }, []);

    const filteredPhotos = data?.photos.filter((photo) =>
        photo.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold">Gallery</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your photo gallery and team images.
                    </p>
                </div>
                <Button onClick={openCreateDialog} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Photo
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search photos..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Gallery Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading gallery...
                    </div>
                </div>
            ) : filteredPhotos && filteredPhotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPhotos.map((photo) => (
                        <Card
                            key={photo.id}
                            className="group overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <CardContent className="p-0">
                                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={photo.thumbnail || photo.image}
                                        alt={photo.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => handleEdit(photo)}
                                        >
                                            <Pencil className="w-4 h-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(photo)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-sm truncate">{photo.title}</h3>
                                    {photo.description && (
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                            {photo.description}
                                        </p>
                                    )}
                                    {photo.date && (
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {new Date(photo.date).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground mt-4">No photos found.</p>
                    <Button onClick={openCreateDialog} variant="outline" className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Photo
                    </Button>
                </div>
            )}

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingPhoto ? "Edit Photo" : "Add New Photo"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingPhoto
                                ? "Update the details of this photo."
                                : "Upload a new photo to the gallery."}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Image Upload with Drag & Drop */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image</label>
                                <div
                                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${isDragging
                                        ? "border-primary bg-primary/5"
                                        : "border-slate-300 dark:border-slate-700"
                                        }`}
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                className="absolute top-2 right-2"
                                                onClick={() => handleFileChange(null)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="w-12 h-12 mx-auto text-muted-foreground/50" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Drag and drop an image, or click to browse
                                            </p>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="mt-4"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        e.target.files ? e.target.files[0] : null
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                                {editingPhoto && !selectedFile && (
                                    <p className="text-xs text-muted-foreground">
                                        Leave empty to keep existing image.
                                    </p>
                                )}
                            </div>

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Team Building Event" {...field} />
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
                                            <Textarea
                                                placeholder="Brief description of the photo..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Events" {...field} />
                                            </FormControl>
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
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsCreateOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        createMutation.isPending || updateMutation.isPending
                                    }
                                >
                                    {(createMutation.isPending || updateMutation.isPending) && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    )}
                                    {editingPhoto ? "Update Photo" : "Add Photo"}
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
                            This will permanently delete "{photoToDelete?.title}". This action
                            cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => photoToDelete?.id && deleteMutation.mutate(photoToDelete.id)}
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

export default GalleryPage;
