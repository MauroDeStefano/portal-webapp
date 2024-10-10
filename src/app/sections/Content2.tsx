'use client'

import React from "react";
import classNames from "classnames";

type Props = {
    children?: React.ReactNode
}

export default function Content2(props: Props) {
    return (
        <>
            <div className="content-2">
                <div className="content-2__container fl-container">
                    <div className="content-2__wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

type ItemProps = {
    children: any,
    icon?: any,
    iconReverse?: boolean,
    highlight?: boolean,
    isNotAos?: boolean
}

export function Content2Item(props: ItemProps) {
    return (
        <>
            <div className={classNames({
                'content-2__item mb-36': true,
                'content-2__item--light-green': props.highlight || false,
                'content-2__item--icon-reverse': props.iconReverse || false,
            })}
                 data-aos={props?.isNotAos || 'fade'}
                 data-aos-easing="ease-in-out"
                 data-aos-anchor-placement="top-center"

            >
                <div className="content-2__icon">{props.icon}</div>

                <div className='content-2__text'>
                    {props.children}
                </div>

                <div className="content-2__icon-spacer"></div>
            </div>
        </>
    )
}