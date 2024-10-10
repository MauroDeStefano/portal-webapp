'use client'

import React from "react";
import classNames from "classnames";

type Props = {
    isPb0?: boolean,
    children?: React.ReactNode
    title?: string
}

export default function Features6(props: Props) {
    return (
        <div className={classNames({
            "feature-section-6": true,
            "pb-0": props?.isPb0 || false
        })

        }>
            <div className="feature-section-6__container fl-container" data-aos="fade-up">
                <div className="feature-section-6__wrapper">
                    <h2 className="feature-section-6__title display--34">
                        {props.title}
                    </h2>

                    <div className="feature-section-6__features-wrapper">
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

export function Features6Item(itemProps: ItemProps) {
    return (
        <div className="feature-section-6__feature-item" data-aos="fade-up">
            <div className="feature-section-6__feature-icon-wrapper">
                <div className="feature-section-6__feature-icon_circle">
                    {itemProps.icon}
                </div>
            </div>

            <h3 className="feature-section-6__feature-title display--36">
                {itemProps.title}
            </h3>

            <div className="feature-section-6__feature-text text--13 mcb-0">
                <p>{itemProps.children}</p>
            </div>
        </div>
    )
}