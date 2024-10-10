import React from "react";

import FrilandLogo from "@/assets/icons/friland-round-logo.svg";

type Props = {
    title?: React.ReactNode
};


export default function SubHeaderRoundLogoTitle(props: Props) {
    return (
        <header className="page-header-3">
            <div className="page-header-3__container fl-container">
                <div className="page-header-3__wrapper">
                    <div className="page-header-3__logo">
                        <a href="/">
                            <FrilandLogo/>
                        </a>
                    </div>

                    <h1 className="page-header-3__title display--34">
                        {props.title}
                    </h1>
                </div>
            </div>
        </header>
    )
}