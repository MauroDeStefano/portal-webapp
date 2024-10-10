'use client'

import React from "react";
import {Link} from "@i18n/config";

import ButtonRoundIcon from "@/app/components/buttons/ButtonRoundIcon";
import ArrowForward from "@/assets/icons/arrow-forward.svg";
import {locationSlug} from "@/app/utils/locationSlug";

type CtaProps = {
    href?: any,
    itemId: string | number,
    title: string,
    subtitle?: string,
    img?: string,
    imgMobile?: string
}

export function CtaBox({itemId, href, img, title, subtitle}: CtaProps) {
    return (
        <div className="cta-1__card hover-sync" data-aos="fade-up">
            <Link
                className="cta-1__card-unit-link"
                href={{
                    pathname: '/destination/[slug]',
                    params: {slug: locationSlug(itemId, title)}
                }}></Link>

            <img className="cta-1__card-image" src={img}/>

            <div className="cta-1__card-overlay"></div>

            <div className="cta-1__card-copy-wrapper">
                <h4 className="cta-1__card-subtitle text--13">{subtitle}</h4>
                <h5 className="cta-1__card-title h2">{title}</h5>

                <div className="cta-1__card-link">
                    <ButtonRoundIcon icon={<ArrowForward/>}/>
                </div>
            </div>
        </div>

    );
}

type Props = {
    title?: any,
    subtitle?: string,
    children?: React.ReactNode
};
export default function Cta1(props: Props) {
    return (
        <section className="cta-1">
            <img
                className="cta-1__background-image"
                src="/images/topography-background-vertical.svg"
                data-aos="fade-right" data-aos-duration="3000"/>
            <div className="cta-1__container fl-container">
                <div className="cta-1__wrapper">
                    <h2 className="cta-1__subtitle text--13">{props.subtitle}</h2>
                    <h3 className="cta-1__title display--54">{props.title}</h3>

                    <div className="cta-1__cards-wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </section>

    );
};