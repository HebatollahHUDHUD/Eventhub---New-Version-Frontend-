import { useTranslations } from "next-intl";
import TitleAndDescription from "@/components/common/TitleAndDescription";
import QACard from "@/components/common/QACard";
import type { AboutPage } from "@/schemas/shared";

interface QuestionsAndAnswersProps {
  data?: AboutPage | null;
}

export default function QuestionsAndAnswers({ data }: QuestionsAndAnswersProps) {
  const t = useTranslations("about");

  const sectionTitle =
    data?.about_page_what_offer_title || t("questions_and_answers");
  const sectionDescription =
    data?.about_page_what_offer_desc || t("questions_and_answers_description");

  const staticFaqs = [
    { question: t("faq_1_question"), answer: t("faq_1_answer") },
    { question: t("faq_2_question"), answer: t("faq_2_answer") },
    { question: t("faq_3_question"), answer: t("faq_3_answer") },
    { question: t("faq_4_question"), answer: t("faq_4_answer") },
    { question: t("faq_5_question"), answer: t("faq_5_answer") },
    { question: t("faq_6_question"), answer: t("faq_6_answer") },
  ];

  const faqs =
    data?.about_page_what_offer_items &&
    data.about_page_what_offer_items.length > 0
      ? data.about_page_what_offer_items.map((item) => ({
          question: item.title,
          answer: item.desc,
        }))
      : staticFaqs;

  return (
    <section className="px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 container">
      {/* Header */}
      <TitleAndDescription
        title={sectionTitle}
        description={sectionDescription}
      />

      {/* FAQ grid */}
      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-[1100px] mx-auto">
        {faqs.map((faq, index) => (
          <QACard
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
