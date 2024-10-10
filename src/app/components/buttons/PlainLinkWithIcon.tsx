import React from "react";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";

type Props = {
    children: React.ReactNode;
    icon: React.ReactNode;
} & (ButtonProps | A_href | LinkProps);

export default function PlainLinkWithIcon({tagName = 'a', children, icon, ...props}: Props) {
    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';
    }

    return (
        <Tag
            className="header-desktop__login-link"
            {...props}
        >
            <span className="header-desktop__login-label">{children}</span>
            <span className="header-desktop__login-icon">{icon}</span>
        </Tag>
    );
};