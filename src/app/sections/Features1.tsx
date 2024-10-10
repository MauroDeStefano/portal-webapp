'use client'

import React from "react";
import {autop} from "@wordpress/autop";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

type FeaturesItemProps = {
    img?: string;
    children?: React.ReactNode
};

export function FeaturesItem(props: FeaturesItemProps) {
    return (
        <div className="feature-section-1__feature-item">
            <img src={props.img} width="10rem" className="feature-section-1__feature-icon"/>
            <h3 className="feature-section-1__feature-title text--13">{props.children}</h3>
        </div>
    );
}

type Props = {
    children?: React.ReactNode
    title?: any,
    text?: string,
    cta_label?: string,
    cta_href?: any
};
export default function Features1(props: Props) {
    return (
        <section className="feature-section-1" data-aos="fade-up">
            <div className="feature-section-1__cta">
                <div className="feature-section-1__cta-container fl-container">
                    <div className="feature-section-1__cta-wrapper">
                        <h2 className="feature-section-1__cta-title display--54 props.text"
                            dangerouslySetInnerHTML={{__html: autop(props.title)}}/>

                        <div className="feature-section-1__cta-text text--18 mcb-0">
                            <p>
                                {props.text}
                            </p>
                        </div>

                        <div className="feature-section-1__cta-button">
                            <LinkWithIcon tagName='link' href={props.cta_href}
                                          icon={<ArrowForward/>}>{props.cta_label} </LinkWithIcon>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-section-1__features" data-aos="fade-up">
                <div className="feature-section-1__features-container fl-container">
                    <div className="feature-section-1__features-wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};