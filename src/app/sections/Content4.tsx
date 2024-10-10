'use client'

import React from "react";

import ImageBundle from "@/app/components/ImageBundle";

type Props = {
    title?: any
    subtitle?: string
    children?: React.ReactNode

}

export default function Content4(props: Props) {
    return (
        <>
            <div className="content-4" data-aos="fade-up">
                <div className="content-4__header">
                    <div className="content-4__header-container fl-container">
                        <div className="content-4__header-wrapper">
                            <h3 className="content-4__header-subtitle">{props.subtitle}</h3>
                            <h4 className="content-4__header-title display--54">
                                {props.title}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="content-4__body" data-aos="fade-up">
                    <div className="content-4__body-container fl-container">
                        <div className="content-4__body-wrapper">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

type ItemProps = {
    children?: React.ReactNode
    reverse?: boolean,
    title?: string,
    imageDesktop?: string,
    imageMobile?: string,
    alt?: string
}

export function Content4Item(props: ItemProps) {
    return (
        <>
            <div className="content-4__item">
                <div className="content-4__item-image-wrapper">
                    <ImageBundle
                        className="content-4__item-image"
                        srcDesktop={props?.imageDesktop}
                        srcMobile={props?.imageMobile}
                        alt={props?.alt}
                    />
                </div>
                <h5 className="content-4__item-title">{props.title}</h5>
                <p className="content-4__item-text text--13">{props.children}</p>
            </div>
        </>
    )
}