'use client'

import React from "react";
import {Link} from "@i18n/config";
import {autop} from "@wordpress/autop";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import ImageBundle from "@/app/components/ImageBundle";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

type Props = {
    title: string,
    children?: React.ReactNode
    cta_label?: string,
    cta_href?: any,
    imgDesktop?: string,
    imgMobile?: string

};
export default function Cta2(props: Props) {
    return (
        <section className="cta-2">
            <Link className="cta-2__unit-link" href={props.cta_href}/>

            <ImageBundle className="cta-2__background-image" srcMobile={props?.imgMobile || '/images/placeholder-2.jpg'}
                         srcDesktop={props?.imgDesktop || '/images/placeholder-2.jpg'}/>

            <div className="cta-2__background-overlay"></div>

            <div className="cta-2__container fl-container">
                <div className="cta-2__wrapper">
                    <h3 className="cta-2__title display--34" dangerouslySetInnerHTML={{__html: autop(props.title)}}
                        data-aos="fade-up"/>

                    <div className="cta-2__copy text--18 mcb-0" data-aos="fade-up">
                        <p>
                            {props.children}
                        </p>
                    </div>

                    <div className="cta-2__link" data-aos="fade-up">
                        <LinkWithIcon outline='true' white='true' tagName='link' href='/destinations'
                                      icon={<ArrowForward/>}>{props.cta_label}</LinkWithIcon>
                    </div>
                </div>
            </div>
        </section>

    );
};