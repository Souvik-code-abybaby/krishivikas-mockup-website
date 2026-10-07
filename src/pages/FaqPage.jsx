import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordian";
import { useEffect } from "react";
const FAQ_COUNT = 9;

const FaqPage = () => {
  const { t } = useTranslation();
  const faqNumbers = Array.from({ length: FAQ_COUNT }, (_, i) => i + 1);
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <main className="container faq-page py-8">
      <h1 className="mb-6 text-2xl md:text-4xl font-bold text-[#13693a]">
        {t("FREQUENTLY ASKED QUESTIONS")}
      </h1>

      <Accordion type="single" collapsible className="w-full">
        {faqNumbers.map((n) => (
          <div key={n} className="mb-4 rounded-lg border border-[#F1F1F1] p-4">
            <h3 className="text-lg font-semibold text-[#13693A]">
              {t(`faq${n}`)}
            </h3>
            <p className="mt-2 text-gray-700">{t(`faq${n}_ans`)}</p>
          </div>
        ))}
      </Accordion>
    </main>
  );
};

export default FaqPage;
