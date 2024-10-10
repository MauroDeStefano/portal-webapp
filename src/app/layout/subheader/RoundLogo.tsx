import React from "react";
import {Link} from "@i18n/config";

import {FrilandRoundLogoIcon} from "@/app/components/Icons";


export default function SubHeaderRoundLogo() {
    return (
        <div className="logo-section-1">
            <div className="logo-section-1__logo">
                <Link href="/">
                    <FrilandRoundLogoIcon/>
                </Link>
            </div>
        </div>
    )
}