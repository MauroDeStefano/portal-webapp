import React from "react";

type Props = {};
export default function DesktopLogo(props: Props) {
    return (
        <div className="header-desktop__logo">
            <a href="/">
                <img
                    alt="Friland"
                    className="header-desktop__logo-img"
                    src="/icons/friland-alt-logo.svg"
                />
            </a>
        </div>
    );
};