import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { FileText, UserCheck, LayoutGrid, TrendingUp, Copyright, ShieldOff, ShieldCheck, RefreshCw, Gavel, Mail, Shield } from 'lucide-react';
    import { useTranslation } from 'react-i18next';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

    const TermsPageEn = () => {
      const { t } = useTranslation();
      const pageData = t('termsPage', { returnObjects: true });

      return (
        <>
          <Helmet>
            <title>{pageData.metaTitle}</title>
            <meta name="description" content={pageData.metaDescription} />
          </Helmet>
          <div className="pt-24 pb-20 px-6 overflow-hidden">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 title-glow" style={{ color: '#071c38' }}>
                  {pageData.pageTitle}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">{pageData.lastUpdated}</p>
                <p className="max-w-3xl mx-auto" style={{ color: '#071c38' }} dangerouslySetInnerHTML={{ __html: pageData.intro.replace(/<a href/g, `<a class='text-primary hover:underline' href`) }}></p>
              </motion.div>

              <div className="space-y-12">
                {pageData.sections.map((section, index) => {
                  const Icon = { FileText, UserCheck, LayoutGrid, TrendingUp, Copyright, ShieldOff, ShieldCheck, RefreshCw, Gavel, Mail, Shield }[section.icon];
                  return (
                    <motion.section
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                            {Icon && <Icon className="w-6 h-6 text-primary" />}
                          </div>
                          <CardTitle className="text-2xl font-bold" style={{ color: '#071c38' }}>{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div
                              className={
                                `leading-relaxed space-y-4`
                              }
                              style={{ color: '#071c38' }}
                              dangerouslySetInnerHTML={{
                                __html: section.content
                                  .replace(/<Link to=\"\/privacy\">/g, `<a href="/privacy" class="text-primary hover:underline">`)
                                  .replace(/<\/Link>/g, '</a>')
                                  .replace(/<li>/g, '<li class="flex items-start"><span class="mr-2 mt-1">&#8226;</span><span>')
                                  .replace(/<ul>/g, '<ul class="space-y-2">')
                              }}
                            ></div>
                          
                          {section.contact && (
                            <div className="mt-4 space-y-2">
                              <a href={`mailto:${section.contact.email}`} className="text-primary hover:text-primary/80 transition-colors duration-300 block">
                                {section.contact.email}
                              </a>
                              <p style={{ color: '#071c38' }}>{section.contact.address}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.section>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      );
    };

    export default TermsPageEn;