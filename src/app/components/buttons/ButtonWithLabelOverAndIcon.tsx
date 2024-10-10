import React from "react";

import {A_href, ButtonProps, getTagName, LinkProps} from "@/app/components/buttons/ButtonInterface";

type Props = {
    icon: React.ReactNode;
    children?: React.ReactNode,
    classes?: string
} & (ButtonProps | A_href | LinkProps);

export default function ButtonWithLabelOverAndIcon({
                                                       tagName = 'a', icon, children,
                                                       ...props
                                                   }: Props) {
    const Tag = getTagName(tagName);

    if (tagName === 'button') {
        // @ts-ignore
        props.type = props.type || 'button';
    }

    return (
        <Tag className={`button-4 ${props.classes}`}
             role="button"
             {...props}
        >
            <div className="button-4__label text--13">
                {children}
            </div>
            <div className="button-4__icon">
                {icon}
            </div>
        </Tag>

    )


}

