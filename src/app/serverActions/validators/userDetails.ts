import {z} from "zod";

export function userDetailsValidator({
                                         required_name,
                                         required_surname,
                                         required_email,
                                         required_phone,
                                     }: {
    required_name: string,
    required_surname: string,
    required_email: string,
    required_phone: string,
}) {
    return z.object({
        name: z.string({required_error: required_name}),
        surname: z.string({required_error: required_surname}),
        email: z.string().email(required_email),
        phone: z.string()
            .min(4, required_phone)
            .optional()
            .or(z.literal('')),
    })
}

export type TUserDetailsFormSchema = z.infer<ReturnType<typeof userDetailsValidator>>
