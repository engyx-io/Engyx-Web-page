import { supabase } from '@/lib/customSupabaseClient';

export const uploadFile = async (file, bucket, oldUrl) => {
    if (!file) return oldUrl || null;

    if (oldUrl) {
      try {
        const oldFilePath = oldUrl.split(`/${bucket}/`)[1];
        if (oldFilePath) {
          await supabase.storage.from(bucket).remove([oldFilePath]);
        }
      } catch (removeError) {
         // Silently fail if old file does not exist, but log for debugging
        console.warn(`Could not remove old file from ${bucket}:`, removeError.message);
      }
    }

    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uploadData.path);
    
    return urlData.publicUrl;
};