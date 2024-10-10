import React from "react";
import {Link} from "@i18n/config";

import {FrilandRoundLogoIcon} from "@/app/components/Icons";
import PageHeader1 from "@/app/layout/subheader/PageHeader1";

type Props = {
    title?: string,
    children?: React.ReactNode
}

export default function PersonalAreaFrame(props: Props) {
    return (
        <div className="personal-area">
            <div className="personal-area__container fl-container">
                <div className="personal-area__wrapper">
                    <div className="personal-area__header">
                        <div className="personal-area__logo">
                            <Link href="/">
                                <FrilandRoundLogoIcon/>
                            </Link>
                        </div>

                        <PageHeader1 title={props.title} classes='page-header-1--mobile-center'/>
                    </div>

                    <div className="personal-area__content">
                        {props?.children}
                    </div>
                </div>
            </div>
        </div>
    )
}