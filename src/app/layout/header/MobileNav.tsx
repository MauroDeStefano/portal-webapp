'use client';

import React from "react";
import {useTranslations} from "next-intl";

import UserProfileMenu from "@/app/components/auth/UserProfileMenu";
import NavigationLink from "@/app/components/NavigationLink";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useAuthDrawers} from "@/app/hooks/useAuthDrawers";
import {ZenDeskButton} from "@/app/layout/header/ZenDesk";
import RegionsSubmenu from "@/app/layout/subheader/RegionsSubmenu";

export function MobileNavPrimary() {
    const t = useTranslations('Header');

    return (
        <ul className=" header-mobile__nav-list header-mobile__nav-list--primary">
            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/destinations'
                    className="header-mobile__nav-link">{t('nav.destination')}</NavigationLink>


                <RegionsSubmenu
                    wrapperClassName="header-mobile__nav-submenu"
                    childClassName="header-mobile__nav-link-sub"
                    linkClassName="header-mobile__nav-link"
                />
            </li>

            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/gift-card'
                    className="header-mobile__nav-link">{t('nav.gift_card')}</NavigationLink>
            </li>
            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/blog'
                    className="header-mobile__nav-link">{t('nav.blog')}</NavigationLink>
            </li>

            <li className="header-mobile__nav-item">
                <ZenDeskButton
                    className="header-mobile__nav-link py-2">{t('nav.chat')}</ZenDeskButton>
            </li>
        </ul>
    );
}

export function MobileNavSecondary() {
    const t = useTranslations('Navigation');

    return (
        <ul className=" header-mobile__nav-list header-mobile__nav-list--secondary">
            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/about'
                    className="header-mobile__nav-link">{t('project')}</NavigationLink>
            </li>

            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/partners'
                    className="header-mobile__nav-link">{t('become_partner')}</NavigationLink>
            </li>

            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/companies-services'
                    className="header-mobile__nav-link">{t('services')}</NavigationLink>
            </li>

            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/contact'
                    className="header-mobile__nav-link">{t('contact')}</NavigationLink>
            </li>

            <li className="header-mobile__nav-item">
                <NavigationLink
                    showSplash={true}
                    href='/faq'
                    className="header-mobile__nav-link">{t('faq')}</NavigationLink>
            </li>
        </ul>
    );
}

export function MobileUserCP() {
    const {isLoggedIn} = useFrilandContext((state) => state);
    const t = useTranslations('UserProfile');

    const {
        login,
    } = useAuthDrawers();

    return (
        <div className="header-mobile__login">
            <h4 className="header-mobile__login-heading">{t('profile_title')}</h4>
            {isLoggedIn ?
                <UserProfileMenu/> :
                <button type={'button'} onClick={() => login()} className="header-mobile__login-button">
                    {t('login_cta')}
                </button>}
        </div>
    );
}
