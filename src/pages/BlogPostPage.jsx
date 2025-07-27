import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import SocialShareButtons from '@/components/blog/SocialShareButtons';

export default function BlogPostPage() {
  const { slug } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation('blog');
  const { isAdmin } = useAuth();

  const currentUrl = window.location.origin + location.pathname;

  const currentLocaleCode = i18n.language;
  const currentLocale = currentLocaleCode === 'es' ? es : enUS;
  const dateFormat = currentLocaleCode === 'es' ? 'd MMMM, yyyy' : 'MMMM d, yyyy';

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug);
      
      if (!isAdmin) {
          query = query.eq('status', 'published');
      }
      
      const { data, error } = await query.single();

      if (error || !data) {
        console.error('Error fetching post:', error);
        setError(t('errorNotFound'));
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, t, isAdmin]);

  const getTranslated = (field, fallback) => {
    if (!post) return '';
    const langField = `${field}_${currentLocaleCode}`;
    return post[langField] || post[field] || fallback || '';
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="pt-24 pb-20 px-6 min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('errorTitle')}</h1>
          <p className="text-lg text-muted-foreground">{error}</p>
          <Link to="/blog" className="mt-8 inline-block">
            <Button variant="outline">{t('backToBlog')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const title = getTranslated('title', 'Post Title');
  const excerpt = getTranslated('excerpt', 'Post Excerpt');
  const content = getTranslated('content', '<p>No content available.</p>');

  return (
    <>
      <Helmet>
        <title>{t('postMetaTitle', { title: title })}</title>
        <meta name="description" content={excerpt} />
      </Helmet>
      <div className="pt-32 pb-20 px-6 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToBlog')}</span>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground title-glow mb-4">{title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-6 gap-y-2 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author_name || t('authorFallback')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{t('publishedOn')} {format(new Date(post.created_at), dateFormat, { locale: currentLocale })}</span>
              </div>
               {post.status !== 'published' && (
                <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-500/30 rounded-full">
                  Borrador
                </span>
              )}
            </div>

            <div
              className="blog-content ql-editor ql-snow"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            <SocialShareButtons url={currentUrl} title={title} />

          </motion.div>
        </div>
      </div>
    </>
  );
}