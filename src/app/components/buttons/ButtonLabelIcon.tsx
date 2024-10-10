import React from "react";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";

type Props = {
    icon: React.ReactNode;
    children?: React.ReactNode | string;
    decoration?: 'shadow' | 'border';
} & (ButtonProps | A_href | LinkProps);

export default function ButtonLabelIcon({tagName = 'button', children, icon, decoration = 'shadow', ...props}: Props) {
    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';
    }

    return (
        <Tag
            className={`button-1 button-1--${decoration}`}
            {...props}>

            <span className="button-1__label">{children}</span>

            <span className="button-1__icon">
                <div className="button-1__icon-circle"></div>
                {icon}
            </span>
        </Tag>
    );
};