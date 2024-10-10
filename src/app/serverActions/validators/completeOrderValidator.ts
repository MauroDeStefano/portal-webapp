import {z} from "zod";

export type TUserDetailOrderValidatorStrings = {
    required_email: string,
    required_name: string,
    required_surname: string,
    required_phone: string,
}

export function giftCardOrderValidator() {
    return z.array(
        z.intersection(
            z.object({
                id: z.string(),
                gift_card_template_id: z.string(),
            }),

            z.discriminatedUnion('delivery_method', [
                z.object({
                    delivery_method: z.literal('myself'),
                }),

                z.object({
                    delivery_method: z.literal('email'),
                    id: z.string(),
                    gift_card_template_id: z.string(),
                    name: z.string(),
                    surname: z.string(),
                    email: z.string().email(),
                    message: z.string().optional(),
                    date_gift: z.string().optional(),
                })
            ])
        )
    );
}

export function userDetailOrderValidator({
                                             required_name,
                                             required_surname,
                                             required_email,
                                             required_phone
                                         }: TUserDetailOrderValidatorStrings) {
    return z.object({
        name: z.string({required_error: required_name}),
        surname: z.string({required_error: required_surname}),
        phone: z.string().min(4, required_phone),
        email: z.string().email(required_email),
        newsletter_subscription: z.enum(['true', 'false']).optional(),
        invoice: z.enum(['true', 'false']).optional(),
    });
}

export function completeOrderValidator(args: TUserDetailOrderValidatorStrings) {
    return z.intersection(
        z.intersection(
            z.object({
                cart_type: z.enum(['HOUSE', 'GIFT_CARD']),
            }),
            userDetailOrderValidator(args),
        ),

        z.discriminatedUnion('cart_type', [
            z.object({
                cart_type: z.literal('HOUSE'),
            }),

            z.object({
                cart_type: z.literal('GIFT_CARD'),
                giftCards: giftCardOrderValidator()
            })
        ])
    ).describe("Complete Order Validator");
}


export type TCompleteOrderSchema = z.infer<ReturnType<typeof completeOrderValidator>>