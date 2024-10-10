import {TUserProfile} from "@/types/user";

export type TAuthToken = {
    access: string;
    refresh: string;
    created_at: Date;
}

export type TUserSession = {
    token: TAuthToken;
    user: TUserProfile;
    remember_me: boolean;
}

export type TAuthStoreSlice = {
    logout: () => void;
    setAuthData: (data: any) => void;
    isLoggedIn: boolean;
    setSession: (userSession?: string) => void;
}

export type TAuthStoreLoggedInSlice = {
    session: TUserSession | null
    user: TUserProfile | null;
    token: TAuthToken | null;
    updateUserProfileData: (user: TUserProfile) => void;
    refreshToken: (token: TAuthToken) => void;
}

export type AuthCookie = {
    token?: TAuthToken;
    remember_me?: boolean;
}