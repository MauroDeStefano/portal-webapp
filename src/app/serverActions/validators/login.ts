import {z} from "zod";

export function loginValidator({
                                   required_email,
                                   required_password,
                               }: {
    required_email: string,
    required_password: string,
}) {
    return z.object({
        email: z.string().email(required_email),
        password: z.string().min(1, required_password),
        remember_me: z.enum(['true', 'false']).optional(),
    })
}

export type TLoginFormSchema = z.infer<ReturnType<typeof loginValidator>>


export function requestPasswordResetValidator({
                                                  required_email,
                                              }: {
    required_email: string,
}) {
    return z.object({
        email: z.string().email(required_email),
    })
}

export type TRequestPasswordSchema = z.infer<ReturnType<typeof requestPasswordResetValidator>>