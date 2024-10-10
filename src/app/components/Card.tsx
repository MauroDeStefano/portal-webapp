'use client'

import React, {useState} from "react";
import {ChevronDownIcon} from "@storybook/icons";

type Props = {
    variant?: 'card-1--green',
    children?: React.ReactNode
}

export default function Card(props: Props) {
    const variant = props.variant
    return (
        <div className={`card-1 ${variant}`}>
            {props.children}
        </div>
    )
}

type CardHeaderProps = {
    title?: string,
    children?: React.ReactNode
}

export function CardHeader(props: CardHeaderProps) {
    return (
        <>
            <div className="card-1__header">
                <h2 className="card-1__title">
                    {props.title}
                </h2>
                <div className="card-1__header-action">
                    {props.children}
                </div>
            </div>
            <div className="personal-area__card-header-spacer"></div>
        </>
    )
}

type CardAccordionProps = {
    children?: React.ReactNode,
    title?: string
}


export function CardAccordion(props: CardAccordionProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    const triggerAccordion = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="card-1__accordion">
            <div className="card-1__accordion-trigger" aria-expanded={isExpanded} onClick={triggerAccordion}>
                <div className="card-1__accordion-title">
                    <h2 className="card-1__title" dangerouslySetInnerHTML={{__html: props?.title || ''}}>
                    </h2>
                </div>

                <div className="card-1__accordion-icon">
                    <ChevronDownIcon/>
                </div>
            </div>

            <div className="card-1__accordion-content" aria-hidden={!isExpanded}>
                <div className="card-1__accordion-content-container">
                    <div className="card-1__accordion-content-wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}