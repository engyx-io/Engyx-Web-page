import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';

export const uploadFile = async (file, bucket, userId) => {
  if (!file) return null;
  const fileName = `${userId}/${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) {
    toast({ title: `Error al subir ${bucket}`, description: error.message, variant: "destructive" });
    return null;
  }
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return publicUrl;
};