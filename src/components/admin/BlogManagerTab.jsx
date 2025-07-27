import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, PlusCircle } from 'lucide-react';
import BlogPostList from '@/components/admin/BlogPostList';
import BlogPostForm from '@/components/admin/BlogPostForm';
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
import Loader from '@/components/Loader';

export default function BlogManagerTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [selectedPost, setSelectedPost] = useState(null);
  const { toast } = useToast();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error al cargar publicaciones",
        description: "No se pudieron obtener los datos de las publicaciones.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddNewPost = () => {
    setSelectedPost(null);
    setView('form');
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setView('form');
  };
  
  const handleFormSuccess = () => {
    setView('list');
    fetchPosts();
  };

  const handleCancelForm = () => {
    setView('list');
    setSelectedPost(null);
  };

  const handleDeleteConfirmation = (postId) => {
    setPostToDelete(postId);
    setIsDeleteAlertOpen(true);
  };

  const handleStatusChange = async (post, newStatus) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: newStatus })
        .eq('id', post.id);

      if (error) throw error;
      toast({
        title: "Estado actualizado",
        description: `La publicación "${post.title || post.title_es}" ahora está en modo ${newStatus === 'published' ? 'publicado' : 'borrador'}.`
      });
      fetchPosts();
    } catch(error) {
       console.error('Error updating status:', error);
      toast({
        title: "Error al actualizar estado",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const executeDelete = async () => {
    if (!postToDelete) return;
    
    try {
      const postData = posts.find(p => p.id === postToDelete);

      if (postData && postData.image_url && postData.image_url.includes(supabase.storage.from('blog-images').getPublicUrl('').data.publicUrl)) {
        const filePath = new URL(postData.image_url).pathname.split('/blog-images/')[1];
        if (filePath) {
          const { error: storageError } = await supabase.storage.from('blog-images').remove([`public/${filePath}`]);
          if(storageError) console.warn("Could not delete image from storage:", storageError.message);
        }
      }

      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .match({ id: postToDelete });

      if (deleteError) throw deleteError;

      toast({
        title: "Publicación eliminada",
        description: "La publicación ha sido eliminada exitosamente.",
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error al eliminar la publicación",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPostToDelete(null);
      setIsDeleteAlertOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emerald-300">Gestión de Publicaciones del Blog</h2>
        {view === 'list' && (
            <div className="flex items-center gap-3">
            <Button onClick={fetchPosts} variant="outline" size="sm" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10" disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Cargando...' : 'Refrescar'}
            </Button>
            <Button onClick={handleAddNewPost} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                <PlusCircle className="w-4 h-4 mr-2" />
                Crear Nueva Publicación
            </Button>
            </div>
        )}
      </div>

      {view === 'form' ? (
        <BlogPostForm
            post={selectedPost}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelForm}
        />
      ) : loading ? (
        <div className="text-center p-12"><Loader /></div>
      ) : posts.length > 0 ? (
        <BlogPostList posts={posts} onEdit={handleEdit} onDelete={handleDeleteConfirmation} onStatusChange={handleStatusChange} />
      ) : (
        <div className="text-center p-12 glass-card rounded-xl tech-border">
          <h3 className="text-xl font-bold text-emerald-100 mb-2">No hay publicaciones</h3>
          <p className="text-emerald-200/70 text-sm mb-6">
            Actualmente no hay publicaciones en el blog.
          </p>
           <Button onClick={handleAddNewPost} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
            <PlusCircle className="w-4 h-4 mr-2" />
            Crear Publicación
          </Button>
        </div>
      )}

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la publicación del blog y su imagen asociada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}