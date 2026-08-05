import { useI18n } from "@/lib/i18n";
import { FAQS } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const { lang } = useI18n();
  return (
    <section id="faq" className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading title="faq.title" subtitle="faq.sub" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q.en}
                value={`item-${i}`}
                id={i === 6 ? "livraison" : i === 9 ? "retours" : undefined}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-5 text-start text-sm font-semibold hover:no-underline sm:text-base">
                  {f.q[lang]}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
