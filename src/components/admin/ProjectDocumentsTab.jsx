import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Trash2, Download, FileText, Loader2 } from 'lucide-react';

export default function ProjectDocumentsTab() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      const { data, error } = await supabase.from('projects').select('id, digital_asset_name').order('digital_asset_name');
      if (error) {
        toast({ title: "Error al cargar proyectos", description: error.message, variant: "destructive" });
      } else {
        setProjects(data);
      }
      setLoadingProjects(false);
    };
    fetchProjects();
  }, []);

  const fetchDocuments = useCallback(async (projectId) => {
    if (!projectId) return;
    setLoadingDocs(true);
    const { data, error } = await supabase
      .from('project_documents')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error al cargar documentos del proyecto", description: error.message, variant: "destructive" });
    } else {
      setDocuments(data);
    }
    setLoadingDocs(false);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchDocuments(selectedProject);
    } else {
      setDocuments([]);
    }
  }, [selectedProject, fetchDocuments]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !docName || !selectedProject) {
      toast({ title: "Faltan datos", description: "Por favor, selecciona un proyecto, un archivo y escribe un nombre.", variant: "destructive" });
      return;
    }
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const filePath = `${selectedProject}/${Date.now()}-${docName.replace(/\s+/g, '-')}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project_documents')
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Error al subir archivo", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { error: dbError } = await supabase
      .from('project_documents')
      .insert([{ project_id: selectedProject, name: docName, file_path: filePath }]);

    if (dbError) {
      toast({ title: "Error al guardar en base de datos", description: dbError.message, variant: "destructive" });
    } else {
      toast({ title: "Documento subido", description: "El archivo se ha subido y guardado exitosamente." });
      setFile(null);
      setDocName('');
      document.getElementById('project-file-input').value = '';
      fetchDocuments(selectedProject);
    }
    setUploading(false);
  };

  const handleDelete = async (doc) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el documento "${doc.name}"?`)) return;

    const { error: storageError } = await supabase.storage
      .from('project_documents')
      .remove([doc.file_path]);

    if (storageError) {
      toast({ title: "Error al eliminar archivo", description: storageError.message, variant: "destructive" });
      return;
    }

    const { error: dbError } = await supabase
      .from('project_documents')
      .delete()
      .eq('id', doc.id);

    if (dbError) {
      toast({ title: "Error al eliminar de la base de datos", description: dbError.message, variant: "destructive" });
    } else {
      toast({ title: "Documento eliminado", description: "El documento ha sido eliminado." });
      fetchDocuments(selectedProject);
    }
  };

  const handleDownload = async (filePath) => {
    const { data, error } = await supabase.storage
      .from('project_documents')
      .getPublicUrl(filePath);

    if (error) {
      toast({ title: "Error al obtener URL", description: error.message, variant: "destructive" });
      return;
    }
    window.open(data.publicUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-emerald-400">Seleccionar Proyecto</CardTitle>
          <CardDescription className="text-emerald-200/70">Elige un proyecto para ver o añadir sus documentos.</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingProjects ? (
            <p className="text-emerald-200/70">Cargando proyectos...</p>
          ) : (
            <Select onValueChange={setSelectedProject} value={selectedProject || ''}>
              <SelectTrigger className="w-full lg:w-1/2 bg-black/50 border-emerald-500/30 focus:border-emerald-400">
                <SelectValue placeholder="Selecciona un proyecto" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-emerald-500/50 text-white">
                {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.digital_asset_name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {selectedProject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-emerald-400">Documentos del Proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingDocs ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-500/20 hover:bg-emerald-500/5">
                        <TableHead className="text-emerald-200">Nombre</TableHead>
                        <TableHead className="text-emerald-200">Fecha de Subida</TableHead>
                        <TableHead className="text-center text-emerald-200">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id} className="border-emerald-500/10 hover:bg-emerald-500/10">
                          <TableCell className="font-medium text-white flex items-center gap-2"><FileText className="w-4 h-4 text-emerald-300" /> {doc.name}</TableCell>
                          <TableCell className="text-emerald-300">{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.file_path)} className="text-blue-400 hover:text-blue-200 hover:bg-blue-500/10">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(doc)} className="text-red-400 hover:text-red-200 hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {!loadingDocs && documents.length === 0 && (
                  <p className="text-center py-8 text-emerald-200/70">Este proyecto no tiene documentos.</p>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-emerald-400">Subir Documento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-doc-name" className="text-emerald-200">Nombre del Documento</Label>
                    <Input id="project-doc-name" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Ej: Contrato PPA" className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-file-input" className="text-emerald-200">Archivo</Label>
                    <Input id="project-file-input" type="file" onChange={handleFileChange} className="bg-black/50 border-emerald-500/30 text-emerald-200/80 file:text-emerald-300 file:bg-emerald-500/10 file:border-0 file:px-3 file:py-1.5 file:rounded-md file:mr-3" />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600" disabled={uploading}>
                    {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                    {uploading ? 'Subiendo...' : 'Subir Documento'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}