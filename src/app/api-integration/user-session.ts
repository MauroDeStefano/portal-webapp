import {useLocale} from "use-intl";

import {jsonCall, wwwFormUrlEncoded} from "@/app/api-integration/api-call";
import {useApiAuthCall} from "@/app/api-integration/hooks/useApiAuthCall";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {authToken} from "@/app/api-integration/normalizer/authToken";
import {loginFields} from "@/app/api-integration/normalizer/loginFields";
import {getUserDetailsWithToken} from "@/app/api-integration/user-preferences";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useAuthDrawers} from "@/app/hooks/useAuthDrawers";
import {TLoginFormSchema} from "@/app/serverActions/validators/login";
import {TRegisterFormSchema} from "@/app/serverActions/validators/register";
import {Endpoints} from "@/endpoints";
import {TAuthToken} from "@/types/auth";

export function useLogIn() {
    const api = useApiErrorHandler(jsonCall);
    const locale = useLocale();

    return async (data: TLoginFormSchema): Promise<TAuthToken> => {
        const response = await api.post(Endpoints.profile.auth(locale), loginFields(data));

        return authToken(response.data)
    };
}

export function useRegister() {
    const api = useApiErrorHandler(wwwFormUrlEncoded);

    return async (data: TRegisterFormSchema & {
        language: string;
    }): Promise<TAuthToken> => {
        const register = await api.post(Endpoints.profile.register, data);

        return register.data;
    };
}

export function useSetSession() {
    const {setAuthData} = useFrilandContext((state) => state);
    const authDrawers = useAuthDrawers();

    return async (token: TAuthToken, remember_me = '') => {
        const user = await getUserDetailsWithToken(token.access);

        setAuthData({
            token,
            user,
            remember_me: remember_me === 'true'
        });

        authDrawers.profile(true);
    };
}

export function useLogout() {
    const {logout} = useFrilandContext((state) => state);

    const api = useApiAuthCall(jsonCall);

    return async () => {
        try {
            api.get(Endpoints.profile.logout);
        } catch (e) {
        }

        logout();
    };
}


// this should be used on server calls or outside of auth context
export async function refreshTokenWithToken(token: string) {
    const xhr = await fetch(Endpoints.profile.refresh_token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token
        })
    });

    const json = await xhr.json();

    if (!xhr.ok) {
        if (xhr.status >= 400) {
            throw new Error('api profile: ' + (json?.message || json?.error || 'Generic error'));
        }
    }

    return authToken({
        ...json,
        refreshToken: json?.refreshToken || token
    });
}
