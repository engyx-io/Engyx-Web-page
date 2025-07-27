import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslation } from 'react-i18next';

export default function PresaleFAQ() {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t("presale.faq1Question"),
      answer: t("presale.faq1Answer")
    },
    {
      question: t("presale.faq2Question"),
      answer: t("presale.faq2Answer")
    },
    {
      question: t("presale.faq3Question"),
      answer: t("presale.faq3Answer")
    },
    {
      question: t("presale.faq4Question"),
      answer: t("presale.faq4Answer")
    }
  ];

  return (
    <div className="glass-card p-6 rounded-xl presale-highlight">
      <h3 className="text-xl font-bold text-emerald-100 mb-4 text-center">{t('presale.faqTitle')}</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-emerald-500/20">
            <AccordionTrigger className="text-emerald-100 hover:no-underline text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-emerald-200/80">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}