import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Zap, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

const HelpCenterPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = {
    [t('helpCenterPage.categories.general.title')]: [
      {
        question: t('helpCenterPage.categories.general.q1.question'),
        answer: t('helpCenterPage.categories.general.q1.answer')
      },
      {
        question: t('helpCenterPage.categories.general.q2.question'),
        answer: t('helpCenterPage.categories.general.q2.answer')
      },
      {
        question: t('helpCenterPage.categories.general.q3.question'),
        answer: t('helpCenterPage.categories.general.q3.answer')
      }
    ],
    [t('helpCenterPage.categories.tokens.title')]: [
      {
        question: t('helpCenterPage.categories.tokens.q1.question'),
        answer: t('helpCenterPage.categories.tokens.q1.answer')
      },
      {
        question: t('helpCenterPage.categories.tokens.q2.question'),
        answer: t('helpCenterPage.categories.tokens.q2.answer')
      },
      {
        question: t('helpCenterPage.categories.tokens.q3.question'),
        answer: t('helpCenterPage.categories.tokens.q3.answer')
      }
    ],
    [t('helpCenterPage.categories.kyc.title')]: [
      {
        question: t('helpCenterPage.categories.kyc.q1.question'),
        answer: t('helpCenterPage.categories.kyc.q1.answer')
      },
      {
        question: t('helpCenterPage.categories.kyc.q2.question'),
        answer: t('helpCenterPage.categories.kyc.q2.answer')
      },
      {
        question: t('helpCenterPage.categories.kyc.q3.question'),
        answer: t('helpCenterPage.categories.kyc.q3.answer')
      }
    ]
  };

  const filteredFaqData = Object.entries(faqData).reduce((acc, [category, faqs]) => {
    const filteredFaqs = faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredFaqs.length > 0) {
      acc[category] = filteredFaqs;
    }
    return acc;
  }, {});

  const categoryIcons = {
    [t('helpCenterPage.categories.general.title')]: <HelpCircle className="w-6 h-6 text-primary" />,
    [t('helpCenterPage.categories.tokens.title')]: <Zap className="w-6 h-6 text-primary" />,
    [t('helpCenterPage.categories.kyc.title')]: <ShieldCheck className="w-6 h-6 text-primary" />
  };

  return (
    <>
      <Helmet>
        <title>{t('helpCenterPage.metaTitle')}</title>
        <meta name="description" content={t('helpCenterPage.metaDescription')} />
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
              {t('helpCenterPage.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('helpCenterPage.subtitle')}
            </p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('helpCenterPage.searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 text-lg shadow-soft-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          <div className="space-y-12">
            {Object.entries(filteredFaqData).map(([category, faqs]) => (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  {categoryIcons[category]}
                  <h2 className="text-3xl font-bold text-foreground">{category}</h2>
                </div>
                <Card className="shadow-soft-md">
                  <Accordion type="single" collapsible className="w-full p-4 rounded-xl">
                    {faqs.map((faq, index) => (
                      <AccordionItem value={`item-${category}-${index}`} key={index}>
                        <AccordionTrigger className="text-lg text-foreground">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </motion.section>
            ))}
             {Object.keys(filteredFaqData).length === 0 && (
                <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Card className="p-8 shadow-soft-md">
                      <p className="text-2xl font-bold text-foreground">{t('helpCenterPage.noResults.title')}</p>
                      <p className="text-muted-foreground mt-2">{t('helpCenterPage.noResults.description')}</p>
                    </Card>
                </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenterPage;