'use client';
import React, {ReactNode, useState} from "react";

interface AccordionItemProps {
    title: React.ReactNode
    text: string | ReactNode
}

interface Accordion1Props {
    items: AccordionItemProps[];
}


function AccordionItem({title, text}: AccordionItemProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <h4 className="accordion-1__title display--34" onClick={() => setOpen(!open)}>
                <button aria-expanded={open ? 'true' : 'false'} className="accordion-1__button">
                    <span className="accordion-1__button-title">
                       {title}
                    </span>
                    <img className="accordion-1__button-icon" src="/icons/chevron-down.svg"/>
                </button>
            </h4>

            <div aria-hidden={!open ? 'true' : 'false'} className="accordion-1__content-wrapper">
                <div className="accordion-1__content-container">
                    <div className="accordion-1__content">{text}</div>
                </div>
            </div>
        </>
    );
}

export default function Accordion1(props: Accordion1Props) {
    return (
        <div className="accordion-1">
            <div className="accordion-1__container fl-container">
                <div className="accordion-1__wrapper">
                    {props.items.map(({title, text}, index) => (
                        <AccordionItem key={index} title={title} text={text}/>))}
                </div>
            </div>
        </div>
    );
};