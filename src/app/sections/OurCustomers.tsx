'use client'

import React from "react";

import {CustomerLogo} from "@/types";

type Props = {
    title?: string,
    subtitle?: string,
    children?: React.ReactNode,
    items: CustomerLogo[]
}

export default function OurCustomers(props: Props) {
    return (
        <div className="logos-grid-1" data-aos="fade-up">
            <header className="logos-grid-1__header">
                <div className="logos-grid-1__header-container fl-container">
                    <div className="logos-grid-1__header-wrapper">
                        <h3 className="logos-grid-1__header-subtitle">{props.subtitle}</h3>
                        <h4 className="logos-grid-1__header-title display--54">{props.title}</h4>
                    </div>
                </div>
            </header>

            <div className="logos-grid-1__body" data-aos="fade-up">
                <div className="logos-grid-1__body-container fl-container">
                    <div className="logos-grid-1__body-wrapper">
                        {props.items.map((props: CustomerLogo, i) => <OurCustomersItem
                                key={i}
                                {...props}
                            />
                        )}
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

type ItemProps = {
    alt?: string,
    image?: string,
    href?: string

}

export function OurCustomersItem(props: ItemProps) {
    return (
        <div className="logos-grid-1__item">
            <a href={props.href} rel="noopener" target="_blank">
                <img className="logos-grid-1__item-logo" src={props.image} alt={props.alt}/>
            </a>
        </div>
    )
}