import React from "react";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";

type Props = {
    className?: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
} & (ButtonProps | A_href | LinkProps);

export default function ButtonRoundIcon({
                                            tagName = 'button',
                                            icon,
                                            className = '',
                                            children = false,
                                            ...props
                                        }: Props) {

    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';
    }

    return (
        <Tag
            className={`icon-button-vertical ${className}`}
            {...props}>

            {children && <div className="icon-button-vertical__label">{children}</div>}

            <div className="icon-button-vertical__icon">
                <div className="icon-button-vertical__circle"></div>
                {icon}
            </div>
        </Tag>
    );
};