import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {useLocale} from "use-intl";

import {useLogIn, useRegister, useSetSession} from "@/app/api-integration/user-session";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RfhFormError} from "@/app/components/Forms/FormError";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {registerValidator, TRegisterFormSchema} from "@/app/serverActions/validators/register";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

type Props = {};
export default function Register(props: Props) {
    const getLoginToken = useLogIn();
    const setSession = useSetSession();

    const t = useTranslations('Forms.register');
    const t_frm = useTranslations('Forms.generic');
    const t_btn = useTranslations('Forms.buttons');

    const formHandler = useRegister();

    const language = useLocale();

    const schema = registerValidator({
        required_name: t_frm('fields.name.errors.required'),
        name_too_short: t_frm('fields.surname.errors.required'),
        required_surname: t_frm('fields.surname.errors.required'),
        required_email: t_frm('fields.email.errors.required'),
        required_phone: t_frm('fields.phone.errors.required'),
        phone_too_short: t_frm('fields.phone.errors.too_short'),
        required_password: t('fields.password.errors.required'),
    });

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError
    } = useForm<TRegisterFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
 
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            await formHandler({...data, language});

            setSession(await getLoginToken({
                email: data.mail,
                password: data.password
            }));
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            action={action}
            className='register__form'
        >
            <div className="login__form-fields">
                <RhfTextField
                    name='first_name'
                    control={control}
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t_frm('fields.name.label')}
                    autoComplete='given-name'
                />

                <RhfTextField
                    name='last_name'
                    control={control}
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t_frm('fields.surname.label')}
                    autoComplete='family-name'
                />

                <RhfTextField
                    name='mail'
                    control={control}
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t_frm('fields.email.label')}
                    autoComplete='email'
                    type="email"
                />

                <RhfTextField
                    name='phone_number'
                    control={control}
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t_frm('fields.phone.label')}
                    autoComplete='tel'
                    type="tel"
                />

                <RhfTextField
                    name='password'
                    control={control}
                    type="password"
                    autoComplete="new-password"
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t('fields.password.label')}
                />
            </div>

            <div className="login__form-action">
                <div className="login__form-login">
                    <OneButtonToRuleThemAll
                        background='icon'
                        type='submit'
                        icon={<ArrowForward/>}
                        isBusy={isSubmitting}
                    >{t('submit_cta')}</OneButtonToRuleThemAll>
                </div>

                <RfhFormError errors={errors?.root?.server_error?.message}/>
            </div>
        </form>
    );
};