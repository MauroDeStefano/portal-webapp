import React from "react";
import {pathnames} from "@i18n/config";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {ArrowForwardIcon} from "@/app/components/Icons";

type Props = {
    classes?: string,
    children?: React.ReactNode
}

export default function Cta5(props: Props) {
    return (
        <div className={`cta-5 ${props.classes}`}>
            <div className="cta-5__container fl-container">
                <div className="cta-5__wrapper">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

type ItemProps = {
    children?: React.ReactNode,
    text?: string,
    title?: string
}

export function Cta5Item(props: ItemProps) {
    return (
        <div className="cta-5__item">
            <h3 className="cta-5__item-title display--24">{props.title}</h3>

            <div className="cta-5__item-text text--13 mcb-0">
                <p>
                    {props.text}
                </p>
            </div>

            <div className="cta-5__item-actions">
                {props.children}
            </div>
        </div>
    )
}

type ItemActionProps = {
    href?: string,
    children?: React.ReactNode,
    target?: string
}

export function Cta5ItemAction(props: ItemActionProps) {
    return (
        <div className="cta-5__item-button-wrapper">
            <LinkWithIcon href={props.href} target={props?.target} rel="noopener" outline='true' white='true'
                          icon={<ArrowForwardIcon/>}>
                {props.children}
            </LinkWithIcon>
        </div>
    )
}

type ItemActionPropsInternal = {
    href?: keyof typeof pathnames,
    children?: React.ReactNode,
    target?: string
}

export function Cta5ItemActionInternal(props: ItemActionPropsInternal) {
    return (
        <div className="cta-5__item-button-wrapper">
            <LinkWithIcon tagName="link" href={props?.href || '/'} outline='true' white='true'
                          icon={<ArrowForwardIcon/>}>
                {props.children}
            </LinkWithIcon>
        </div>
    )
}