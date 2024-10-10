'use client';
import React, {ReactNode, useState} from "react";

import ChevronDown from "@/assets/icons/chevron-down.svg";

interface AccordionItemProps {
    title: string
    text: string | ReactNode
}

export function AccordionItem({title, text}: AccordionItemProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="accordion-3__item">
                <div onClick={() => setOpen(!open)} className="accordion-3__item-trigger"
                     aria-expanded={open ? 'true' : 'false'}
                     data-js="accordion-trigger">
                    <h4 className="accordion-3__item-title">
                        {title}
                    </h4>

                    <div className="accordion-3__item-icon">
                        <ChevronDown/>
                    </div>
                </div>

                <div className="accordion-3__item-content" aria-hidden={!open ? 'true' : 'false'}
                     data-js="accordion-content">
                    <div className="accordion-3__item-content-container">
                        <div className="accordion-3__item-content-wrapper mcy-0">{text}</div>
                    </div>
                </div>
            </div>
        </>
    );
}