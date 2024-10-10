import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import {usePasswordRecoveryRequest} from "@/app/api-integration/user-password-recovery";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RfhFormError, RfhFormSuccess} from "@/app/components/Forms/FormError";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {requestPasswordResetValidator, TRequestPasswordSchema} from "@/app/serverActions/validators/login";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

type Props = {};
export default function Recover(props: Props) {
    const t = useTranslations('Forms.reset_password');
    const t_frm = useTranslations('Forms.generic');
    const t_btn = useTranslations('Forms.buttons');
    const formHandler = usePasswordRecoveryRequest();

    const [successMessage, setSuccessMessage] = React.useState<null | string>(null);

    const schema = requestPasswordResetValidator({
        required_email: t_frm('fields.email.errors.required'),
    })

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError
    } = useForm<TRequestPasswordSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const {message} = await formHandler(data);
            setSuccessMessage(message);
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            action={action}
            className='password-recovery__form'
        >
            <div className="password-recovery__form-header">
                <div className="password-recovery__form-title">
                    <h2 className="drawer-1__title">{t('content.title')}</h2>
                </div>

                <p className="password-recovery__form-description">
                    {t('content.text')}
                </p>
            </div>
            <div className="login__form-fields">
                <RhfTextField
                    name='email'
                    control={control}
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t_frm('fields.email.label')}
                    autoComplete='email'
                />
            </div>

            <div className="login__form-action">
                <RfhFormError errors={errors?.root?.server_error?.message}/>
                <RfhFormSuccess
                    message={successMessage}
                    onClick={() => setSuccessMessage(null)}
                />
                <div className="login__form-login">
                    <OneButtonToRuleThemAll
                        background='icon'
                        type='submit'
                        icon={<ArrowForward/>}
                        isBusy={isSubmitting}
                    >{isSubmitting ? t_btn('submitting') : t_btn('submit')}</OneButtonToRuleThemAll>
                </div>
            </div>
        </form>
    );
};