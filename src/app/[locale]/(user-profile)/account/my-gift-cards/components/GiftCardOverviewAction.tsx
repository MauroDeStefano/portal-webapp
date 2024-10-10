'use client'

import {pathnames} from "@i18n/config";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";

type Props = {
    icon?: React.ReactNode,
    href?: keyof typeof pathnames,
    label?: string,
    children?: React.ReactNode,
    onClick: (data: any) => void
}

export default function GiftCardOverviewAction(props: Props) {
    return (
        <div className="gift-card-overview-1__actions">
            <div className="gift-card-overview-1__action">
                <div className="gift-card-overview-1__action-button">
                    <LinkWithIcon onClick={props.onClick} icon={props.icon} tagName='button'>
                        {props?.label}
                    </LinkWithIcon>
                </div>

                <p className="gift-card-overview-1__action-description">
                    {props.children}
                </p>
            </div>
        </div>
    )
}