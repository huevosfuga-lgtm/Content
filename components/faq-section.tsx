import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQS } from '@/lib/site-config'

export function FaqSection() {
  return (
    <section id="preguntas" className="scroll-mt-20 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase text-center mb-10">
            Preguntas frecuentes
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg border-2 border-[#1a1a1a] px-6">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.pregunta} value={faq.pregunta} className="border-[#d4cfc0]">
                <AccordionTrigger className="text-base font-bold text-[#1a1a1a] hover:no-underline">
                  {faq.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-[#4E5A2B] text-base leading-relaxed">
                  {faq.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
