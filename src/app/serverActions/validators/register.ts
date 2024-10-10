import {z} from "zod";

export function registerValidator({
                                      required_name,
                                      name_too_short,
                                      required_surname,
                                      required_email,
                                      required_phone,
                                      phone_too_short,
                                      required_password,
                                  }: {
    required_name: string,
    name_too_short: string,
    required_surname: string,
    required_email: string,
    required_phone: string,
    phone_too_short: string,
    required_password: string,
}) {
    return z.object({
        first_name: z
            .string({required_error: required_name})
            // min len is just an example on how you can add multiple validation rules, but
            // probably not a good idea tho as names can be even 1 letter long
            // https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/
            .min(1, name_too_short),

        last_name: z.string({required_error: required_surname}),
        mail: z.string().email(required_email),
        phone_address: z.string({required_error: required_phone})
            .min(4, phone_too_short)
            .optional()
            .or(z.literal('')),
        password: z.string().min(1, required_password),
    })
}

export type TRegisterFormSchema = z.infer<ReturnType<typeof registerValidator>>