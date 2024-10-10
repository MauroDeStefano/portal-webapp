import {z} from "zod";

export function newsletterValidator() {
    return z.object({
        status: z.enum(['true', 'false'])
    })
}

export type TNewsletterFormSchema = z.infer<ReturnType<typeof newsletterValidator>>