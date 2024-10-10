import React from "react";
import {pathnames} from "@i18n/config";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {ArrowForwardIcon} from "@/app/components/Icons";

type Props = {
    title?: string,
    text?: string,
    children?: React.ReactNode
}

export default function CTA6(props: Props) {
    return (
        <div className="cta-6">
            {props?.title &&
                <h3 className="cta-6__title display--24">
                    {props.title}
                </h3>
            }
            {props?.text &&
                <p className="cta-6__description text--13">
                    {props.text}
                </p>
            }
            <div className="cta-6__links">
                {props.children}
            </div>

        </div>
    )
}

type CTA6LinkProps = {
    label?: string,
    href?: keyof typeof pathnames
}

export function CTA6Link(props: CTA6LinkProps) {
    return (
        <LinkWithIcon
            icon={<ArrowForwardIcon/>}
            tagName='link'
            href={props?.href || '/'}
            white="true"
            outline="true">{props.label}
        </LinkWithIcon>
    )
}