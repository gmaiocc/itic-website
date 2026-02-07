import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, Users, Settings, LogOut,
  ShieldAlert, FileText, UploadCloud, Download, Menu,
  Trash2, Edit, Save, Camera, Link as LinkIcon, Briefcase, Plus, UserPlus, Search, Filter, FileSpreadsheet, File, Eye, EyeOff, X, Check, MoreVertical, ArrowRight, Book, Presentation, FileCode
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

// --- TIPOS ---
type Profile = {
  id: string;
  email: string;
  role: 'admin' | 'member';
  full_name?: string;
  department?: string;
  position?: string;
  avatar_url?: string;
  degree?: string;
  student_year?: string;
  linkedin_url?: string;
  bio?: string;
  created_at: string;
};

type RepoFile = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  file_path: string;
  file_type: string;
  created_at: string;
};

type PublicReport = {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  is_visible: boolean;
  created_at: string;
};

// --- FUNÇÕES AUXILIARES ---
const isAdminPosition = (position: string | undefined) => ['President', 'Vice-President', 'Head'].includes(position || '');
const isSuperAdminPosition = (position: string | undefined) => ['President', 'Vice-President'].includes(position || '');

// Ícones baseados no tipo de ficheiro
const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
  if (type.includes('xls') || type.includes('csv') || type.includes('sheet')) return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
  if (type.includes('ppt') || type.includes('slide')) return <Presentation className="w-5 h-5 text-orange-500" />;
  if (type.includes('py') || type.includes('js') || type.includes('html')) return <FileCode className="w-5 h-5 text-blue-500" />;
  if (type.includes('epub') || type.includes('mobi')) return <Book className="w-5 h-5 text-purple-500" />;
  return <File className="w-5 h-5 text-gray-400" />;
};

// --- 1. OVERVIEW (ATUALIZADO) ---
const DashboardOverview = ({ user, profile, setActiveTab }: { user: any, profile: Profile | null, setActiveTab: (tab: string) => void }) => {
  const navigate = useNavigate();
  const [recentFiles, setRecentFiles] = useState<RepoFile[]>([]);

  useEffect(() => {
    async function fetchRecent() {
      const { data } = await supabase.from('repository_files').select('*').order('created_at', { ascending: false }).limit(4);
      if (data) setRecentFiles(data);
    }
    fetchRecent();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 md:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="w-20 h-20 border-4 border-white/10 shadow-lg">
            <AvatarImage src={profile?.avatar_url} className="object-cover" />
            <AvatarFallback className="text-2xl bg-red-600 text-white font-bold">{profile?.full_name?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-3xl font-heading font-bold">Hello, {profile?.full_name?.split(' ')[0] || "Member"}</h2>
            <p className="text-gray-400 text-lg">Welcome to your ITIC workspace.</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">{profile?.department || "General Member"}</Badge>
              <Badge variant="outline" className="text-gray-300 border-gray-600">{profile?.position || "Member"}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all border-l-4 border-l-red-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Access Level</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{profile?.role === 'admin' ? 'Administrator' : 'Standard Member'}</div>
            <p className="text-xs text-muted-foreground mt-1">View permissions</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Department</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{profile?.department || "Unassigned"}</div>
            <p className="text-xs text-muted-foreground mt-1">Active workspace</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all border-l-4 border-l-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Status</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground mt-1">Account in good standing</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* LEFT: Quick Actions */}
        <div className="space-y-4">
           <h3 className="text-lg font-bold text-gray-900 ml-1">Quick Actions</h3>
           <Card 
             className="bg-red-50 border-red-100 hover:bg-red-100/80 hover:border-red-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
             onClick={() => setActiveTab('repository')}
           >
             <CardContent className="p-6 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-red-600 group-hover:scale-110 transition-transform"><FolderOpen className="w-6 h-6"/></div>
                 <div><h4 className="font-bold text-gray-900 text-lg">Internal Files</h4><p className="text-sm text-gray-500">Access templates & data</p></div>
               </div>
               <ArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
             </CardContent>
           </Card>

           <Card 
             className="bg-blue-50 border-blue-100 hover:bg-blue-100/80 hover:border-blue-200 transition-all cursor-pointer group shadow-sm hover:shadow-md"
             onClick={() => navigate('/reports')}
           >
             <CardContent className="p-6 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-blue-600 group-hover:scale-110 transition-transform"><FileText className="w-6 h-6"/></div>
                 <div><h4 className="font-bold text-gray-900 text-lg">Market Reports</h4><p className="text-sm text-gray-500">Read latest analysis</p></div>
               </div>
               <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
             </CardContent>
           </Card>
        </div>

        {/* RIGHT: Recent Uploads */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 ml-1">Recent Uploads</h3>
          <Card className="border-gray-200 shadow-sm h-full">
            <CardContent className="p-0">
              {recentFiles.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {recentFiles.map((file) => (
                    <div key={file.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">{getFileIcon(file.file_type)}</div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 line-clamp-1">{file.title}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            {file.department} • {format(new Date(file.created_at), 'MMM d')}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('repository')}>View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">No recent files found.</div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50/50 p-2 flex justify-center border-t border-gray-100">
              <Button variant="link" size="sm" className="text-xs text-muted-foreground h-auto" onClick={() => setActiveTab('repository')}>Go to Repository</Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
};

// --- 2. GESTÃO DE DEPARTAMENTO ---
const DepartmentManager = ({ myProfile }: { myProfile: Profile | null }) => {
  const [members, setMembers] = useState<Profile[]>([]);
  const [whitelisted, setWhitelisted] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<Profile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [roleSelectionType, setRoleSelectionType] = useState<"Head" | "Custom">("Custom");
  const [newMemberData, setNewMemberData] = useState({
    email: "", full_name: "", degree: "", student_year: "", position: ""
  });

  const isSuperAdmin = isSuperAdminPosition(myProfile?.position);
  const myDept = myProfile?.department;

  useEffect(() => { fetchTeam(); fetchWhitelist(); }, []);

  async function fetchTeam() {
    let query = supabase.from('profiles').select('*').order('full_name');
    if (!isSuperAdmin && myDept) query = query.eq('department', myDept);
    const { data } = await query;
    if (data) setMembers(data as Profile[]);
  }

  async function fetchWhitelist() {
    let query = supabase.from('whitelist').select('*');
    if (!isSuperAdmin && myDept) query = query.eq('department', myDept);
    const { data } = await query;
    if (data) setWhitelisted(data);
  }

  const filterList = (list: any[]) => {
    if (!searchQuery) return list;
    const lowerQuery = searchQuery.toLowerCase();
    return list.filter(item =>
      (item.full_name?.toLowerCase() || "").includes(lowerQuery) ||
      (item.email?.toLowerCase() || "").includes(lowerQuery)
    );
  };

  const activeEmails = new Set(members.map(m => m.email));
  const trulyPendingWhitelist = whitelisted.filter(w => !activeEmails.has(w.email));
  
  const filteredMembers = filterList(members);
  const filteredWhitelist = filterList(trulyPendingWhitelist);

  async function handlePreRegister() {
    if (!newMemberData.email || !newMemberData.full_name || !newMemberData.position) {
      return toast({ title: "Error", description: "All fields are required.", variant: "destructive" });
    }
    const targetDept = isSuperAdmin ? (newMemberData as any).departmentOverride || myDept : myDept;
    const role = isAdminPosition(newMemberData.position) ? 'admin' : 'member';

    const { data: existing } = await supabase.from('profiles').select('id').eq('email', newMemberData.email).single();
    if (existing) return toast({ title: "Warning", description: "User already exists.", variant: "destructive" });

    const { error } = await supabase.from('whitelist').upsert({
      email: newMemberData.email,
      full_name: newMemberData.full_name,
      department: targetDept,
      position: newMemberData.position,
      degree: newMemberData.degree,
      student_year: newMemberData.student_year,
      role: role
    });

    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Member Pre-Approved!" });
      setIsAddModalOpen(false);
      fetchWhitelist();
      setNewMemberData({ email: "", full_name: "", degree: "", student_year: "", position: "" });
    }
  }

  async function handleRemoveWhitelist(email: string) {
    await supabase.from('whitelist').delete().eq('email', email);
    fetchWhitelist();
  }

  async function handleUpdateMember(e: React.FormEvent) {
    e.preventDefault();
    if (!editingMember) return;
    const newRole = isAdminPosition(editingMember.position) ? 'admin' : 'member';
    const { error } = await supabase.from('profiles').update({
      full_name: editingMember.full_name,
      department: editingMember.department,
      position: editingMember.position,
      degree: editingMember.degree,
      student_year: editingMember.student_year,
      role: newRole
    }).eq('id', editingMember.id);
    if (error) toast({ title: "Error", variant: "destructive" });
    else { toast({ title: "Saved" }); setEditingMember(null); fetchTeam(); }
  }

  async function handleRemoveMember(id: string) {
    if (!confirm("Remove this member from department?")) return;
    await supabase.from('profiles').update({ department: null, position: null, role: 'member' }).eq('id', id);
    fetchTeam();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{isSuperAdmin ? "Global Team Management" : `${myDept} Management`}</h2>
          <p className="text-muted-foreground">Manage your department members and pre-approve new signups.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search members..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-white" />
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white gap-2"><UserPlus className="w-4 h-4" /> Add Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Pre-Approve Member</DialogTitle><DialogDescription>They will gain access upon registration.</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Email (Required)" value={newMemberData.email} onChange={e => setNewMemberData({ ...newMemberData, email: e.target.value })} />
                <Input placeholder="Full Name" value={newMemberData.full_name} onChange={e => setNewMemberData({ ...newMemberData, full_name: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Degree" value={newMemberData.degree} onChange={e => setNewMemberData({ ...newMemberData, degree: e.target.value })} />
                  <Select value={newMemberData.student_year} onValueChange={v => setNewMemberData({ ...newMemberData, student_year: v })}>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent><SelectItem value="1º Ano">1st Year</SelectItem><SelectItem value="2º Ano">2nd Year</SelectItem><SelectItem value="3º Ano">3rd Year</SelectItem><SelectItem value="Mestrado">Masters</SelectItem></SelectContent>
                  </Select>
                </div>
                {isSuperAdmin && (
                  <Select onValueChange={v => (newMemberData as any).departmentOverride = v}>
                    <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                    <SelectContent><SelectItem value="Trading">Trading</SelectItem><SelectItem value="Asset Management">Asset Management</SelectItem><SelectItem value="Research">Research</SelectItem><SelectItem value="Operations">Operations</SelectItem></SelectContent>
                  </Select>
                )}
                <div className="space-y-3 pt-2 border-t">
                  <Label>Position</Label>
                  <Select value={roleSelectionType} onValueChange={(val: any) => {
                    setRoleSelectionType(val);
                    setNewMemberData({ ...newMemberData, position: val === "Head" ? "Head" : "" });
                  }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Head">Head (Admin)</SelectItem><SelectItem value="Custom">Custom Role</SelectItem></SelectContent>
                  </Select>
                  {roleSelectionType === "Custom" && (
                    <Input placeholder="Ex: Analyst, Junior..." value={newMemberData.position} onChange={e => setNewMemberData({ ...newMemberData, position: e.target.value })} />
                  )}
                </div>
                <Button onClick={handlePreRegister} className="w-full bg-red-600 hover:bg-red-700">Add to Whitelist</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredWhitelist.length > 0 && (
        <Card className="border-yellow-500/30 bg-yellow-50/50">
          <CardHeader className="py-3"><CardTitle className="text-sm font-bold text-yellow-700 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" /> Pending Registration ({filteredWhitelist.length})</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {filteredWhitelist.map((w) => (
                  <TableRow key={w.email} className="hover:bg-yellow-100/50">
                    <TableCell className="font-medium">{w.email}</TableCell>
                    <TableCell>{w.full_name}</TableCell>
                    {isSuperAdmin && <TableCell><Badge variant="outline" className="bg-white">{w.department}</Badge></TableCell>}
                    <TableCell>{w.position}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveWhitelist(w.email)} className="text-red-500 h-8 w-8 p-0 hover:bg-red-100"><Trash2 className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card className="border-gray-200 shadow-sm">
        <CardHeader><CardTitle>Active Team Members</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow><TableHead>Member</TableHead><TableHead className="hidden md:table-cell">Academic Info</TableHead>{isSuperAdmin && <TableHead>Dept.</TableHead>}<TableHead>Role</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border"><AvatarImage src={member.avatar_url} /><AvatarFallback>{member.email.charAt(0)}</AvatarFallback></Avatar>
                    <div><div className="font-medium text-gray-900">{member.full_name}</div><div className="text-xs text-gray-500">{member.email}</div></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><div className="text-sm">{member.degree}</div><div className="text-xs text-gray-500">{member.student_year}</div></TableCell>
                  {isSuperAdmin && <TableCell><Badge variant="outline" className="bg-white">{member.department}</Badge></TableCell>}
                  <TableCell><Badge variant={member.role === 'admin' ? "default" : "secondary"} className={member.role === 'admin' ? "bg-gray-900" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}>{member.position}</Badge></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4 text-gray-500" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingMember(member)}><Edit className="w-4 h-4 mr-2" /> Edit Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRemoveMember(member.id)} className="text-red-600 focus:text-red-600"><Trash2 className="w-4 h-4 mr-2" /> Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog (Hidden logic) */}
      <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Member</DialogTitle></DialogHeader>
          {editingMember && (
            <form onSubmit={handleUpdateMember} className="space-y-4 pt-4">
              <Input value={editingMember.full_name || ''} onChange={e => setEditingMember({ ...editingMember, full_name: e.target.value })} placeholder="Name" />
              <div className="grid grid-cols-2 gap-4">
                <Input value={editingMember.degree || ''} onChange={e => setEditingMember({ ...editingMember, degree: e.target.value })} placeholder="Degree" />
                <Input value={editingMember.student_year || ''} onChange={e => setEditingMember({ ...editingMember, student_year: e.target.value })} placeholder="Year" />
              </div>
              {isSuperAdmin && (
                <Select value={editingMember.department || ''} onValueChange={v => setEditingMember({ ...editingMember, department: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Trading">Trading</SelectItem><SelectItem value="Asset Management">Asset Management</SelectItem><SelectItem value="Research">Research</SelectItem><SelectItem value="Operations">Operations</SelectItem></SelectContent>
                </Select>
              )}
              <Input value={editingMember.position || ''} onChange={e => setEditingMember({ ...editingMember, position: e.target.value })} placeholder="Role / Position" />
              <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// --- 3. REPOSITÓRIO AVANÇADO (ATUALIZADO COM E-BOOKS) ---
const AdvancedRepository = ({ userProfile, isAdmin }: { userProfile: Profile | null, isAdmin: boolean }) => {
  const [files, setFiles] = useState<RepoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editMode, setEditMode] = useState<RepoFile | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", category: "General", department: "Global", file: null as File | null });

  useEffect(() => { fetchFiles(); if (userProfile?.department) setFilterDept(userProfile.department); }, [userProfile]);

  async function fetchFiles() {
    const { data, error } = await supabase.from('repository_files').select('*').order('created_at', { ascending: false });
    if (!error) setFiles(data as RepoFile[]);
    setLoading(false);
  }

  async function handleDownload(filePath: string) {
    const { data } = await supabase.storage.from('club-repository').createSignedUrl(filePath, 60);
    if (data) window.open(data.signedUrl, '_blank');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsUploading(true);
    try {
      let filePath = editMode ? editMode.file_path : "";
      let fileType = editMode ? editMode.file_type : "unknown";
      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        const { error: uploadErr, data: uploadData } = await supabase.storage.from('club-repository').upload(fileName, formData.file);
        if (uploadErr) throw uploadErr;
        filePath = uploadData.path; fileType = fileExt || "unknown";
      }
      const payload = { title: formData.title, description: formData.description, category: formData.category, department: formData.department };
      if (formData.file) Object.assign(payload, { file_path: filePath, file_type: fileType });

      if (editMode) await supabase.from('repository_files').update(payload).eq('id', editMode.id);
      else await supabase.from('repository_files').insert({ ...payload, file_path: filePath, file_type: fileType });

      toast({ title: "Success!" }); setIsModalOpen(false); setEditMode(null); fetchFiles();
    } catch (error: any) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    finally { setIsUploading(false); }
  }

  async function handleDelete(file: RepoFile) {
    if (!confirm("Are you sure?")) return;
    await supabase.storage.from('club-repository').remove([file.file_path]);
    await supabase.from('repository_files').delete().eq('id', file.id);
    fetchFiles();
  }

  const filteredFiles = files.filter(f => {
    return f.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory === "All" || f.category === filterCategory) &&
      (filterDept === "All" || f.department === filterDept);
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)]">
      {/* Sidebar Filters */}
      <Card className="w-full lg:w-72 h-fit flex-shrink-0 bg-white border-gray-200 shadow-sm">
        <CardHeader className="pb-4"><CardTitle className="text-base flex items-center gap-2 font-bold"><Filter className="w-4 h-4" /> Filters</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2"><Label className="text-xs font-bold uppercase text-gray-500">Search</Label><div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" /><Input placeholder="Filename..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} /></div></div>
          
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-gray-500">Department</Label>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
                <SelectItem value="Trading">Trading</SelectItem>
                <SelectItem value="Asset Management">Asset Management</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-gray-500">Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Ebook">E-books</SelectItem>
                <SelectItem value="Workshop">Workshops & Slides</SelectItem>
                <SelectItem value="Template">Templates</SelectItem>
                <SelectItem value="Report">Reports</SelectItem>
                <SelectItem value="Meeting Notes">Meeting Minutes</SelectItem>
                <SelectItem value="Data">Data & Models</SelectItem>
                <SelectItem value="Cheatsheet">Cheatsheets</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex justify-between items-center">
          <div><h2 className="text-2xl font-bold tracking-tight">Internal Repository</h2><p className="text-muted-foreground">{filteredFiles.length} files available.</p></div>
          {isAdmin && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild><Button onClick={() => { setEditMode(null); setFormData({ title: "", description: "", category: "General", department: "Global", file: null }); }} className="bg-black text-white hover:bg-gray-800"><Plus className="w-4 h-4 mr-2" /> Upload File</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>{editMode ? "Edit File" : "Upload File"}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Document Title" required />
                  <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Short Description" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Ebook">E-book</SelectItem>
                        <SelectItem value="Workshop">Workshop / Slides</SelectItem>
                        <SelectItem value="Template">Template</SelectItem>
                        <SelectItem value="Report">Report</SelectItem>
                        <SelectItem value="Meeting Notes">Meeting Notes</SelectItem>
                        <SelectItem value="Data">Data</SelectItem>
                        <SelectItem value="Cheatsheet">Cheatsheet</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={formData.department} onValueChange={v => setFormData({ ...formData, department: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Global">Global</SelectItem>
                        <SelectItem value="Trading">Trading</SelectItem>
                        <SelectItem value="Asset Management">Asset Management</SelectItem>
                        <SelectItem value="Research">Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Input type="file" onChange={e => setFormData({ ...formData, file: e.target.files?.[0] || null })} required={!editMode} />
                  <Button type="submit" disabled={isUploading} className="w-full bg-red-600 hover:bg-red-700 text-white">{isUploading ? "Uploading..." : "Save"}</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <ScrollArea className="h-full pr-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200 flex flex-col justify-between overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors">{getFileIcon(file.file_type)}</div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-red-600 transition-colors">{file.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1 text-xs">{file.description || "No description provided."}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0"><div className="flex flex-wrap gap-2"><Badge variant="secondary" className="text-[10px] bg-gray-100">{file.category}</Badge><Badge variant="outline" className="text-[10px]">{file.department}</Badge></div></CardContent>
                <CardFooter className="pt-3 pb-3 px-4 flex gap-2 border-t bg-gray-50/50 mt-auto">
                  <Button variant="default" size="sm" className="w-full gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black shadow-sm" onClick={() => handleDownload(file.file_path)}><Download className="w-3 h-3" /> Download</Button>
                  {isAdmin && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-9 w-9"><MoreVertical className="w-3 h-3 text-gray-500" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setEditMode(file); setFormData({ title: file.title, description: file.description, category: file.category, department: file.department, file: null }); setIsModalOpen(true); }}><Edit className="w-3 h-3 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(file)} className="text-red-600"><Trash2 className="w-3 h-3 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

// --- 4. ADMIN CMS ---
const AdminCMS = ({ myProfile }: { myProfile: Profile | null }) => {
  const [publicReports, setPublicReports] = useState<PublicReport[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const [reportDept, setReportDept] = useState("Research");
  const [editMode, setEditMode] = useState<PublicReport | null>(null);

  const isSuperAdmin = isSuperAdminPosition(myProfile?.position);
  useEffect(() => { if (myProfile?.department && !isSuperAdmin) setReportDept(myProfile.department); }, [myProfile, isSuperAdmin]);
  useEffect(() => { fetchPublicReports(); }, []);

  async function fetchPublicReports() {
    const { data } = await supabase.from('public_reports').select('*').order('created_at', { ascending: false });
    if (data) setPublicReports(data as PublicReport[]);
  }

  const handlePublicPublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as any;
    const pdfFile = form.file.files[0];
    const coverFile = form.cover.files[0];

    if (!pdfFile && !editMode) return alert("PDF File required");

    setUploading(true);
    try {
      let publicUrl = editMode ? editMode.file_url : "";
      let coverUrl = editMode ? (editMode as any).cover_url : null;

      if (pdfFile) {
        const fileName = `reports/${Date.now()}_${pdfFile.name}`;
        await supabase.storage.from('public-reports').upload(fileName, pdfFile);
        const { data } = supabase.storage.from('public-reports').getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      }

      if (coverFile) {
        const coverName = `covers/${Date.now()}_${coverFile.name}`;
        await supabase.storage.from('public-reports').upload(coverName, coverFile);
        const { data } = supabase.storage.from('public-reports').getPublicUrl(coverName);
        coverUrl = data.publicUrl;
      }

      const categoryToSave = isSuperAdmin ? reportDept : (myProfile?.department || "Research");

      const payload = {
        title: reportTitle,
        description: reportDesc,
        category: categoryToSave,
        cover_url: coverUrl,
        ...(pdfFile && { file_url: publicUrl })
      };

      if (editMode) {
        await supabase.from('public_reports').update(payload).eq('id', editMode.id);
        toast({ title: "Updated!" });
      } else {
        await supabase.from('public_reports').insert({ ...payload, file_url: publicUrl });
        toast({ title: "Published!" });
      }

      setReportTitle("");
      setReportDesc("");
      setEditMode(null);
      form.reset();
      fetchPublicReports();

    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  async function handleDeleteReport(id: string) {
    if (!confirm("Delete from public site?")) return;
    await supabase.from('public_reports').delete().eq('id', id);
    fetchPublicReports();
  }

  async function toggleVisibility(report: PublicReport) {
    await supabase.from('public_reports').update({ is_visible: !report.is_visible }).eq('id', report.id);
    fetchPublicReports();
  }

  return (
    <div className="space-y-8 pb-10">
      <div><h2 className="text-3xl font-bold tracking-tight">Public Website CMS</h2><p className="text-muted-foreground">Manage content visible on the Reports page.</p></div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="border-gray-200 h-fit lg:col-span-1 shadow-md">
          <CardHeader><CardTitle>{editMode ? "Edit Report" : "New Publication"}</CardTitle><CardDescription>{isSuperAdmin ? "Super Admin Mode" : `Publishing as: ${myProfile?.department}`}</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={handlePublicPublish} className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input value={reportTitle} onChange={e => setReportTitle(e.target.value)} required /></div>
              <div className="space-y-2"><Label>Department</Label><Select value={reportDept} onValueChange={setReportDept} disabled={!isSuperAdmin}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Trading">Trading</SelectItem><SelectItem value="Asset Management">Asset Management</SelectItem><SelectItem value="Research">Research</SelectItem><SelectItem value="Operations">Operations</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={reportDesc} onChange={e => setReportDesc(e.target.value)} rows={3} /></div>
              <div className="space-y-2"><Label>{editMode ? "Replace PDF (Optional)" : "Report PDF"}</Label><Input type="file" name="file" accept="application/pdf" required={!editMode} /></div>
              <div className="space-y-2"><Label>Cover Image (Optional)</Label><Input type="file" name="cover" accept="image/*" /></div>
              <div className="flex gap-2 pt-2">{editMode && <Button type="button" variant="outline" onClick={() => { setEditMode(null); setReportTitle(""); setReportDesc(""); }} className="flex-1">Cancel</Button>}<Button type="submit" disabled={uploading} className="flex-1 bg-red-600 hover:bg-red-700">{uploading ? "Publishing..." : (editMode ? "Update" : "Publish")}</Button></div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-gray-200 shadow-sm">
          <CardHeader><CardTitle>Live Reports</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader><TableRow><TableHead>Report</TableHead><TableHead>Dept.</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {publicReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell><div className="font-medium truncate max-w-[150px]">{report.title}</div><div className="text-xs text-muted-foreground truncate max-w-[150px]">{report.description}</div></TableCell>
                      <TableCell><Badge variant="outline">{report.category}</Badge></TableCell>
                      <TableCell><Button variant="ghost" size="sm" onClick={() => toggleVisibility(report)} className={report.is_visible ? "text-green-600 bg-green-50 hover:bg-green-100" : "text-gray-400"}>{report.is_visible ? "Visible" : "Hidden"}</Button></TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="icon" onClick={() => { setEditMode(report); setReportTitle(report.title); setReportDesc(report.description); setReportDept(report.category); }}><Edit className="w-4 h-4" /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteReport(report.id)}><Trash2 className="w-4 h-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// --- 5. PERFIL PRO ---
const ProfileSettings = ({ profile, user, signOut, refreshProfile }: { profile: Profile | null, user: any, signOut: () => void, refreshProfile: () => void }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ full_name: "", degree: "", student_year: "", linkedin_url: "", bio: "" });

  useEffect(() => { if (profile) setFormData({ full_name: profile.full_name || "", degree: profile.degree || "", student_year: profile.student_year || "", linkedin_url: profile.linkedin_url || "", bio: profile.bio || "" }); }, [profile]);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setLoading(true);
    const file = e.target.files[0];
    const filePath = `${user.id}-${Math.random()}.${file.name.split('.').pop()}`;
    await supabase.storage.from('avatars').upload(filePath, file);
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id);
    toast({ title: "Photo Updated!" }); refreshProfile(); setLoading(false);
  }

  async function handleSaveProfile() {
    setLoading(true);
    await supabase.from('profiles').update(formData).eq('id', user.id);
    toast({ title: "Profile Saved" }); setLoading(false); refreshProfile();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-800"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-end -mt-12 gap-6">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Avatar className="w-32 h-32 border-4 border-white shadow-md"><AvatarImage src={profile?.avatar_url} className="object-cover" /><AvatarFallback className="text-4xl bg-gray-100 text-gray-500">{user.email.charAt(0)}</AvatarFallback></Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="w-8 h-8 text-white" /></div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
            </div>
            <div className="flex-1 space-y-1 pb-2">
              <h2 className="text-3xl font-bold text-gray-900">{profile?.full_name || "ITIC Member"}</h2>
              <div className="flex gap-2"><Badge className="bg-gray-900">{profile?.department || "General"}</Badge><Badge variant="outline">{profile?.position || "Member"}</Badge></div>
            </div>
            <Button variant="outline" onClick={signOut} className="text-red-600 hover:bg-red-50 border-red-200 mb-2 gap-2"><LogOut className="w-4 h-4" /> Sign Out</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-sm"><CardHeader><CardTitle>Personal Information</CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label>Full Name</Label><Input value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} /></div><div className="space-y-2"><Label>Email</Label><Input value={user.email} disabled className="bg-gray-50" /></div><div className="space-y-2"><Label>Bio</Label><Textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} rows={4} /></div></CardContent></Card>
        <Card className="shadow-sm"><CardHeader><CardTitle>Academic & Professional</CardTitle></CardHeader><CardContent className="space-y-4"><div className="space-y-2"><Label>Degree</Label><Input value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} /></div><div className="space-y-2"><Label>Academic Year</Label><Select value={formData.student_year} onValueChange={v => setFormData({ ...formData, student_year: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1º Ano">1st Year</SelectItem><SelectItem value="2º Ano">2nd Year</SelectItem><SelectItem value="3º Ano">3rd Year</SelectItem><SelectItem value="Mestrado 1º Ano">Masters 1st</SelectItem><SelectItem value="Mestrado 2º Ano">Masters 2nd</SelectItem><SelectItem value="Alumni">Alumni</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>LinkedIn URL</Label><Input value={formData.linkedin_url} onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })} /></div></CardContent></Card>
      </div>
      <div className="flex justify-end"><Button onClick={handleSaveProfile} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white px-8">{loading ? "Saving..." : "Save Changes"}</Button></div>
    </div>
  );
}

// --- MAIN DASHBOARD PAGE ---
export default function DashboardPage() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [myProfile, setMyProfile] = useState<Profile | null>(null);

  useEffect(() => { if (user) fetchMyProfile(); }, [user]);
  async function fetchMyProfile() {
    const { data } = await supabase.from('profiles').select('*').eq('id', user!.id).single();
    if (data) setMyProfile(data as Profile);
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "repository", label: "Repository", icon: FolderOpen },
    { id: "profile", label: "My Profile", icon: Settings },
  ];

  if (isAdmin) {
    menuItems.splice(2, 0, { id: "team", label: "Team Management", icon: Users });
    menuItems.splice(3, 0, { id: "admin", label: "Website CMS", icon: ShieldAlert });
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900 text-gray-300 border-r border-gray-800">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 transition-colors" onClick={() => navigate('/')}>
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-xl">
          <img src="/apple-touch-icon.png" alt="ITIC Logo" className="w-8 h-8" />
        </div>        <div><h1 className="font-bold text-lg leading-none text-white tracking-wide">ITIC</h1><p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Portal</p></div>
      </div>
      <div className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id ? "bg-white text-gray-900 shadow-md" : "hover:bg-gray-800 hover:text-white"}`}>
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-red-600" : "text-gray-500"}`} /> {item.label}
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-gray-800 bg-gray-950/50">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="w-9 h-9 border border-gray-700"><AvatarImage src={myProfile?.avatar_url} /><AvatarFallback className="bg-gray-800 text-gray-400">{user?.email?.charAt(0)}</AvatarFallback></Avatar>
          <div className="overflow-hidden"><p className="text-sm font-medium text-white truncate">{myProfile?.full_name || "User"}</p><p className="text-xs text-gray-500 truncate">{isAdmin ? 'Administrator' : 'Member'}</p></div>
        </div>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gray-50/50">
        <aside className="hidden md:block w-72 h-screen sticky top-0 shadow-2xl z-30"><SidebarContent /></aside>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="md:hidden h-16 border-b flex items-center justify-between px-4 bg-white sticky top-0 z-20 shadow-sm">
            <span className="font-bold text-lg text-gray-900">ITIC Portal</span>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}><SheetTrigger asChild><Button variant="ghost" size="icon"><Menu /></Button></SheetTrigger><SheetContent side="left" className="p-0 w-72"><SidebarContent /></SheetContent></Sheet>
          </header>
          <main className="flex-1 p-6 md:p-10 overflow-y-auto overflow-x-hidden">
            <div className="max-w-7xl mx-auto h-full">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="h-full">
                  {activeTab === 'overview' && <DashboardOverview user={user} profile={myProfile} setActiveTab={setActiveTab} />}
                  {activeTab === 'repository' && <AdvancedRepository userProfile={myProfile} isAdmin={isAdmin} />}
                  {activeTab === 'team' && isAdmin && <DepartmentManager myProfile={myProfile} />}
                  {activeTab === 'admin' && isAdmin && <AdminCMS myProfile={myProfile} />}
                  {activeTab === 'profile' && <ProfileSettings profile={myProfile} user={user} signOut={signOut} refreshProfile={fetchMyProfile} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}