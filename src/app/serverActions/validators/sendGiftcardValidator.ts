import {z} from "zod";

export function sendGiftCardValidator({
                                          required_name,
                                          required_surname,
                                          required_email,
                                      }: {
    required_name: string,
    required_surname: string,
    required_email: string,
}) {
    return z.object({
        name: z.string({required_error: required_name}),
        surname: z.string({required_error: required_surname}),
        email: z.string().email(required_email),
        message: z.string().optional(),
        date: z.string().optional(),
    })
}

export type TSendGiftCardFormSchema = z.infer<ReturnType<typeof sendGiftCardValidator>>


export function buyGiftCardValidator() {
    return z.union([
        z.object({
            delivery_method: z.enum(['myself']),
        }),

        z.object({
            delivery_method: z.enum(['email']),

            name: z.string(),
            surname: z.string(),
            email: z.string().email(),
            message: z.string().optional(),
            date: z.string().optional(),
        })
    ])
}


export type TBuyGiftCardValidator = z.infer<ReturnType<typeof buyGiftCardValidator>>