import {useRef} from "react";

import {jsonCall} from "@/app/api-integration/api-call";
import {useApiAuthCall} from "@/app/api-integration/hooks/useApiAuthCall";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {userProfile} from "@/app/api-integration/normalizer/userProfile";
import {TNewsletterFormSchema} from "@/app/serverActions/validators/newsletter";
import {TUserDetailsFormSchema} from "@/app/serverActions/validators/userDetails";
import {Endpoints} from "@/endpoints";
import {TUserProfile} from "@/types/user";

export function useUpdateUserDetails() {
    const api = useApiErrorHandler(useApiAuthCall(jsonCall));

    return async (data: TUserDetailsFormSchema & { locale: string }): Promise<{
        message: string;
    }> => {
        const xhr = await api.put(Endpoints.profile.update_profile, {
            first_name: data.name,
            last_name: data.surname,
            mail: data.email,
            phone_number: data?.phone ?? '',
            home_address: '',
            language: data.locale,
        });

        return xhr.data;
    };
}

export function useNewsletterOptIn() {
    const api = useApiErrorHandler(useApiAuthCall(jsonCall));

    return async (data: TNewsletterFormSchema): Promise<boolean> => {
        const xhr = await api.post(Endpoints.profile.newsletter);

        return !!xhr.data.newsletter_status;
    };
}

export function useGetUserDetails() {
    const api = useApiErrorHandler(useApiAuthCall(jsonCall));
    const pending = useRef(false);

    return async (): Promise<TUserProfile> => {
        if (pending.current) {
            return Promise.reject('Already pending');
        }

        pending.current = true;

        const info = await api.get(Endpoints.profile.full_info);

        pending.current = false;

        return userProfile(info.data);
    };
}

export function useUpdatePassword() {
    const api = useApiErrorHandler(useApiAuthCall(jsonCall));

    return async ({
                      old_password,
                      password,
                  }: {
        old_password: string;
        password: string;
    }) => {
        const info = await api.post(Endpoints.profile.update_password, {
            new_password: password,
            old_password,
        });

        return info.data;
    };
}

export function useUpdateLanguage() {
    const api = useApiErrorHandler(useApiAuthCall(jsonCall));

    return async (locale: string) => {
        const info = await api.post(Endpoints.profile.switch_language(locale));

        return info.data;
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getUserDetailsWithToken(token: string) {
    const xhr = await fetch(Endpoints.profile.full_info, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: "no-store"
    });

    const json = await xhr.json();

    if (!xhr.ok) {
        if (xhr.status >= 400) {
            throw new Error('api profile: ' + (json?.message || json?.error || 'Generic error'));
        }
    }

    return userProfile(json);
}

export async function getUserEmailWithTokenLight(token: string): Promise<string> {
    const xhr = await fetch(Endpoints.profile.profile, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const json = await xhr.json();

    if (!xhr.ok) {
        if (xhr.status >= 400) {
            throw new Error('api profile: ' + (json?.message || json?.error || 'Generic error'));
        }
    }

    return json.personal_data.email;
}