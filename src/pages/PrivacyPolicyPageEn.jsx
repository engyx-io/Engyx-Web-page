import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Shield, Database, Gavel, Globe, Users, FileText, Lock, Clock, Mail } from 'lucide-react';
    import { useTranslation } from 'react-i18next';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

    const PrivacyPolicyPageEn = () => {
      const { t } = useTranslation();
      const pageData = t('privacyPolicyPage', { returnObjects: true });

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
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-foreground title-glow">
                  {pageData.pageTitle}
                </h1>
                <p className="text-lg text-muted-foreground">{pageData.lastUpdated}</p>
              </motion.div>

              <div className="space-y-12">
                {pageData.sections.map((section, index) => {
                  const Icon = { Shield, Database, Gavel, Globe, Users, FileText, Lock, Clock, Mail }[section.icon];
                  return (
                    <motion.section
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Card className="shadow-soft-md">
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                            {Icon && <Icon className="w-6 h-6 text-primary" />}
                          </div>
                          <CardTitle className="text-2xl font-bold text-foreground">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {section.content && <p className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: section.content }}></p>}
                          
                          {section.items && (
                            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                              {section.items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                          )}

                          {section.subsections && section.subsections.map((sub, i) => (
                            <div key={i} className="mt-4">
                              <h3 className="text-lg font-semibold text-foreground mb-2">{sub.title}</h3>
                              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                                {sub.items.map((item, j) => <li key={j}>{item}</li>)}
                              </ul>
                            </div>
                          ))}

                          {section.footer && <p className="text-muted-foreground leading-relaxed mt-4 font-semibold">{section.footer}</p>}

                          {section.contact && (
                            <div className="mt-4 space-y-2">
                              <a href={`mailto:${section.contact.email}`} className="text-primary hover:text-primary/80 transition-colors duration-300 block">
                                {section.contact.email}
                              </a>
                              <p className="text-muted-foreground">{section.contact.address}</p>
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

    export default PrivacyPolicyPageEn;