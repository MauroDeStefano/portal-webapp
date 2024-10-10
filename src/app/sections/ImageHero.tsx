'use client'

import React from "react";
import {Link} from "@i18n/config";
import classNames from "classnames";

import ImageBundle, {ImageBundleProps} from "@/app/components/ImageBundle";
import JumpToContent from "@/app/components/JumpToContent";
import FrilandLogo from "@/assets/icons/friland-round-logo.svg";

import 'aos/dist/aos.css';
import ButtonRoundIcon from "@/app/components/buttons/ButtonRoundIcon";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import {useTranslations} from "next-intl";

type Props = {
    bundle?: ImageBundleProps,
    title?: any,
    children?: React.ReactNode,
    reduced?: boolean,
    noJump?: boolean
}

export function HeroWithTitle(props: Props) {

    const t = useTranslations('Home');

    return (
        <div className="hero-1">
            <ImageBundle className="hero-1__background-image" srcMobile={props.bundle?.srcMobile}
                         srcDesktop={props.bundle?.srcDesktop}></ImageBundle>
            <div className="hero-1__container fl-container">
                <div className="hero-1__wrapper">
                    <Link href="/">
                        <FrilandLogo className='hero-1__logo'/>
                    </Link>

                    <h1 className="hero-1__title display--34" data-aos="fade-up">
                        {props.title}
                    </h1>

                    <div className="hero-1__text" data-aos="fade-up">
                        <p>{props.children}</p>
                    </div>
                    <div className="hero-1__button">
                    {!props?.noJump &&
                        <ButtonRoundIcon icon={<ArrowDown/>} tagName='a' href='#the-content'>
                            <div className="icon-button-vertical__label">
                                {t('scroll_down')}
                            </div>
                        </ButtonRoundIcon>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export function HeroWithContent(props: Props) {
    const t = useTranslations('Home');

    return (
        <div className="hero-2">
            <ImageBundle className="hero-1__background-image" srcMobile={props.bundle?.srcMobile}
                         srcDesktop={props.bundle?.srcDesktop}></ImageBundle>

            <div className="hero-2__overlay"></div>

            <div className="hero-2__container fl-container">
                <div className={classNames({
                    "hero-2__wrapper": true,
                    "hero-2__wrapper-reduced": props?.reduced
                })}>
                    <div className="hero-2__header">
                        <Link href="/">
                            <FrilandLogo className='hero-2__logo'/>
                        </Link>
                    </div>

                    <h1 className="hero-2__title display--54">
                        {props.children}
                    </h1>
                    <div className="hero-2__button">
                        {!props?.noJump &&
                            <ButtonRoundIcon icon={<ArrowDown/>} tagName='a' href='#the-content'>
                                <div className="icon-button-vertical__label">
                                    {t('scroll_down')}
                                </div>
                            </ButtonRoundIcon>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default function ImageHero(props: Props) {
    return (
        <>
            <div className="relative">
                {props.title ? <HeroWithTitle {...props} /> : <HeroWithContent {...props} />}
            </div>

            <div id='the-content'/>
        </>
    );
}