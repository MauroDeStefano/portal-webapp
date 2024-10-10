'use client';
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {z} from "zod";

import {subscribeToNewsletter} from "@/app/api-integration/subscribe-to-newsletter";
import {RfhFormError} from "@/app/components/Forms/FormError";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ChevronForward from "@/assets/icons/chevron-forward.svg";

type TNewsletterFormProps = {}

export default function NewsletterForm(props: TNewsletterFormProps) {
    const t = useTranslations('Footer');

    const schema = z.object({
        email: z.string().email(),
    });

    const [response, setResponse] = React.useState<string | null>(null);

    const {
        register,
        watch,
        control,
        reset,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty},
        setError
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const response = await subscribeToNewsletter(data);
            setResponse(response.message);
            reset();
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    if (response) {
        return (
            <div className='border border-white border-solid p-4 text-center mb-4'>
                {response}
                <button type='button' onClick={() => setResponse(null)}>&times;</button>
            </div>
        );
    }

    return (
        <>
            <form className="footer__newsletter-form" action={action}>
                <input
                    className="footer__newsletter-input"
                    placeholder={t('newsletter.form.email_placeholder')}
                    type="email"
                    {...register('email')}
                />

                <button
                    aria-label={t('newsletter.form.submit_label')}
                    className="footer__newsletter-submit"
                    type="submit"
                >
                    <div className="footer__newsletter-submit-circle"></div>
                    {isSubmitting ? <LoadingSpinner/> : <ChevronForward/>}
                </button>
            </form>

            <RfhFormError errors={errors?.root?.server_error?.message}/>
        </>
    );
}