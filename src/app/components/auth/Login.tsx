import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import {useLogIn, useSetSession} from "@/app/api-integration/user-session";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RhfCheckbox} from "@/app/components/Forms/Checkbox";
import {RfhFormError} from "@/app/components/Forms/FormError";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {useAuthDrawers} from "@/app/hooks/useAuthDrawers";
import {loginValidator, TLoginFormSchema} from "@/app/serverActions/validators/login";
import ArrowForward from "@/assets/icons/arrow-forward.svg";


export default function Login() {
    const getLoginToken = useLogIn();
    const setSession = useSetSession();
    const authDrawers = useAuthDrawers();

    const t = useTranslations('Forms.login');
    const t_frm = useTranslations('Forms.generic');
    const t_btn = useTranslations('Forms.buttons');

    const schema = loginValidator({
        required_email: t_frm('fields.email.errors.required'),
        required_password: t('fields.password.errors.required'),
    });

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError
    } = useForm<TLoginFormSchema>({
        resolver: zodResolver(schema),

        defaultValues: {
            email: process?.env?.NEXT_PUBLIC_DEFAULT_USER ?? '',
            password: process?.env?.NEXT_PUBLIC_DEFAULT_PASSWORD ?? '',
            remember_me: 'false'
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            setSession(await getLoginToken(data), data.remember_me);
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            action={action}
            className='login__form'
        >
            <div className="login__form-fields">
                <RhfTextField
                    name='email'
                    control={control}
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t_frm('fields.email.label')}
                    autoComplete='email'
                    type="email"
                />

                <RhfTextField
                    name='password'
                    control={control}
                    type="password"
                    autoComplete="current-password"
                    rules={{required: true}}
                    disabled={isSubmitting}
                    placeholder={t('fields.password.errors.required')}
                />
            </div>

            <div className="login__form-checkbox">
                <RhfCheckbox
                    name='remember_me'
                    control={control}
                    disabled={isSubmitting}
                >{t('fields.remember_me.label')}</RhfCheckbox>
            </div>

            <div className="login__form-action">
                <RfhFormError errors={errors?.root?.server_error?.message}/>

                <div className="login__form-login">
                    <OneButtonToRuleThemAll
                        background='icon'
                        type='submit'
                        icon={<ArrowForward/>}
                        isBusy={isSubmitting}
                    >{isSubmitting ? t_btn('submitting') : t_btn('submit')}</OneButtonToRuleThemAll>

                    <a href="#" className="login__forgot-password"
                       onClick={() => authDrawers.recover()}>{t('recover_cta')}</a>
                </div>

            </div>

            <div className="login__form-action">
                <OneButtonToRuleThemAll
                    onClick={() => authDrawers.register()}
                    background='none'
                    iconAlign='left'
                    iconOutline={true}
                    type='button'
                    icon={<ArrowForward/>}
                    disabled={isSubmitting}
                >{t('register_cta')}</OneButtonToRuleThemAll>
            </div>

            {/*<pre>{JSON.stringify(authContext, null, 2)}</pre>*/}
        </form>
    );
};