import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, ImageOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';

export default function BlogPostList({ posts, onEdit, onDelete, onStatusChange }) {
  const getStatusBadge = (status) => {
    if (status === 'published') {
      return (
        <span className="px-2 py-1 text-xs font-medium text-emerald-100 bg-emerald-500/30 rounded-full">
          Publicado
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium text-yellow-100 bg-yellow-500/30 rounded-full">
        Borrador
      </span>
    );
  };

  return (
    <div className="glass-card p-4 rounded-xl tech-border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-emerald-500/20 hover:bg-emerald-500/5">
            <TableHead className="text-emerald-200">Imagen</TableHead>
            <TableHead className="text-emerald-200">Título</TableHead>
            <TableHead className="text-emerald-200">Estado</TableHead>
            <TableHead className="text-emerald-200">Autor</TableHead>
            <TableHead className="text-emerald-200">Fecha de Creación</TableHead>
            <TableHead className="text-center text-emerald-200">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="border-emerald-500/10 hover:bg-emerald-500/10">
              <TableCell>
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title || 'Imagen de la publicación'} className="w-20 h-12 object-cover rounded-md" />
                ) : (
                  <div className="w-20 h-12 bg-black/30 rounded-md flex items-center justify-center">
                    <ImageOff className="w-6 h-6 text-emerald-200/50" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium text-white">{post.title || post.title_es}</TableCell>
              <TableCell>
                 <div className="flex items-center space-x-2">
                    <Switch
                        id={`status-${post.id}`}
                        checked={post.status === 'published'}
                        onCheckedChange={(checked) => onStatusChange(post, checked ? 'published' : 'draft')}
                    />
                    <Label htmlFor={`status-${post.id}`} className="cursor-pointer">
                        {getStatusBadge(post.status)}
                    </Label>
                </div>
              </TableCell>
              <TableCell className="text-emerald-300">{post.author_name || '-'}</TableCell>
              <TableCell className="text-emerald-300">{new Date(post.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                   <Link to={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-sky-400 hover:text-sky-200 hover:bg-sky-500/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(post)} className="text-emerald-400 hover:text-emerald-200 hover:bg-emerald-500/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(post.id)} className="text-red-400 hover:text-red-200 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}