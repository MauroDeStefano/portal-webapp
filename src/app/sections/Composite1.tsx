'use client'

import React from "react";
import {Link} from "@i18n/config";
import classNames from "classnames";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {ArrowForwardIcon, CheckMarkIcon} from "@/app/components/Icons";
import ImageBundle from "@/app/components/ImageBundle";
import PageHeader4 from "@/app/layout/subheader/PageHeader4";
import SlideshowHeroSide from "@/app/sections/SlideshowHeroSide";

type Props = {
    children?: React.ReactNode
}


export default function Composite1(props: Props) {

    return (
        <div className="composite-1">
            {props.children}
        </div>
    )
}

type HeroProps = {
    children?: React.ReactNode
    title?: any,
    slides: any

}

export function Composite1Hero(props: HeroProps) {
    return (
        <div className="composite-1__hero">
            <PageHeader4 title={props.title} isLight={true} />

            <SlideshowHeroSide slides={props.slides}/>
        </div>
    )
}

type FeaturesProps = {
    children?: React.ReactNode
}

export function Composite1Features(props: FeaturesProps) {
    return (
        <div className="composite-1__features">
            <div className="composite-1__features-container fl-container">
                <div className="composite-1__features-wrapper">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

type FeaturesItemProps = {
    children?: React.ReactNode
}

export function Composite1FeaturesItem(props: FeaturesItemProps) {
    return (
        <div className="composite-1__feature-item">
            <div className="composite-1__feature-item-icon">
                <CheckMarkIcon/>
            </div>
            <p className="composite-1__feature-item-text">{props.children}</p>
        </div>
    )
}

type CtaProps = {
    title?: any,
    href?: any,
    children?: React.ReactNode,
    label?: string
}

export function Composite1Cta(props: CtaProps) {
    return (
        <div className="composite-1__cta-1" data-aos="fade-up">
            <Link
                href={props?.href || '/'}
                className={classNames({'composite-1__cta-1-unit-link': true})}/>
            <div className="composite-1__cta-1-container fl-container">
                <div className="composite-1__cta-1-wrapper">
                    <h3 className="composite-1__cta-1-title display--54">{props.title}</h3>
                    <p className="composite-1__cta-1-text">{props.children}</p>
                    <div className="composite-1__cta-1-button-wrapper">
                        {props.href && <LinkWithIcon
                            tagName="link" href={props.href} white='true' icon={<ArrowForwardIcon/>}>{props.label}</LinkWithIcon>}
                    </div>
                </div>
            </div>
        </div>
    )
}

type Cta2Props = {
    title?: any,
    href?: any,
    children?: React.ReactNode,
    label?: string,
    imgDesktop?: string,
    imgMobile?: string,
}

export function Composite1Cta2(props: Cta2Props) {
    return (
        <div className="composite-1__cta-2">
            <Link href={props?.href || '/'} className={classNames({'composite-1__cta-2-unit-link': true})}/>
            <div className="composite-1__cta-2-content">
                <div className="composite-1__cta-2-container fl-container">
                    <div className="composite-1__cta-2-wrapper">
                        <h3 className="composite-1__cta-2-title display--54">{props.title}</h3>
                        <p className="composite-1__cta-2-text">{props.children}</p>
                        <div className="composite-1__cta-2-button-wrapper">
                            <LinkWithIcon tagName="link" href={props.href} icon={<ArrowForwardIcon/>}>{props.label}</LinkWithIcon>
                        </div>
                    </div>
                </div>
            </div>

            <div className="composite-1__cta-2-image-unit">
                <div className="composite-1__cta-2-image-wrapper">
                    <ImageBundle alt="" width="1165" height="535" className="composite-1__cta-2-image"
                                 srcMobile={props?.imgMobile || '/images/placeholder.jpg'}
                                 srcDesktop={props?.imgDesktop || '/images/placeholder.jpg'}/>
                </div>
            </div>
        </div>
    )
}