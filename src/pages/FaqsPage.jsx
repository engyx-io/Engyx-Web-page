import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqsPage() {
  const { t } = useTranslation('faqs');
  
  const faqs = t('items', { returnObjects: true }) || [];

  return (
    <>
      <Helmet>
        <title>{t('title')} - Engyx Digital Assets</title>
        <meta name="description" content={t('subtitle')} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-24 sm:py-32"
      >
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl title-glow">
                    {t('title')}
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    {t('subtitle')}
                </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {Array.isArray(faqs) && faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border-b-primary/20">
                  <AccordionTrigger className="text-foreground hover:text-primary text-left text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </motion.div>
    </>
  );
}