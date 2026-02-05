import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AnimatePresence, motion } from "framer-motion";
import { 
  LayoutDashboard, FolderOpen, Users, Settings, LogOut, 
  ShieldAlert, FileText, UploadCloud, Download, Menu, 
  Trash2, Edit, Save, Camera, GraduationCap, Link as LinkIcon, Briefcase, Plus, UserPlus, Search, Filter, FileSpreadsheet, File, Eye, EyeOff
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
  category: string; // Armazena o Departamento (Trading, Research...)
  file_url: string;
  is_visible: boolean;
  created_at: string;
};

// --- FUNÇÕES AUXILIARES ---
const isAdminPosition = (position: string | undefined) => {
  return ['President', 'Vice-President', 'Head'].includes(position || '');
};

const isSuperAdminPosition = (position: string | undefined) => {
  return ['President', 'Vice-President'].includes(position || '');
};

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
  if (type.includes('xls') || type.includes('sheet')) return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
  return <File className="w-8 h-8 text-primary" />;
};

// --- COMPONENTES ---

// 1. OVERVIEW
const DashboardOverview = ({ user, profile }: { user: any, profile: Profile | null }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Avatar className="w-16 h-16 border-2 border-primary/20">
        <AvatarImage src={profile?.avatar_url} className="object-cover w-full h-full" />
        <AvatarFallback className="text-xl bg-primary/10 text-primary">
          {profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Olá, {profile?.full_name?.split(' ')[0] || "Membro"} 👋</h2>
        <p className="text-muted-foreground">Bem-vindo ao portal do ITIC.</p>
      </div>
    </div>
    
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departamento</CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{profile?.department || "Geral"}</div>
          <p className="text-xs text-muted-foreground">{profile?.position || "Membro"}</p>
        </CardContent>
      </Card>
      
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Equipa</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{profile?.role === 'admin' ? 'Gestor' : 'Membro'}</div>
          <p className="text-xs text-muted-foreground">Nível de Acesso</p>
        </CardContent>
      </Card>

      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Próxima Atividade</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Sunday Scan</div>
          <p className="text-xs text-muted-foreground">Domingo às 21:00</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

// 2. GESTÃO DE DEPARTAMENTO
const DepartmentManager = ({ myProfile }: { myProfile: Profile | null }) => {
  const [members, setMembers] = useState<Profile[]>([]);
  const [whitelisted, setWhitelisted] = useState<any[]>([]); 
  const [editingMember, setEditingMember] = useState<Profile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [roleSelectionType, setRoleSelectionType] = useState<"Head" | "Custom">("Custom");
  const [newMemberData, setNewMemberData] = useState({
    email: "",
    full_name: "",
    degree: "",
    student_year: "",
    position: "" 
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
      (item.email?.toLowerCase() || "").includes(lowerQuery) ||
      (item.department?.toLowerCase() || "").includes(lowerQuery)
    );
  };

  const filteredMembers = filterList(members);
  const filteredWhitelist = filterList(whitelisted);

  async function handlePreRegister() {
    if (!newMemberData.email || !newMemberData.full_name || !newMemberData.position) {
      return toast({ title: "Erro", description: "Preenche todos os campos.", variant: "destructive" });
    }
    const targetDept = isSuperAdmin ? (newMemberData as any).departmentOverride || myDept : myDept;
    const role = isAdminPosition(newMemberData.position) ? 'admin' : 'member';

    const { data: existing } = await supabase.from('profiles').select('id').eq('email', newMemberData.email).single();
    if (existing) return toast({ title: "Atenção", description: "Utilizador já existe.", variant: "destructive" });

    const { error } = await supabase.from('whitelist').upsert({
      email: newMemberData.email,
      full_name: newMemberData.full_name,
      department: targetDept,
      position: newMemberData.position,
      degree: newMemberData.degree,
      student_year: newMemberData.student_year,
      role: role
    });

    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Membro Pré-Adicionado!" });
      setIsAddModalOpen(false);
      fetchWhitelist();
      setNewMemberData({ email: "", full_name: "", degree: "", student_year: "", position: "" });
    }
  }

  async function handleRemoveWhitelist(email: string) {
    const { error } = await supabase.from('whitelist').delete().eq('email', email);
    if(!error) { toast({ title: "Removido" }); fetchWhitelist(); }
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
      if (error) toast({ title: "Erro", variant: "destructive" });
      else { toast({ title: "Guardado" }); setEditingMember(null); fetchTeam(); }
  }

  async function handleRemoveMember(id: string) {
      if(!confirm("Remover do departamento?")) return;
      const { error } = await supabase.from('profiles').update({ department: null, position: null, role: 'member' }).eq('id', id);
      if(!error) { toast({ title: "Removido" }); fetchTeam(); }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isSuperAdmin ? "Gestão Global" : `Departamento de ${myDept}`}
          </h2>
          <p className="text-muted-foreground">Adiciona membros novos e gere a equipa atual.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9"/>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 whitespace-nowrap"><UserPlus className="w-4 h-4" /> <span className="hidden sm:inline">Novo Membro</span></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader><DialogTitle>Adicionar Membro</DialogTitle><DialogDescription>O cargo será atribuído no registo.</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Email (Obrigatório)" value={newMemberData.email} onChange={e => setNewMemberData({...newMemberData, email: e.target.value})} />
                <Input placeholder="Nome Completo" value={newMemberData.full_name} onChange={e => setNewMemberData({...newMemberData, full_name: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Curso" value={newMemberData.degree} onChange={e => setNewMemberData({...newMemberData, degree: e.target.value})} />
                  <Select value={newMemberData.student_year} onValueChange={v => setNewMemberData({...newMemberData, student_year: v})}>
                    <SelectTrigger><SelectValue placeholder="Ano" /></SelectTrigger>
                    <SelectContent><SelectItem value="1º Ano">1º Ano</SelectItem><SelectItem value="2º Ano">2º Ano</SelectItem><SelectItem value="3º Ano">3º Ano</SelectItem><SelectItem value="Mestrado">Mestrado</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 pt-2 border-t">
                  <Label>Cargo</Label>
                  <Select value={roleSelectionType} onValueChange={(val: any) => {
                      setRoleSelectionType(val);
                      if(val === "Head") setNewMemberData({...newMemberData, position: "Head"});
                      else setNewMemberData({...newMemberData, position: ""});
                    }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Head">Head (Admin)</SelectItem><SelectItem value="Custom">Outro Cargo</SelectItem></SelectContent>
                  </Select>
                  {roleSelectionType === "Custom" && (
                    <Input placeholder="Ex: Analyst..." value={newMemberData.position} onChange={e => setNewMemberData({...newMemberData, position: e.target.value})} />
                  )}
                </div>
                <Button onClick={handlePreRegister} className="w-full">Pré-Aprovar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {whitelisted.length > 0 && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardHeader className="py-4"><CardTitle className="text-sm font-bold text-yellow-600">A aguardar registo ({filteredWhitelist.length})</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {filteredWhitelist.map((w) => (
                   <TableRow key={w.email}>
                    <TableCell className="font-medium text-muted-foreground">{w.email}</TableCell>
                    <TableCell>{w.full_name}</TableCell>
                    {isSuperAdmin && <TableCell><Badge variant="outline">{w.department}</Badge></TableCell>}
                    <TableCell><Badge variant="outline" className="text-yellow-600 bg-yellow-100">Pendente</Badge></TableCell>
                    <TableCell>{w.position}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm" onClick={() => handleRemoveWhitelist(w.email)} className="text-destructive h-8 w-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                    </TableCell>
                   </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Membros Ativos</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Membro</TableHead><TableHead className="hidden md:table-cell">Académico</TableHead>{isSuperAdmin && <TableHead>Dep.</TableHead>}<TableHead>Cargo</TableHead><TableHead className="text-right">Ações</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border"><AvatarImage src={member.avatar_url} className="object-cover" /><AvatarFallback>{member.email.charAt(0)}</AvatarFallback></Avatar>
                    <div><div className="font-medium">{member.full_name}</div><div className="text-xs text-muted-foreground">{member.email}</div></div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell"><div className="text-sm">{member.degree}</div><div className="text-xs text-muted-foreground">{member.student_year}</div></TableCell>
                  {isSuperAdmin && <TableCell><Badge variant="outline">{member.department}</Badge></TableCell>}
                  <TableCell><Badge variant={member.role === 'admin' ? "default" : "secondary"}>{member.position}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => setEditingMember(member)}><Edit className="w-4 h-4" /></Button></DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Editar</DialogTitle></DialogHeader>
                          {editingMember && (
                            <form onSubmit={handleUpdateMember} className="space-y-4 pt-4">
                              <Input value={editingMember.full_name || ''} onChange={e => setEditingMember({...editingMember, full_name: e.target.value})} />
                              <div className="grid grid-cols-2 gap-4">
                                <Input value={editingMember.degree || ''} onChange={e => setEditingMember({...editingMember, degree: e.target.value})} />
                                <Input value={editingMember.student_year || ''} onChange={e => setEditingMember({...editingMember, student_year: e.target.value})} />
                              </div>
                              {isSuperAdmin && (
                                <Select value={editingMember.department || ''} onValueChange={v => setEditingMember({...editingMember, department: v})}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent><SelectItem value="Trading">Trading</SelectItem><SelectItem value="Asset Management">Asset Management</SelectItem><SelectItem value="Research">Research</SelectItem><SelectItem value="Operations">Operations</SelectItem></SelectContent>
                                </Select>
                              )}
                              <Input value={editingMember.position || ''} onChange={e => setEditingMember({...editingMember, position: e.target.value})} placeholder="Cargo" />
                              <Button type="submit" className="w-full">Guardar</Button>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveMember(member.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// 3. REPOSITÓRIO AVANÇADO
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
  const [formData, setFormData] = useState({ title: "", description: "", category: "Geral", department: "Global", file: null as File | null });

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

      toast({ title: "Sucesso!" }); setIsModalOpen(false); setEditMode(null); fetchFiles();
    } catch (error: any) { toast({ title: "Erro", description: error.message, variant: "destructive" }); } 
    finally { setIsUploading(false); }
  }

  async function handleDelete(file: RepoFile) {
    if (!confirm("Tem a certeza?")) return;
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
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
      <Card className="w-full lg:w-64 h-fit lg:h-full flex-shrink-0 border-r-0 lg:border-r bg-card/50">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Filter className="w-4 h-4" /> Filtros</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2"><Label>Pesquisa</Label><div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Ficheiro..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} /></div></div>
          <div className="space-y-2"><Label>Departamento</Label><Select value={filterDept} onValueChange={setFilterDept}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All">Todos</SelectItem><SelectItem value="Global">Global</SelectItem><SelectItem value="Trading">Trading</SelectItem><SelectItem value="Asset Management">Asset Management</SelectItem><SelectItem value="Research">Research</SelectItem></SelectContent></Select></div>
          <div className="space-y-2"><Label>Categoria</Label><Select value={filterCategory} onValueChange={setFilterCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All">Todas</SelectItem><SelectItem value="Geral">Geral</SelectItem><SelectItem value="Template">Template</SelectItem><SelectItem value="Report">Report</SelectItem><SelectItem value="Meeting Notes">Atas</SelectItem><SelectItem value="Data">Dados</SelectItem></SelectContent></Select></div>
        </CardContent>
      </Card>

      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex justify-between items-center">
          <div><h2 className="text-3xl font-bold tracking-tight">Repositório</h2><p className="text-muted-foreground">{filteredFiles.length} ficheiros.</p></div>
          {isAdmin && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild><Button onClick={() => { setEditMode(null); setFormData({ title: "", description: "", category: "Geral", department: "Global", file: null }); }}><Plus className="w-4 h-4 mr-2" /> Adicionar</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>{editMode ? "Editar" : "Adicionar"}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Título" required />
                  <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Descrição" />
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Geral">Geral</SelectItem><SelectItem value="Template">Template</SelectItem><SelectItem value="Report">Report</SelectItem><SelectItem value="Meeting Notes">Atas</SelectItem><SelectItem value="Data">Dados</SelectItem></SelectContent></Select>
                    <Select value={formData.department} onValueChange={v => setFormData({...formData, department: v})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Global">Global</SelectItem><SelectItem value="Trading">Trading</SelectItem><SelectItem value="Asset Management">Asset Management</SelectItem><SelectItem value="Research">Research</SelectItem></SelectContent></Select>
                  </div>
                  <Input type="file" onChange={e => setFormData({...formData, file: e.target.files?.[0] || null})} required={!editMode} />
                  <Button type="submit" disabled={isUploading} className="w-full">{isUploading ? "A carregar..." : "Guardar"}</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <ScrollArea className="h-full pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="group hover:shadow-md transition-shadow flex flex-col justify-between">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex gap-3">
                    <div className="p-2 bg-muted rounded-md h-fit">{getFileIcon(file.file_type)}</div>
                    <div><CardTitle className="text-base font-semibold line-clamp-1">{file.title}</CardTitle><CardDescription className="line-clamp-2 mt-1 text-xs">{file.description || "Sem descrição."}</CardDescription></div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2"><div className="flex flex-wrap gap-2 mb-2"><Badge variant="secondary" className="text-[10px]">{file.category}</Badge><Badge variant="outline" className="text-[10px]">{file.department}</Badge></div></CardContent>
                <CardFooter className="pt-0 flex gap-2 border-t bg-muted/10 p-4">
                  <Button variant="default" size="sm" className="w-full gap-2" onClick={() => handleDownload(file.file_path)}><Download className="w-3 h-3" /> Download</Button>
                  {isAdmin && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditMode(file); setFormData({ title: file.title, description: file.description, category: file.category, department: file.department, file: null }); setIsModalOpen(true); }}><Edit className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(file)}><Trash2 className="w-3 h-3" /></Button>
                    </div>
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

// 4. ADMIN CMS (GESTOR DE REPORTS PÚBLICOS)
const AdminCMS = ({ myProfile }: { myProfile: Profile | null }) => {
  const [publicReports, setPublicReports] = useState<PublicReport[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  // Form State
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const [reportDept, setReportDept] = useState("Research");
  const [editMode, setEditMode] = useState<PublicReport | null>(null);

  // Permissões
  const isSuperAdmin = isSuperAdminPosition(myProfile?.position);
  // Apenas Super Admins podem escolher. Outros ficam presos ao seu departamento.
  useEffect(() => {
    if (myProfile?.department && !isSuperAdmin) setReportDept(myProfile.department);
  }, [myProfile, isSuperAdmin]);

  useEffect(() => { fetchPublicReports(); }, []);

  async function fetchPublicReports() {
    const { data } = await supabase.from('public_reports').select('*').order('created_at', { ascending: false });
    if (data) setPublicReports(data as PublicReport[]);
  }

  const handlePublicPublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = (e.target as any).file.files[0];
    if (!fileInput && !editMode) return alert("Ficheiro necessário");

    setUploading(true);
    try {
      let publicUrl = editMode ? editMode.file_url : "";

      if (fileInput) {
        const fileName = `reports/${Date.now()}_${fileInput.name}`;
        await supabase.storage.from('public-reports').upload(fileName, fileInput);
        const { data } = supabase.storage.from('public-reports').getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      }

      // Se for Super Admin usa o que escolheu, se não usa o do perfil.
      const categoryToSave = isSuperAdmin ? reportDept : (myProfile?.department || "Research");

      if (editMode) {
        await supabase.from('public_reports').update({
          title: reportTitle, description: reportDesc, category: categoryToSave, 
          ...(fileInput && { file_url: publicUrl })
        }).eq('id', editMode.id);
        toast({ title: "Report atualizado!" });
      } else {
        await supabase.from('public_reports').insert({
          title: reportTitle, description: reportDesc, category: categoryToSave, file_url: publicUrl
        });
        toast({ title: "Report publicado!" });
      }
      
      setReportTitle(""); setReportDesc(""); setEditMode(null); (e.target as any).reset();
      fetchPublicReports();
    } catch (error: any) { toast({ title: "Erro", variant: "destructive" }); }
    finally { setUploading(false); }
  };

  async function handleDeleteReport(id: string) {
    if(!confirm("Apagar report do site público?")) return;
    await supabase.from('public_reports').delete().eq('id', id);
    fetchPublicReports();
  }

  async function toggleVisibility(report: PublicReport) {
    await supabase.from('public_reports').update({ is_visible: !report.is_visible }).eq('id', report.id);
    fetchPublicReports();
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gestão do Site Público</h2>
        <p className="text-muted-foreground">Publica e gere os reports visíveis para todos.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* FORMULÁRIO */}
        <Card className="border-primary/20 h-fit lg:col-span-1">
          <CardHeader>
            <CardTitle>{editMode ? "Editar Report" : "Novo Public Report"}</CardTitle>
            <CardDescription>
              {isSuperAdmin ? "Modo Presidência (Acesso Total)" : `Publicar em: ${myProfile?.department}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePublicPublish} className="space-y-4">
              <div className="space-y-2"><Label>Título</Label><Input value={reportTitle} onChange={e => setReportTitle(e.target.value)} required /></div>
              <div className="space-y-2"><Label>Departamento</Label>
                <Select value={reportDept} onValueChange={setReportDept} disabled={!isSuperAdmin}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trading">Trading</SelectItem>
                    <SelectItem value="Asset Management">Asset Management</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Descrição</Label><Textarea value={reportDesc} onChange={e => setReportDesc(e.target.value)} /></div>
              <div className="space-y-2"><Label>{editMode ? "Substituir PDF (Opcional)" : "Ficheiro PDF"}</Label><Input type="file" name="file" accept="application/pdf" required={!editMode} /></div>
              
              <div className="flex gap-2">
                {editMode && <Button type="button" variant="outline" onClick={() => {setEditMode(null); setReportTitle(""); setReportDesc("");}}>Cancelar</Button>}
                <Button type="submit" disabled={uploading} className="w-full">{uploading ? "A carregar..." : (editMode ? "Atualizar" : "Publicar")}</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* LISTA DE REPORTS */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Reports Publicados</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader><TableRow><TableHead>Report</TableHead><TableHead>Dep.</TableHead><TableHead>Visível</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader>
                <TableBody>
                  {publicReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="font-medium truncate max-w-[150px]">{report.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">{report.description}</div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{report.category}</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => toggleVisibility(report)}>
                          {report.is_visible ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => {
                          setEditMode(report);
                          setReportTitle(report.title);
                          setReportDesc(report.description);
                          setReportDept(report.category);
                        }}><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteReport(report.id)}><Trash2 className="w-4 h-4" /></Button>
                      </TableCell>
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

// 5. PERFIL PRO
const ProfileSettings = ({ profile, user, signOut, refreshProfile }: { profile: Profile | null, user: any, signOut: () => void, refreshProfile: () => void }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ full_name: "", degree: "", student_year: "", linkedin_url: "", bio: "" });

  useEffect(() => {
    if (profile) setFormData({ full_name: profile.full_name || "", degree: profile.degree || "", student_year: profile.student_year || "", linkedin_url: profile.linkedin_url || "", bio: profile.bio || "" });
  }, [profile]);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setLoading(true);
    const file = e.target.files[0];
    const filePath = `${user.id}-${Math.random()}.${file.name.split('.').pop()}`;
    await supabase.storage.from('avatars').upload(filePath, file);
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id);
    toast({ title: "Foto atualizada!" }); refreshProfile(); setLoading(false);
  }

  async function handleSaveProfile() {
    setLoading(true);
    await supabase.from('profiles').update(formData).eq('id', user.id);
    toast({ title: "Guardado!" }); setLoading(false); refreshProfile();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Avatar className="w-32 h-32 border-4 border-white/10 shadow-xl"><AvatarImage src={profile?.avatar_url} className="object-cover" /><AvatarFallback className="text-4xl bg-gray-700 text-white">{user.email.charAt(0)}</AvatarFallback></Avatar>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="w-8 h-8 text-white" /></div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold">{profile?.full_name || "Membro ITIC"}</h2>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start"><Badge variant="secondary" className="bg-white/20 text-white">{profile?.department || "Geral"}</Badge><Badge variant="outline" className="text-white">{profile?.position || "Membro"}</Badge></div>
          </div>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Pessoal</CardTitle></CardHeader><CardContent className="space-y-4"><Input value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} placeholder="Nome" /><Input value={user.email} disabled className="bg-muted" /><Textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="Bio" /></CardContent></Card>
        <Card><CardHeader><CardTitle>Académico</CardTitle></CardHeader><CardContent className="space-y-4"><Input value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} placeholder="Curso" /><Select value={formData.student_year} onValueChange={v => setFormData({...formData, student_year: v})}><SelectTrigger><SelectValue placeholder="Ano" /></SelectTrigger><SelectContent><SelectItem value="1º Ano">1º Ano</SelectItem><SelectItem value="2º Ano">2º Ano</SelectItem><SelectItem value="3º Ano">3º Ano</SelectItem><SelectItem value="Mestrado 1º Ano">Mestrado 1º Ano</SelectItem><SelectItem value="Mestrado 2º Ano">Mestrado 2º Ano</SelectItem><SelectItem value="Alumni">Alumni</SelectItem></SelectContent></Select><Input value={formData.linkedin_url} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} placeholder="LinkedIn" /></CardContent></Card>
      </div>
      <div className="flex justify-between pt-4 border-t"><Button variant="outline" onClick={signOut} className="text-destructive">Sair</Button><Button onClick={handleSaveProfile} disabled={loading}>{loading ? "..." : "Guardar"}</Button></div>
    </div>
  );
}

// --- MAIN DASHBOARD PAGE ---
export default function DashboardPage() {
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [myProfile, setMyProfile] = useState<Profile | null>(null);

  useEffect(() => { if(user) fetchMyProfile(); }, [user]);

  async function fetchMyProfile() {
    const { data } = await supabase.from('profiles').select('*').eq('id', user!.id).single();
    if(data) setMyProfile(data as Profile);
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "repository", label: "Repositório", icon: FolderOpen },
    { id: "profile", label: "Meu Perfil", icon: Settings },
  ];

  if (isAdmin) {
    menuItems.splice(2, 0, { id: "team", label: "Gestão Equipa", icon: Users });
    menuItems.splice(3, 0, { id: "admin", label: "Gestão Site", icon: ShieldAlert });
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6 border-b flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">I</div>
        <div><h1 className="font-bold text-lg leading-none">ITIC</h1><p className="text-xs text-muted-foreground">Portal</p></div>
      </div>
      <div className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-muted"}`}>
            <item.icon className="w-5 h-5" /> {item.label}
          </button>
        ))}
      </div>
      <div className="p-4 border-t bg-muted/20 flex items-center gap-3 px-2">
        <Avatar className="w-8 h-8"><AvatarImage src={myProfile?.avatar_url} className="object-cover" /><AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback></Avatar>
        <div className="overflow-hidden"><p className="text-sm font-medium truncate">{myProfile?.full_name || user?.email}</p><p className="text-xs text-muted-foreground truncate">{isAdmin ? 'Admin' : 'Membro'}</p></div>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-background">
        <aside className="hidden md:block w-64 h-screen sticky top-0"><SidebarContent /></aside>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="md:hidden h-16 border-b flex items-center justify-between px-4 bg-card sticky top-0 z-20">
            <span className="font-bold">Portal ITIC</span>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}><SheetTrigger asChild><Button variant="ghost" size="icon"><Menu /></Button></SheetTrigger><SheetContent side="left" className="p-0 w-72"><SidebarContent /></SheetContent></Sheet>
          </header>
          <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
            <div className="max-w-7xl mx-auto h-full">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full">
                  {activeTab === 'overview' && <DashboardOverview user={user} profile={myProfile} />}
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