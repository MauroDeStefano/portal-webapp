'use client'

import axios from "axios";

import {authToken} from "@/app/api-integration/normalizer/authToken";
import {useAuthContext} from "@/app/contexts/AuthContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {Endpoints} from "@/endpoints";

export const useRefreshToken = () => {
    const {token, refreshToken} = useFrilandContext((state) => state);

    return async () => {
        if (!token) {
            return;
        }
        console.debug('refreshing token');
        const data = await axios.post(Endpoints.profile.refresh_token, {
            token: token.refresh
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        });

        const newToken = authToken({
            ...data.data,
            refreshToken: data.data?.refreshToken || token.refresh
        });

        if (newToken) {
            refreshToken(newToken);
            console.debug('token refreshed');
        }
    }
}