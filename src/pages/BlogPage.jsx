import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import Loader from '@/components/Loader';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const BlogPostCard = ({ post, index }) => {
  const { t, i18n } = useTranslation('blog');
  const currentLocale = i18n.language === 'es' ? es : enUS;
  const dateFormat = i18n.language === 'es' ? 'd MMM, yyyy' : 'MMM d, yyyy';

  const title = (i18n.language === 'es' && post.title_es) ? post.title_es : post.title;
  const excerpt = (i18n.language === 'es' && post.excerpt_es) ? post.excerpt_es : post.excerpt;
  const tags = Array.isArray(post.tags) ? post.tags.filter(t => t) : [];

  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link to={`/blog/${post.slug}`} className="block group h-full">
        <Card className="bg-card border rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 shadow-sm">
          <CardHeader className="p-0">
            <div className="relative overflow-hidden aspect-video">
              <img
                src={post.image_url || `https://source.unsplash.com/random/800x600/?technology,energy,${index}`}
                alt={title}
                className="w-full h-full object-cover"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 2).map(tag => (
                      <div key={tag} className="text-xs text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow flex flex-col">
            <h2 className="text-xl font-bold mb-3 text-card-foreground transition-colors duration-300 group-hover:text-primary line-clamp-2">{title}</h2>
            <p className="text-muted-foreground text-sm line-clamp-3 flex-grow">{excerpt}</p>
          </CardContent>
          <CardFooter className="p-6 pt-4 flex justify-between items-center text-xs text-muted-foreground border-t bg-card">
             <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{post.author_name || t('authorFallback')}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{format(new Date(post.created_at), dateFormat, { locale: currentLocale })}</span>
              </div>
            </div>
             <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
                <span className="mr-1 font-semibold">{t('readMore')}</span>
                <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('blog');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      setPosts([]);
    } else {
      setPosts(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Helmet>
      <div className="pt-32 pb-20 px-6 min-h-screen">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground title-glow">{t('mainTitle')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('mainSubtitle')}
            </p>
          </motion.div>

          {posts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Card className="p-8 shadow-sm max-w-md mx-auto">
                <h3 className="text-xl font-bold text-foreground mb-2">{t('noPostsTitle')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('noPostsDescription')}
                </p>
              </Card>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogPostCard post={post} index={index} key={post.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}