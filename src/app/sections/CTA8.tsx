'use client'

import React, {useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";

import ButtonWithLabelOver from "@/app/components/buttons/ButtonWithLabelOver";
import ImageBundle from "@/app/components/ImageBundle";
import FeaturesModal from "@/app/sections/FeaturesModal";

type Props = {
    children?: React.ReactNode,
    title?: string,
    text?: React.ReactNode
}

export default function Cta8(props: Props) {
    return (
        <div className="cta-8" data-aos="fade-up">
            <header className="cta-8__header">
                <div className="cta-8__header-container fl-container">
                    <div className="cta-8__header-wrapper">
                        <h3 className="cta-8__header-subtitle">{props.title}</h3>
                        <h4 className="cta-8__header-title display--54">
                            {props.text}
                        </h4>
                    </div>
                </div>
            </header>
            <div className="cta-8__body">
                <div className="cta-8__body-container fl-container">
                    <div className="cta-8__body-wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

type ItemProps = {
    children?: React.ReactNode,
    title?: React.ReactNode,
    duration?: string,
    mainCtaHref?: any,
    mainCtaLabel?: string,
    otherCtaHref?: any,
    otherCtaLabel?: string,
    imgDesktop?: string,
    imgMobile?: string
}

export function Cta8Item(props: ItemProps) {

    const transitionDuration = 300;
    const [modalVisible, setModalVisible] = useState(false);
    const nodeRef = useRef(null);

    return (
        <>
            <div className="cta-8__item" data-aos="fade-up">
                <div className="cta-8__item-content-unit">
                    <div className="cta-8__item-content">
                        <h3 className="cta-8__item-title display--36">{props.title}</h3>
                        <p className="cta-8__item-text text--13">{props.children}</p>
                        <div className="cta-8__item-spacer"></div>
                        <p className="cta-8__item-num-nights">{props.duration}</p>
                        <div className="cta-8__item-button-wrapper">
                            <ButtonWithLabelOver tagName="link"
                                                 href={props.mainCtaHref}>{props.mainCtaLabel}</ButtonWithLabelOver>
                        </div>
                        {/*
                        <button onClick={() => setModalVisible(true)}
                                className="cta-8__item-info-link">
                            {props.otherCtaLabel}
                        </button>
                        */}
                    </div>
                </div>

                <div className="cta-8__item-image-unit">
                    <ImageBundle
                        srcDesktop={props?.imgDesktop || '/images/placeholder.jpg'}
                        srcMobile={props?.imgMobile || '/images/placeholder.jpg'}
                        width="2560"
                        height="1440"
                        className="cta-8__item-image"
                    />
                </div>
            </div>
            <CSSTransition
                in={modalVisible}
                nodeRef={nodeRef}
                timeout={transitionDuration}
                classNames="fade-in-out"
                unmountOnExit
            >
                {/* <div className="features-modal" ref={nodeRef} onClick={() => setModalVisible(false)}>
                    <FeaturesModal data={[]}/>
                </div>
                */}
            </CSSTransition>
        </>
    )
}