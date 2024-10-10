import React from "react";
import classNames from "classnames";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";

type Props = {
    icon: React.ReactNode;
    children?: React.ReactNode;
    reverseIcon?: boolean | 'true' | 'false';
    outline?: boolean | 'true' | 'false';
    nogap?: boolean | 'true' | 'false';
    white?: boolean | 'true' | 'false';
} & (ButtonProps | A_href | LinkProps);

export default function LinkWithIcon({
                                         tagName = 'a',
                                         icon,
                                         children,
                                         reverseIcon,
                                         ...props
                                     }: Props) {


    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';
    }

    return (
        <Tag
            className={classNames({
                'icon-button': true,
                'inline-flex': true,
                'icon-button--nogap': props?.nogap || false,
                'icon-button--white': props.white,
                'icon-button--outline': props.outline,
                'flex-row-reverse': reverseIcon
            })}
            {...props}>

            <div className="icon-button__icon">
                <div className="icon-button__circle"></div>
                {icon}
            </div>

            <div className="icon-button__label">{children}</div>
        </Tag>
    );
};