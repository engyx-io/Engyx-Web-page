import React, { useState, useCallback, Suspense } from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Mail, MapPin, Send, Linkedin, Github } from 'lucide-react';
    import { XIcon } from '@/components/icons/XIcon';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { toast } from '@/components/ui/use-toast';
    import { useTranslation } from 'react-i18next';
    import { supabase } from '@/lib/customSupabaseClient';
    import { Card, CardContent } from '@/components/ui/card';

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
        },
      },
    };

    const ContactInfoCard = ({ icon: Icon, title, content, href }) => (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-4 rounded-lg transition-colors duration-300 hover:bg-primary/10 cursor-pointer group"
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 border border-primary/20 group-hover:bg-primary/20 transition-all">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      </motion.a>
    );

    const SocialLink = ({ icon: Icon, href, label }) => (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-12 h-12 rounded-full bg-secondary/70 border flex items-center justify-center transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        variants={itemVariants}
      >
        <Icon className="w-6 h-6 text-foreground" />
      </motion.a>
    );

    const ContactForm = () => {
      const { t } = useTranslation();
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
          const { data, error } = await supabase.functions.invoke('submit-contact-form', {
            body: { formData },
          });

          if (error) {
            throw new Error(error.message);
          }
          
          if (data.error) {
             throw new Error(data.error);
          }

          toast({
            title: t('contact.notifications.successTitle'),
            description: t('contact.notifications.successDesc'),
          });
          
          setFormData({
            name: '',
            email: '',
            company: '',
            subject: '',
            message: ''
          });

        } catch (error) {
          toast({
            title: t('contact.notifications.errorTitle'),
            description: error.message || t('contact.notifications.errorDesc'),
            variant: "destructive"
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
              <div>
                  <Label htmlFor="name" className="text-foreground text-sm font-medium mb-2 block mono">{t('contact.name')} *</Label>
                  <Input id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder={t('contact.placeholders.name')} />
              </div>
              <div>
                  <Label htmlFor="email" className="text-foreground text-sm font-medium mb-2 block mono">{t('contact.email')} *</Label>
                  <Input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder={t('contact.placeholders.email')} />
              </div>
          </div>
          <div>
            <Label htmlFor="company" className="text-foreground text-sm font-medium mb-2 block mono">{t('contact.company')}</Label>
            <Input id="company" type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder={t('contact.placeholders.company')} />
          </div>
          <div>
            <Label htmlFor="subject" className="text-foreground text-sm font-medium mb-2 block mono">{t('contact.subject')} *</Label>
            <Input id="subject" type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder={t('contact.placeholders.subject')} />
          </div>
          <div>
            <Label htmlFor="message" className="text-foreground text-sm font-medium mb-2 block mono">{t('contact.message')} *</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="resize-none" placeholder={t('contact.placeholders.message')} />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-teal-500 hover:from-primary/90 hover:to-teal-600 text-white font-bold py-4 text-base rounded-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>{t('contact.sending')}</span></>
            ) : (
              <><Send className="w-5 h-5" /><span>{t('contact.send')}</span></>
            )}
          </Button>
        </form>
      );
    }

    const LoadingContainer = () => {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )
    };
    
    export default function ContactPage() {
      const { t } = useTranslation();
      
      return (
        <>
          <Helmet>
            <title>{t('contact.metaTitle')}</title>
            <meta name="description" content={t('contact.metaDescription')} />
          </Helmet>
          <Suspense fallback={<LoadingContainer/>}>
              <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="container mx-auto max-w-7xl relative z-10">
                  <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-foreground title-glow">
                      {t('contact.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                      {t('contact.subtitle')}
                    </p>
                  </motion.div>

                  <Card className="p-4 sm:p-8 lg:p-12 shadow-soft-lg grid lg:grid-cols-5 gap-12">
                    <motion.div
                      className="lg:col-span-3 w-full"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
                        <Send className="w-8 h-8 mr-3 text-primary"/>
                        {t('contact.sendMessage')}
                      </h2>
                      <ContactForm />
                    </motion.div>
                    
                    <motion.div
                      className="lg:col-span-2 space-y-12"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div>
                        <motion.h3 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6">
                          {t('contact.info')}
                        </motion.h3>
                        <div className="space-y-4">
                          <ContactInfoCard icon={Mail} title={t('contact.email')} content="contact@engyx.io" href="mailto:contact@engyx.io" />
                          <ContactInfoCard icon={MapPin} title={t('contact.office')} content={t('contact.officeLocation')} href="#" />
                        </div>
                      </div>
                      
                      <div>
                        <motion.h3 variants={itemVariants} className="text-3xl font-bold text-foreground mb-6">
                          {t('contact.followUs')}
                        </motion.h3>
                        <motion.div variants={containerVariants} className="flex space-x-4">
                          <SocialLink icon={XIcon} href="https://x.com/engyx_io" label="X" />
                          <SocialLink icon={Linkedin} href="https://www.linkedin.com/company/engyx-io/" label="LinkedIn" />
                          <SocialLink icon={Github} href="https://github.com/engyx" label="GitHub" />
                          <SocialLink icon={Send} href="https://t.me/engyx_community" label="Telegram Community" />
                          <SocialLink icon={Send} href="https://t.me/engyx_announcement" label="Telegram Announcement" />
                        </motion.div>
                      </div>

                       <motion.div variants={itemVariants} className="bg-secondary/70 p-6 rounded-2xl border">
                        <h4 className="text-foreground font-semibold mb-2">{t('contact.ctaHelp.title')}</h4>
                        <p className="text-muted-foreground text-sm mb-4">
                          {t('contact.ctaHelp.desc')}
                        </p>
                        <Button
                          onClick={() => window.open('https://t.me/engyx_official', '_blank')}
                          variant="outline"
                          className="w-full"
                        >
                          Telegram
                        </Button>
                      </motion.div>

                    </motion.div>
                  </Card>
                </div>
              </div>
          </Suspense>
        </>
      );
    }