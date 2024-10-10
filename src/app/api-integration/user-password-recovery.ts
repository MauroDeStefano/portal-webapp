import {TPasswordRecoveryVariant} from "@/app/[locale]/(static)/create-password/formComponents/CreatePasswordForm";
import {jsonCall} from "@/app/api-integration/api-call";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {TRequestPasswordSchema} from "@/app/serverActions/validators/login";
import {Endpoints} from "@/endpoints";

export function usePasswordRecovery() {
    const api = useApiErrorHandler(jsonCall);

    return async ({
                      unique_id,
                      password,
                      confirm_password,
                      action = 'new'
                  }: {
        unique_id: string;
        password: string;
        confirm_password: string;
        action: TPasswordRecoveryVariant
    }) => {
        const endpoints: Record<TPasswordRecoveryVariant, string> = {
            new: Endpoints.profile.create_password,
            reset: Endpoints.profile.reset_password
        };

        const xhr = await api.post(endpoints[action], {
            unique_id,
            password,
            password_confirm: confirm_password
        });

        return xhr.data;
    }
}

export function usePasswordRecoveryRequest() {
    const api = useApiErrorHandler(jsonCall);

    return async (data: TRequestPasswordSchema) => {
        const xhr = await api.post(Endpoints.profile.request_password_reset, {
            mail: data.email
        });

        return {
            message: xhr.data.response
        };
    }
}