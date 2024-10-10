import React from "react";
import {useTranslations} from "next-intl";

import NavigationLink from "@/app/components/NavigationLink";
import RegionsSubmenu from "@/app/layout/subheader/RegionsSubmenu";

type Props = {};
export default function DesktopNav(props: Props) {
    const t = useTranslations('Header');

    return (
        <nav className="header-desktop__nav">
            <ul className="header-desktop__nav-list">
                <li className="header-desktop__nav-item">
                    <NavigationLink
                        id='destinations'
                        href='/destinations'
                        className="header-desktop__nav-link">
                        {t('nav.destination')}
                    </NavigationLink>

                    <div className="header-desktop__nav-submenu">
                        <RegionsSubmenu
                            wrapperClassName=""
                            childClassName="header-desktop__nav-link-sub"
                            linkClassName="header-desktop__nav-link"
                        />
                    </div>
                </li>

                <li className="header-desktop__nav-item">
                    <NavigationLink
                        id='gift-card' href='/gift-card'
                        className="header-desktop__nav-link">
                        {t('nav.gift_card')}
                    </NavigationLink>
                </li>

                <li className="header-desktop__nav-item">
                     <NavigationLink id='blog' href='/blog'
                                   className="header-desktop__nav-link">
                        {t('nav.blog')}
                    </NavigationLink>

                </li>

            </ul>
        </nav>
    );
};