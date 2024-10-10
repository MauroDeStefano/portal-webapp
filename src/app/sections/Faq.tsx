import React from "react";
import {getLocale, getTranslations} from "next-intl/server";

import Accordion, {AccordionItem} from "@/app/components/Accordion";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {getFaqBlock} from "@/app/utils/xhr/api-calls/getFaqBlock"
import ArrowForward from "@/assets/icons/arrow-forward.svg";
import {TFaq} from "@/types/faq";


type Props = {
    id?: number
}


export default async function Faq(props: Props) {
    const locale = await getLocale();

    const t = await getTranslations('Faq');
    const content = await getFaqBlock(props?.id || 10000, locale);

    return (
        <>
            <section className="faq-1">
                <div className="faq-1__copy-unit">
                    <div className="faq-1__copy-container fl-container">
                        <div className="faq-1__copy-wrapper">
                            <h2 className="faq-1__copy-title display--34">
                                {t('title')}
                            </h2>

                            <div className="faq-1__copy-button">
                                <LinkWithIcon icon={<ArrowForward/>} reverseIcon='true' tagName='link' href='/faq'/>
                            </div>
                        </div>
                    </div>
                </div>
                <Accordion>
                    {content.map((faqItem: TFaq, index: number) => (
                        <AccordionItem key={index} heading={faqItem.question} content={faqItem.answer}/>
                    ))}
                </Accordion>

            </section>
        </>
    )

}
