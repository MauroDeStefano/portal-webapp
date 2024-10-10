'use client'

import React from "react";

type Props = {
    isPb0?: boolean,
    children?: React.ReactNode
    title?: string
}

export default function Features7(props: Props) {
    return (
        <div className="feature-section-7">
            <div className="feature-section-7__container fl-container">
                <div className="feature-section-7__wrapper">
                    <h2 className="feature-section-7__title display--34">
                        {props.title}
                    </h2>

                    <div className="feature-section-7__features-wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

type ItemProps = {
    icon?: React.ReactNode
    title?: string,
    children?: React.ReactNode
}

export function Features7Item(itemProps: ItemProps) {
    return (
        <div className="feature-section-7__feature-item" data-aos="fade-up">
            <div>
                {itemProps.icon}
            </div>
            <div className="feature-section-7__feature-line"></div>
            <div className="feature-section-7__feature-text text--13 mcb-0">
                <p>{itemProps.children}</p>
            </div>
        </div>
    )
}