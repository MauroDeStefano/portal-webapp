import {jsonCall} from "@/app/api-integration/api-call";
import {useApiAuthCall} from "@/app/api-integration/hooks/useApiAuthCall";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {TSendGiftCardFormSchema} from "@/app/serverActions/validators/sendGiftcardValidator";
import {Endpoints} from "@/endpoints";

export function useSendGiftCard() {
    const api = useApiErrorHandler(useApiAuthCall(jsonCall));

    return async (
        giftCardID: string | number,
        data: TSendGiftCardFormSchema
    ) => {
        const xhr = await api.post(Endpoints.profile.giveGiftCard, {
            "gift_card": giftCardID,
            "email": data.email,
            "message": data.message,
            "last_name": data.name,
            "first_name": data.surname,
            "send_schedule":  data.date
        });

        return xhr.data;
    };
}
