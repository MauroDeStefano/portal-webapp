import {useLocale} from "use-intl";

import {jsonCall} from "@/app/api-integration/api-call";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {maybeConvertDateToString, maybeConvertDateToStringNoTime} from "@/app/utils/calendarDates";
import {Endpoints} from "@/endpoints";
import {TCartItem} from "@/types";
import {formatISO} from "date-fns";

export function usePaymentIntent() {
    const api = useApiErrorHandler(jsonCall);
    const language = useLocale();
    const isTestMode = process.env.NEXT_PUBLIC_STRIPE_TEST_MODE;

    let paymentIntentEndpoint:string = Endpoints.booking.payment_intent;
    if (isTestMode == 'true') {
        paymentIntentEndpoint = Endpoints.booking.payment_intent_test;
    }

    return async (cart: TCartItem[], user: {
        email: string;
        name: string;
        surname: string;
        phone: string;
        newsletter_subscription?: string;
    }): Promise<[any | null, string | null]> => {
        try {
            if (cart[0].product_type === 'HOUSE') {
                const house = cart[0];
                const xhr = await api.post(paymentIntentEndpoint, {
                    "payment_method": "credit_card",

                    "house": house.product_id,
                    // "house": 10000,
                    "arrival": maybeConvertDateToStringNoTime(house.dateRange.start),
                    "departure": maybeConvertDateToStringNoTime(house.dateRange.end),
                    "is_dog": house.hasPet,
                    "guests_number": house.guests,

                    "mail_user": user.email,
                    "name_user": user.name,
                    "last_name_user": user.surname,
                    "mobile_phone": user.phone,

                    language
                });

                return [xhr.data, null];
            }

            if (cart[0].product_type === 'GIFT_CARD') {
                const xhr = await api.post(Endpoints.booking.payment_intent_gift_card, {
                    lang: language,

                    "mail": user.email,
                    "name": user.name,
                    "surname": user.surname,
                    "phone": user.phone,
                    "newsletter_subscription": user.newsletter_subscription,

                    "giftCards": cart.map(gift => {
                        if (gift.product_type !== 'GIFT_CARD') {
                            return null;
                        }

                        return {
                            "quantity": gift.qty,
                            "gift_card_template_id": gift.product_id,

                            "date_gift": maybeConvertDateToString(gift?.recipient?.date_gift ?? ''),

                            "message": gift?.recipient?.message ?? '',
                            "mail": gift?.recipient?.email || user.email,
                            "name": gift?.recipient?.name || user.name,
                            "surname": gift?.recipient?.surname || user.surname,
                        }
                    })

                });

                return [xhr.data, null];
            }

            return [null, 'Invalid product type'];
        } catch (e: any) {
            return [null, e.message];
        }
    };

}
