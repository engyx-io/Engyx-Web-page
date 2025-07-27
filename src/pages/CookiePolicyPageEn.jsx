import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Cookie, HelpCircle, ListChecks, Users, Settings, Gavel, RefreshCw, Mail } from 'lucide-react';
    import { useTranslation } from 'react-i18next';
    import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

    const CookiePolicyPageEn = () => {
      const { t } = useTranslation();
      const pageData = t('cookiePolicyPage', { returnObjects: true });

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
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-foreground title-glow">
                  🍪 {pageData.pageTitle}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">{pageData.lastUpdated}</p>
                <p className="text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: pageData.intro }}></p>
              </motion.div>

              <div className="space-y-12">
                {pageData.sections.map((section, index) => {
                  const Icon = { HelpCircle, ListChecks, Users, Settings, Gavel, RefreshCw, Mail }[section.icon];
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
                          {section.content && <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>}
                          
                          {section.items && (
                            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                              {section.items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                          )}

                          {section.subItems && (
                            <ul className="space-y-1 list-disc list-inside text-muted-foreground/80 ml-6 mt-2">
                              {section.subItems.map((item, i) => <li key={i}><code className="text-sm bg-secondary px-1 py-0.5 rounded">{item}</code></li>)}
                            </ul>
                          )}

                          {section.table && (
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr>
                                    {section.table.headers.map((header, i) => (
                                      <th key={i} className="border-b-2 p-3 text-sm font-semibold text-foreground uppercase tracking-wider">{header}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {section.table.rows.map((row, i) => (
                                    <tr key={i} className="border-b">
                                      <td className="p-3 text-foreground"><strong>{row[0]}</strong></td>
                                      <td className="p-3 text-muted-foreground">{row[1]}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {section.footer && <p className="text-muted-foreground leading-relaxed mt-4">{section.footer}</p>}

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

    export default CookiePolicyPageEn;