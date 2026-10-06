import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import faqImage from "../../src/assets/faq.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordian";

const HOME_FAQ_COUNT = 9; // how many to show on the home page (max 9)

const FaqSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const faqNumbers = Array.from({ length: HOME_FAQ_COUNT }, (_, i) => i + 1);

  return (
    <section className="faq_section bg-white">
      <div className="grid lg:grid-cols-[550px_1fr] grid-cols-1 gap-10">
        <div className="faq_left border lg:rounded-[50px] rounded-2xl md:p-10 p-5 flex flex-col justify-center items-center border-[#F1F1F1]">
          <h2 className="md:text-5xl text-2xl font-bold mb-5 text-black">
            {t("FREQUENTLY ASKED QUESTIONS")}
          </h2>
          <p className="text-black">
            {t(
              "Do you need some help with something or do you have questions on some features?"
            )}
          </p>
          <img
            src={faqImage}
            alt="This is faq related image"
            className="w-full"
            width={500}
            height={250}
          />
        </div>

        <div className="faq_right">
          <Accordion type="single" collapsible className="w-full">
            {faqNumbers.map((n) => (
              <AccordionItem key={n} value={`item-${n}`}>
                <AccordionTrigger className="text-lg font-normal bg-[#F5F5F5] text-[#13693A]">
                  {t(`faq${n}`)}
                </AccordionTrigger>
                <AccordionContent>{t(`faq${n}_ans`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/frequentlyaskedquestions")}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#13693a] via-[#8cbf44] to-[#13693a] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              {t("View All")} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;