import {z} from "zod";

export function partnersValidator({
                                      required_name,
                                      required_surname,
                                      required_email,
                                      required_phone,
                                      required_property_address,
                                      required_property_size,
                                      required_property_additional_info,
                                      required_tos,
                                  }: {
    required_name: string,
    required_surname: string,
    required_email: string,
    required_phone: string,
    required_property_address: string,
    required_property_size: string,
    required_property_additional_info: string,
    required_tos: string,
}) {
    return z.object({
        name: z.string({required_error: required_name}),
        surname: z.string({required_error: required_surname}),
        mail: z.string().email(required_email),
        phone: z.string({required_error: required_phone}),
        property_address: z.string({required_error: required_property_address}),
        property_size: z.string({required_error: required_property_size}),
        property_additional_info: z.string({required_error: required_property_additional_info}),
        subscribe_to_newsletter: z.enum(['true', 'false']),

        terms: z.literal('true', {
            errorMap: () => ({message: required_tos}),
        })
    })
}

export type TPartnersFormSchema = z.infer<ReturnType<typeof partnersValidator>>;