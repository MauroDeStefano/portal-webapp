"use client";

import React from "react";
import {useTranslations} from "next-intl";

import UserProfileMenu from "@/app/components/auth/UserProfileMenu";
import PlainLinkWithIcon from "@/app/components/buttons/PlainLinkWithIcon";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useAuthDrawers} from "@/app/hooks/useAuthDrawers";
import ChevronForward from "@/assets/icons/chevron-forward.svg";

type Props = {};

function Guest(props: Props) {
    const t = useTranslations('UserProfile');
    const authDrawers = useAuthDrawers();

    return (
        <div className="header-desktop__login">
            <PlainLinkWithIcon
                tagName='button'
                onClick={() => authDrawers.login()}
                icon={<ChevronForward/>}>{t('login_cta')}</PlainLinkWithIcon>
        </div>
    );
}

function UserIcon() {
    const {user} = useFrilandContext((state) => state);

    const currentUserInitials = !user ? 'You' : user?.name[0] + user?.surname[0];
    const notificationCount = 0;

    return (
        <div className="header-desktop__account-icon">
            {currentUserInitials}

            {!!notificationCount &&
                <div className="header-desktop__account-notification-counter">{notificationCount}</div>}
        </div>
    );
}

function LoggedIn() {
    const t = useTranslations('UserProfile');
    const {user} = useFrilandContext((state) => state);

    const {addDrawer} = useFrilandContext((state) => state);

    const openDrawer = () => {
        addDrawer({
            title: t('profile_title'),
            children: <UserProfileMenu/>
        });
    };

    return (
        <>
            <PlainLinkWithIcon
                onClick={openDrawer}
                icon={<UserIcon/>}
                tagName='button'
                className="header-desktop__account"
            >
                <div className="header-desktop__account-label">
                    {t.rich('greetings', {user: () => <strong>{user?.name}</strong>})}
                </div>
            </PlainLinkWithIcon>
        </>
    );
}

export default function UserProfileHeaderMenu() {
    const {isLoggedIn} = useFrilandContext((state) => state);

    return (
        <>
            {isLoggedIn ? <LoggedIn/> : <Guest/>}
        </>
    )
}