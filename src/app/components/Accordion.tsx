'use client';
import React, {useState} from "react";

import ChevronDown from "@/assets/icons/chevron-down.svg";

type AccordionItemProps = {
    heading: string;
    content: string;
};

export function AccordionItem(props: AccordionItemProps) {
    const [isClosed, setIsClosed] = useState(true);
    return (
        <div className="faq-1__accordion">
            <h4 className="faq-1__accordion-title text--18" onClick={() => setIsClosed(!isClosed)}>
                <button aria-expanded={!isClosed} className="faq-1__accordion-button">
                    {props.heading}
                    <ChevronDown className="faq-1__accordion-button-icon"/>
                </button>
            </h4>

            <div aria-hidden={isClosed} className="faq-1__accordion-content-container">
                <div className="faq-1__accordion-content-wrapper">
                    <div className="faq-1__accordion-content text--18 mcb-0">
                        <p>
                            {props.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

interface AccordionProps {
    headingStyle?: 'long' | 'short';
    children?: any
}

export default function Accordion(props: AccordionProps) {
    return (
        <div className="faq-1__accordions-unit">
            <div className="faq-1__accordions-unit-container fl-container">
                <div className="faq-1__accordions-unit-wrapper">
                    {props.children}
                </div>
            </div>
        </div>
    );
};