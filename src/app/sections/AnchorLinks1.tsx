'use client'

import React, {useState} from "react";

import {AccordionItem} from "@/app/components/Accordions/Accordion3";
import ButtonArrowUp from "@/app/components/buttons/ButtonArrowUp";
import {groupBy} from "@/app/utils/arrayUtils";
import {slugify} from "@/app/utils/slugify";
import ArrowUp from "@/assets/icons/arrow-up.svg";
import {TFaq, TFaqContent, TFaqTag} from "@/types/faq";


function AnchorLinkSectionItem({question, answer}: TFaq) {
    const [isOpen, setIsOpen] = useState(false);
    const changeStatus = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <AccordionItem title={question} text={answer}/>
        </>
    );
}


function AnchorLinkHeaderItem({tag, title, icon, altText}: TFaqTag) {
    const slugTag = slugify('', tag);

    return (
        <>
            <a className="link-likewise anchor-links-1__header-item" href={`#anchor-${slugTag}`}>
                <div className="anchor-links-1__header-item-circle-wrapper">
                    <div className="anchor-links-1__header-item-circle"></div>
                    <img src={icon} alt={altText}/>
                </div>

                <div className="anchor-links-1__header-item-label">{title}</div>
            </a>
        </>
    );
}

type ItemProps = {
    content: TFaqContent
}

export default function AnchorLinks1(props: ItemProps) {
    const groupByTag = groupBy('tag');
    const groupedSectionItems = groupByTag(props.content.faq.faqs);
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <>
            <div className="anchor-links-1">
                <div className="anchor-links-1__container fl-container">
                    <div className="anchor-links-1__header">
                        {props.content.tags.map((item: TFaqTag, index: number) => (
                            <AnchorLinkHeaderItem key={index} {...item}></AnchorLinkHeaderItem>
                        ))}
                    </div>
                    <div className="anchor-links-1__sections-wrapper">
                        {Object.keys(groupedSectionItems).sort().map((tagName: string, extIndex: number) => (
                            <div className="anchor-links-1__section" key={extIndex}
                                 id={'anchor-' + slugify('', tagName)}>
                                <h3 className="anchor-links-1__section-title display--34">{tagName != 'null' ? tagName : ''}</h3>
                                <div className="anchor-links-1__section-content">
                                    {groupedSectionItems[tagName].map((anchorLinkSectionItem: TFaq, intIndex: number) => (
                                        <AnchorLinkSectionItem
                                            key={intIndex} {...anchorLinkSectionItem}></AnchorLinkSectionItem>
                                    ))}
                                </div>
                                <div className="anchor-links-1__section-actions">
                                    <ButtonArrowUp icon={<ArrowUp/>} onClick={scrollUp}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}