import React from "react";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";

type Props = {
    children?: React.ReactNode,
    classes?: string,
    href?: any
} & (ButtonProps | A_href | LinkProps);

export default function ButtonWithLabelOver({
                                                tagName = 'a',
                                                ...props
                                            }: Props) {
    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';
    }

    return (
        <Tag
            className={`button-6 ${props.classes}`}
            role="button"
            {...props}
        >
            <div className="button-6__background"></div>
            <div className="button-6__label">
                {props.children}
            </div>
        </Tag>
    )
}