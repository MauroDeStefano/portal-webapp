import {z} from "zod";

export function contactValidator({
                                     required_name,
                                     required_surname,
                                     required_email,
                                     required_message,
                                     required_describe_location,
                                     required_location,
                                     required_city,
                                     required_phone,
                                     required_tos
                                 }: {
    required_name: string;
    required_surname: string;
    required_email: string;
    required_message: string;
    required_describe_location: string;
    required_location: string;
    required_city: string;
    required_phone: string;
    required_tos: string;
}) {
    return z.object({
        name: z.string({required_error: required_name}),
        surname: z.string({required_error: required_surname}),
        mail: z.string().email(required_email),
        reasons_for_contact: z.string(),
        message: z.string({required_error: required_message}),
        describe_location: z.string({required_error: required_describe_location}),
        location: z.string({required_error: required_location}),
        city: z.string({required_error: required_city}),
        phone_number: z.string({required_error: required_phone}),
        is_newsletter: z.enum(['true', 'false']),

        terms: z.literal('true', {
            errorMap: () => ({message: required_tos}),
        })

    })
}

export type TContactFormSchema = z.infer<ReturnType<typeof contactValidator>>;