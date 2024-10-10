'use client'

import React from "react";
import classNames from "classnames";

import ImageBundle from "@/app/components/ImageBundle";

type Props = {
    children?: React.ReactNode
}

export default function Content3(props: Props) {
    return (
        <>
            <div className="content-3" data-aos="fade-up">
                <div className="content-3__container fl-container">
                    <div className="content-3__wrapper">
                        {props.children}
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

}

export function Content3Item(props: ItemProps) {
    const fade ='fade'
    return (
        <>
            <div className={classNames({
                'content-3__item': true,
                'content-3__item--reverse': props.reverse || false
            })}>
                <div className="content-3__item-content-wrapper" data-aos={fade}>
                    <div className="content-3__item-content mcy-0">
                        <h3 className="content-3__title display--34">{props.title}</h3>
                        <div className="content-3__text text--13">{props.children}</div>
                    </div>
                </div>

                <div className="content-3__item-image-wrapper" data-aos={fade}>
                    <ImageBundle
                        className="content-3__item-image"
                        srcDesktop={props?.imageDesktop || '/images/placeholder.jpg'}
                        srcMobile={props?.imageMobile || '/images/placeholder.jpg'}
                        alt={props?.title}
                    />
                </div>
            </div>
        </>
    )
}