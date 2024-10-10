'use client'

import {useEffect} from "react";
import {AxiosInstance} from "axios";

import {useRefreshToken} from "@/app/api-integration/hooks/useRefreshToken";
import {useAuthContext} from "@/app/contexts/AuthContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";

export const useApiAuthCall = (instance: AxiosInstance) => {
    const {token} = useFrilandContext((state) => state);
    const refreshToken = useRefreshToken();

    useEffect(() => {
        if (!token) {
            return;
        }

        const requestIntercept = instance.interceptors.request.use((config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${token.access}`;
            }

            return config;
        });

        const responseIntercept = instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response?.status === 401 && !prevRequest.sent) {
                    console.debug('Auth failed, trying to refresh token');
                    prevRequest.sent = true;
                    await refreshToken();
                    prevRequest.headers['Authorization'] = `Bearer ${token.access}`;

                    return instance(prevRequest);
                }

                return Promise.reject(error);
            }
        )

        return () => {
            instance.interceptors.request.eject(requestIntercept);
            instance.interceptors.response.eject(responseIntercept);
        }
    }, [token]);

    return instance;
}
