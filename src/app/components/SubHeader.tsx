import React, {ReactNode} from "react";
import {Link} from "@i18n/config";
import classNames from "classnames";

import ChevronBackCircle from "@/assets/icons/chevron-back-circle.svg";
import FrilandRoundLogo from "@/assets/icons/friland-round-logo.svg";

interface SubHeaderProps {
    goBack?: string;
    children?: ReactNode;
    isLight?: boolean;
}

export function SubHeader2(props: SubHeaderProps) {
    return (
        <header className="page-header-2">
            {props.goBack &&
                <Link
                    href={props.goBack as any}
                    className="page-header-2__back-button">
                    <ChevronBackCircle/>
                </Link>
            }

            <div className="page-header-2__container fl-container">
                <div className="page-header-2__wrapper">
                    <div className="page-header-2__logo">
                        <Link href="/">
                            <FrilandRoundLogo/>
                        </Link>
                    </div>

                    <h1 className="page-header-2__title display--34">{props.children}</h1>
                </div>
            </div>
        </header>
    );
}

export function Header3(props: SubHeaderProps) {
    return (
        <header className="page-header-3">
            <div className="page-header-3__container fl-container">
                <div className="page-header-3__wrapper">
                    <div className="page-header-3__logo">
                        <Link href="/">
                            <FrilandRoundLogo/>
                        </Link>
                    </div>

                    <h1 className="page-header-3__title display--34">{props.children}</h1>
                </div>
            </div>
        </header>
    );
}

export function Header4(props: SubHeaderProps) {
    return (
        <header className={classNames({
            'page-header-4': true,
            'page-header-4--light': props.isLight
        })}>
            <div className="page-header-4__container fl-container">
                <div className="page-header-4__wrapper">
                    <div className="page-header-4__logo">
                        <Link href="/">
                            <FrilandRoundLogo/>
                        </Link>
                    </div>

                    <h1 className="page-header-4__title display--34">{props.children}</h1>
                </div>
            </div>
        </header>
    );
}