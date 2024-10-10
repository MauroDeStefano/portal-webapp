import {jsonCall} from "@/app/api-integration/api-call";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {Endpoints} from "@/endpoints";


function formatHtml(data: any) {
    let htmlString = '';
    for (const [key, value] of Object.entries(data)) {
        htmlString += `<b>${key}</b> ${value}<br />`;
    }
    return htmlString;
}


export function useFormHandler() {
    const api = useApiErrorHandler(jsonCall);

    return async (data: any, form_page: string, appendHtml = true): Promise<{
        message: string;
    }> => {
        const body: Record<string, any> = {
            form_page,
            first_name: data?.name,
            last_name: data?.surname,
            mail: data?.mail,
            phone_number: data.phone_number,
            is_newsletter: data.is_newsletter,

            html: formatHtml(data),
        };

        const xhr = await api.post(Endpoints.submit_form, body);

        return xhr.data;
    };
}
