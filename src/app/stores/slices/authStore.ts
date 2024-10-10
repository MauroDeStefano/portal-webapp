import {setCookie} from "cookies-next";
import Cookies from "js-cookie";
import {StateCreator} from "zustand";

import {GIFT_CARD_COOKIE_NAME, LONG_SESSION_IN_SECONDS, SESSION_COOKIE_NAME, SHORT_SESSION_IN_SECONDS} from "@/config";
import {TAuthStoreLoggedInSlice, TAuthStoreSlice, TAuthToken} from "@/types/auth";
import {TUserProfile} from "@/types/user";

export const authStore: StateCreator<TAuthStoreSlice & TAuthStoreLoggedInSlice> = (set) => ({
    logout: () => set((state) => {
        console.debug('🔓Removing user-session');

        Cookies.remove(SESSION_COOKIE_NAME);
        Cookies.remove(GIFT_CARD_COOKIE_NAME);

        return {
            token: null,
            user: null,
            session: null,
            isLoggedIn: false,
        };
    }),

    setAuthData: ({token, user, remember_me}: {
        token: TAuthToken,
        user: TUserProfile,
        remember_me: boolean
    }) => set((state) => {
        const session = {
            token,
            user,
            remember_me,
        };

        console.debug('🔐 Fri.land set auth');

        setCookie(SESSION_COOKIE_NAME, JSON.stringify({
            token: session.token,
            remember_me: session.remember_me
        }), {
            maxAge: remember_me ? LONG_SESSION_IN_SECONDS : SHORT_SESSION_IN_SECONDS,
        });

        return {
            session: session,
            user: session.user,
            token: session.token,
            isLoggedIn: !!session,
        };
    }),

    refreshToken: (token: TAuthToken) => set((state) => {
        if (!state.session) {
            return {};
        }

        return {
            token
        };
    }),

    updateUserProfileData: (user: TUserProfile) => set((state) => {
        if (!state.session) {
            return {};
        }

        return {user};
    }),

    setSession: (userSession?: string) => set((state) => {
        const session = userSession ? JSON.parse(userSession) : null

        return {
            session,
            user: session?.user || null,
            token: session?.token || null,
            isLoggedIn: !!session,
        };
    }),

    isLoggedIn: false,
    session: null,
    user: null,
    token: null,
})