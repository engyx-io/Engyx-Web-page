import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Trash2, Download, FileText, Loader2 } from 'lucide-react';

export default function DocumentsTab() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState('');

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error al cargar documentos", description: error.message, variant: "destructive" });
    } else {
      setDocuments(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !docName) {
      toast({ title: "Faltan datos", description: "Por favor, selecciona un archivo y escribe un nombre.", variant: "destructive" });
      return;
    }
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const filePath = `${Date.now()}-${docName.replace(/\s+/g, '-')}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('general_documents')
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Error al subir archivo", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { error: dbError } = await supabase
      .from('documents')
      .insert([{ name: docName, file_path: filePath }]);

    if (dbError) {
      toast({ title: "Error al guardar en base de datos", description: dbError.message, variant: "destructive" });
    } else {
      toast({ title: "Documento subido", description: "El archivo se ha subido y guardado exitosamente." });
      setFile(null);
      setDocName('');
      document.getElementById('file-input').value = '';
      fetchDocuments();
    }
    setUploading(false);
  };

  const handleDelete = async (doc) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el documento "${doc.name}"?`)) return;

    const { error: storageError } = await supabase.storage
      .from('general_documents')
      .remove([doc.file_path]);

    if (storageError) {
      toast({ title: "Error al eliminar archivo", description: storageError.message, variant: "destructive" });
      return;
    }

    const { error: dbError } = await supabase
      .from('documents')
      .delete()
      .eq('id', doc.id);

    if (dbError) {
      toast({ title: "Error al eliminar de la base de datos", description: dbError.message, variant: "destructive" });
    } else {
      toast({ title: "Documento eliminado", description: "El documento ha sido eliminado." });
      fetchDocuments();
    }
  };

  const handleDownload = async (filePath) => {
    const { data, error } = await supabase.storage
      .from('general_documents')
      .getPublicUrl(filePath);

    if (error) {
      toast({ title: "Error al obtener URL", description: error.message, variant: "destructive" });
      return;
    }
    window.open(data.publicUrl, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-emerald-400">Documentos Existentes</CardTitle>
            <CardDescription className="text-emerald-200/70">Lista de todos los documentos generales de la plataforma.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
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
            {!loading && documents.length === 0 && (
              <p className="text-center py-8 text-emerald-200/70">No hay documentos subidos.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-emerald-400">Subir Nuevo Documento</CardTitle>
            <CardDescription className="text-emerald-200/70">Añade un nuevo documento general (ej. Whitepaper).</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-name" className="text-emerald-200">Nombre del Documento</Label>
                <Input id="doc-name" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Ej: Whitepaper v2.0" className="bg-black/50 border-emerald-500/30 focus:border-emerald-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file-input" className="text-emerald-200">Archivo</Label>
                <Input id="file-input" type="file" onChange={handleFileChange} className="bg-black/50 border-emerald-500/30 text-emerald-200/80 file:text-emerald-300 file:bg-emerald-500/10 file:border-0 file:px-3 file:py-1.5 file:rounded-md file:mr-3" />
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
  );
}