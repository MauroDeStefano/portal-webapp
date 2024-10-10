'use client'

import React from "react";
import {autop} from "@wordpress/autop";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

import 'aos/dist/aos.css';

type FeaturesItemProps = {
    img?: string;
    children?: React.ReactNode
};

export function FeaturesItem(props: FeaturesItemProps) {
    return (
        <div className="feature-section-landing__feature-item">
            <img src={props.img} width="10rem" className="feature-section-landing__feature-icon"/>
            <h3 className="feature-section-landing__feature-title text--13">{props.children}</h3>
        </div>
    );
}

type Props = {
    children?: string
    title?: any,
    text?: string,
    cta_label?: string,
    cta_href?: any
};
export default function FeaturesLanding(props: Props) {
    return (
        <section className="feature-section-landing">
            <div className="feature-section-landing__cta">
                <div className="feature-section-landing__cta-container fl-container">
                    <div className="feature-section-landing__cta-wrapper">
                        <h2 className="feature-section-landing__cta-title display--54"
                            dangerouslySetInnerHTML={{__html: autop(props.title)}}/>

                        <div className="feature-section-landing__cta-button">
                            <LinkWithIcon tagName='a' href={props.cta_href}
                                          icon={<ArrowForward/>}>{props.cta_label} </LinkWithIcon>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-section-landing__cta" data-aos="fade-up">
                <div className="feature-section-landing__cta-container fl-container">
                    <div className="feature-section-landing__cta-wrapper">
                        <div
                            className="feature-section-landing__cta-text text--18 mcb-0"
                            dangerouslySetInnerHTML={{__html: autop(props?.children || '')}}
                        >
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};