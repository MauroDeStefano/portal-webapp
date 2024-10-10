import React from "react";
import {useTranslations} from "next-intl";

import Login from "@/app/components/auth/Login";
import Recover from "@/app/components/auth/Recover";
import Register from "@/app/components/auth/Register";
import UserProfileMenu from "@/app/components/auth/UserProfileMenu";
import {useFrilandContext} from "@/app/contexts/FrilandContext";

export function useAuthDrawers() {
    const {
        addDrawer,
    } = useFrilandContext((state) => state);

    const t = useTranslations('UserProfile');

    const register = (single = false) => {
        addDrawer({
            title: '',
            children: <Register/>
        }, single);
    }

    const recover = (single = false) => {
        addDrawer({
            title: '',
            children: <Recover/>
        }, single);
    }

    const profile = (single = false) => {
        addDrawer({
            title: t('profile_title'),
            children: <UserProfileMenu/>
        }, single);
    }

    const login = (single = false) => {
        addDrawer({
            title: '',
            children: <Login/>
        }, single);
    }

    return {
        register,
        recover,
        profile,
        login
    };
}