import {z} from "zod";

export function changePasswordValidator({
                                            min_password_length,
                                            password_not_matching,
                                            old_password,
                                            same_as_old,
                                        }: {
    min_password_length: string,
    password_not_matching: string,
    old_password: string,
    same_as_old: string,
}) {
    return z.object({
        old_password: z.string().min(1, old_password),
        password: z.string().min(6, min_password_length),
        confirm_password: z.string().min(6, min_password_length),
    })
        .refine((data) => data.password === data.confirm_password, {
            path: ['confirm_password'],
            message: password_not_matching
        })

        .refine((data) => data.old_password !== data.password, {
            path: ['password'],
            message: same_as_old
        })
}

export function setFirstPasswordValidator({
                                              min_password_length,
                                              password_not_matching,
                                          }: {
    min_password_length: string,
    password_not_matching: string,
}) {
    return z.object({
        password: z.string().min(6, min_password_length),
        confirm_password: z.string().min(6, min_password_length),
    })
        .refine((data) => data.password === data.confirm_password, {
            path: ['confirm_password'],
            message: password_not_matching
        })
}

export type TChangePasswordFormSchema = z.infer<ReturnType<typeof changePasswordValidator>>
export type TSetFirstPasswordFormSchema = z.infer<ReturnType<typeof setFirstPasswordValidator>>