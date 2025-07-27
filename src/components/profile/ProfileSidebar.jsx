import React, { useState, useRef } from 'react';
    import { motion } from 'framer-motion';
    import { Camera, Star, Loader2 } from 'lucide-react';
    import ProfileTabs from './ProfileTabs';
    import { supabase } from '@/lib/customSupabaseClient';
    import { toast } from '@/components/ui/use-toast';
    import { useTranslation } from 'react-i18next';

    export default function ProfileSidebar({ userProfile, activeTab, setActiveTab, onAvatarChange }) {
      const { t } = useTranslation();
      const [isUploading, setIsUploading] = useState(false);
      const fileInputRef = useRef(null);

      const name = userProfile?.full_name || t('profile.sidebar.user');
      const investorLevel = userProfile?.investorLevel || t('profile.sidebar.guest');
      const initials = name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
      const avatarUrl = userProfile?.avatar_url;

      const handleAvatarClick = () => {
        fileInputRef.current.click();
      };

      const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);

        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${userProfile.id}-${Date.now()}.${fileExt}`;
          const filePath = `avatars/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

          const { error: dbError } = await supabase
            .from('user_profiles')
            .update({ avatar_url: publicUrl })
            .eq('id', userProfile.id);

          if (dbError) throw dbError;

          onAvatarChange();
          toast({ title: t('profile.notifications.avatarUpdatedTitle'), description: t('profile.notifications.avatarUpdatedDesc') });
        } catch (error) {
          toast({ title: t('profile.notifications.avatarErrorTitle'), description: error.message, variant: 'destructive' });
        } finally {
          setIsUploading(false);
        }
      };

      return (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-card p-6 rounded-xl border sticky top-24">
            <div className="text-center mb-6">
              <div className="relative inline-block group">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif"
                  disabled={isUploading}
                />
                <button 
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  {isUploading ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <Camera className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
              <h3 className="text-xl font-bold text-foreground mt-4 mb-1">{name}</h3>
              <div className="flex items-center justify-center space-x-1 mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-500 text-sm font-medium">{investorLevel}</span>
              </div>
            </div>

            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </motion.div>
      );
    }