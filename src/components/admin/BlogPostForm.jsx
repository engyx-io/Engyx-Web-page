import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import ReactQuill from 'react-quill';

const customColors = [
  '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff',
  '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666',
  '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00',
  '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600',
  '#003700', '#002966', '#3d1466', '#32d3a2'
];

if (ReactQuill.Quill) {
    const Quill = ReactQuill.Quill;
    const Font = Quill.import('formats/font');
    Font.whitelist = ['sans-serif', 'serif', 'monospace'];
    Quill.register(Font, true);

    const Size = Quill.import('attributors/style/size');
    Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '36px'];
    Quill.register(Size, true);
}


const quillModules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { 'font': ['sans-serif', 'serif', 'monospace'] }],
      [{ 'size': ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '36px'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'align': [] }],
      [{ 'color': customColors }, { 'background': customColors }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }
};

const QuillEditor = ({ value, onChange }) => (
    <ReactQuill
      theme="snow"
      value={value || ''}
      onChange={onChange}
      modules={quillModules}
    />
);

const ImageUploader = ({ value, onChange, disabled }) => {
  const [preview, setPreview] = useState(value);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileChange = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({ title: "Error", description: "El archivo es demasiado grande. El límite es 5MB.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      setPreview(publicUrl);
      onChange(publicUrl);
      toast({ title: "Éxito", description: "Imagen subida correctamente." });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({ title: "Error de subida", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const onFileSelect = (e) => {
    handleFileChange(e.target.files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const onRemoveImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label className="text-emerald-200">Imagen para la Tarjeta de Noticia</Label>
      <div
        className={`relative flex justify-center items-center w-full h-48 rounded-lg border-2 border-dashed transition-colors duration-300 ${isDragging ? 'border-emerald-400 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-500'}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <AnimatePresence>
          {preview && !isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img src={preview} alt="Vista previa" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button variant="destructive" size="icon" onClick={onRemoveImage} type="button">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {(isUploading || !preview) && (
          <div className="text-center text-slate-400 space-y-2">
            {isUploading ? (
              <>
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-400" />
                <p>Subiendo...</p>
              </>
            ) : (
              <>
                <UploadCloud className="mx-auto h-8 w-8" />
                <p>Arrastra y suelta o <span className="font-semibold text-emerald-400 cursor-pointer" onClick={() => fileInputRef.current?.click()}>haz clic para subir</span></p>
                <p className="text-xs">PNG, JPG, WEBP (max 5MB)</p>
              </>
            )}
          </div>
        )}
        <Input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={onFileSelect}
          accept="image/png, image/jpeg, image/webp"
          disabled={isUploading || disabled}
        />
      </div>
    </div>
  );
};


export default function BlogPostForm({ post, onSuccess, onCancel }) {
  const { control, register, handleSubmit, reset, formState: { errors, isDirty }, getValues } = useForm();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const originalImageUrl = useRef(null);

  const slugify = useCallback((text) => {
    if (!text) return '';
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  }, []);

  const resetForm = useCallback(() => {
    const defaultValues = {
      title: '', content: '', excerpt: '',
      title_es: '', content_es: '', excerpt_es: '',
      image_url: null, author_name: '', slug: '', tags: '',
      status: 'draft',
    };
    if (post) {
      const postValues = {
        ...post,
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
        image_url: post.image_url || null,
        status: post.status || 'draft',
      };
      reset(postValues);
      originalImageUrl.current = post.image_url || null;
    } else {
      reset(defaultValues);
      originalImageUrl.current = null;
    }
  }, [post, reset]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const deleteImageFromStorage = async (imageUrl) => {
    if (!imageUrl || !imageUrl.includes(supabase.storage.from('blog-images').getPublicUrl('').data.publicUrl)) {
      return;
    }
    try {
      const filePath = new URL(imageUrl).pathname.split('/blog-images/')[1];
      if (filePath) {
        const { error: storageError } = await supabase.storage.from('blog-images').remove([filePath]);
        if (storageError) {
          console.warn("Could not delete old image from storage:", storageError.message);
        }
      }
    } catch (e) {
      console.warn("Error parsing or deleting image URL:", e);
    }
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const postData = {
        title: formData.title,
        content: formData.content || '',
        excerpt: formData.excerpt,
        title_es: formData.title_es,
        content_es: formData.content_es || '',
        excerpt_es: formData.excerpt_es,
        image_url: formData.image_url,
        author_name: formData.author_name,
        slug: formData.slug ? slugify(formData.slug) : slugify(formData.title || formData.title_es),
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        status: formData.status,
      };
      
      if (originalImageUrl.current && originalImageUrl.current !== postData.image_url) {
        await deleteImageFromStorage(originalImageUrl.current);
      }

      let result;
      if (post && post.id) {
        const { data, error } = await supabase.from('blog_posts').update(postData).eq('id', post.id).select().single();
        if (error) throw error;
        result = data;
        toast({ title: "Publicación actualizada", description: "La publicación se ha guardado correctamente." });
      } else {
        const { data, error } = await supabase.from('blog_posts').insert(postData).select().single();
        if (error) throw error;
        result = data;
        toast({ title: "Publicación creada", description: "La nueva publicación se ha creado correctamente." });
      }
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast({ title: "Error", description: `No se pudo guardar la publicación: ${error.message}`, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-emerald-300 mb-6">{post ? "Editar Publicación" : "Crear Nueva Publicación"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-400 border-b border-emerald-500/30 pb-2">Contenido (ES)</h3>
            <div><Label htmlFor="title_es" className="text-emerald-200">Título (ES)</Label><Input id="title_es" {...register("title_es")} /></div>
            <div><Label htmlFor="excerpt_es" className="text-emerald-200">Extracto (ES)</Label><Textarea id="excerpt_es" {...register("excerpt_es")} /></div>
            <div>
              <Label htmlFor="content_es" className="text-emerald-200">Contenido (ES)</Label>
              <Controller name="content_es" control={control} render={({ field }) => <QuillEditor {...field} />} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-400 border-b border-emerald-500/30 pb-2">Contenido (EN)</h3>
            <div><Label htmlFor="title" className="text-emerald-200">Título (EN) *</Label><Input id="title" {...register("title", { required: "El título es obligatorio" })} />{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}</div>
            <div><Label htmlFor="excerpt" className="text-emerald-200">Extracto (EN)</Label><Textarea id="excerpt" {...register("excerpt")} /></div>
            <div>
              <Label htmlFor="content" className="text-emerald-200">Contenido (EN) *</Label>
              <Controller name="content" control={control} rules={{ required: "El contenido es obligatorio" }} render={({ field }) => <QuillEditor {...field} />} />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-emerald-400 border-b border-emerald-500/30 pb-2 mb-4">Detalles de la Publicación</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <Controller
                name="image_url"
                control={control}
                render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} disabled={isSubmitting} />}
              />
            </div>
            <div><Label htmlFor="slug" className="text-emerald-200">Slug</Label><Input id="slug" {...register("slug")} placeholder="auto-generado si se deja vacío" /></div>
            <div><Label htmlFor="author_name" className="text-emerald-200">Nombre del Autor</Label><Input id="author_name" {...register("author_name")} /></div>
             <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col space-y-2">
                    <Label className="text-emerald-200">Estado</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={field.value === 'published'}
                        onCheckedChange={(checked) => field.onChange(checked ? 'published' : 'draft')}
                      />
                       <Label htmlFor="status">{field.value === 'published' ? 'Publicado' : 'Borrador'}</Label>
                    </div>
                  </div>
                )}
              />
            <div className="md:col-span-3"><Label htmlFor="tags" className="text-emerald-200">Etiquetas (separadas por comas)</Label><Input id="tags" {...register("tags")} /></div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting || !isDirty}>{isSubmitting ? 'Guardando...' : 'Guardar Publicación'}</Button>
        </div>
      </form>
    </div>
  );
}