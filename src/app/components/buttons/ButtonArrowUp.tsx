import React from "react";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";

type Props = {
    children?: React.ReactNode;
    decoration?: 'filled' | 'reverse';
    href?: string,
    icon: React.ReactNode;
} & (ButtonProps | A_href | LinkProps);

export default function ButtonArrowUp({
                                          tagName = 'button',
                                          children,
                                          href,
                                          icon,
                                          decoration = 'filled',
                                          ...props
                                      }: Props) {
    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';
    }

    return (
        <Tag
            className={`icon-button-vertical icon-button-vertical--${decoration}`}
            {...props}>

            <div className="icon-button-vertical__label">
                {children}
            </div>

            <div className="icon-button-vertical__icon">
                <div className="icon-button-vertical__circle"></div>
                {icon}
            </div>
        </Tag>
    );
};