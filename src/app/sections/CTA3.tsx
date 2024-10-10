'use client'

import React from "react";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

type Props = {
    img?: string,
    title?: any,
    children?: React.ReactNode
    cta_label?: string,
    cta_href?: any
};
export default function Cta3(props: Props) {
    return (
        <section className="cta-3">
            <div className="cta-3__image-unit" data-aos="fade-right">
                <div className="cta-3__image-container fl-container">
                    <div className="cta-3__image-wrapper">
                        <img
                            className="cta-3__image"
                            src={props.img}
                        />
                    </div>
                </div>
            </div>

            <div className="cta-3__copy-unit">
                <div className="cta-3__copy-container fl-container">
                    <div className="cta-3__copy-wrapper">
                        <h2 className="cta-3__title display--54">
                            {props.title}
                        </h2>

                        <div className="cta-3__text text--18 mcb-0">
                            <p>
                                {props.children}
                            </p>
                        </div>

                        <div className="cta-3__button">
                            <LinkWithIcon tagName='link' href={props.cta_href}
                                          icon={<ArrowForward/>}>{props.cta_label}</LinkWithIcon>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};