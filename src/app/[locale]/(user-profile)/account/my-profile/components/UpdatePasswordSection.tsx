'use client'
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import {useUpdatePassword} from "@/app/api-integration/user-preferences";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import Card, {CardHeader} from "@/app/components/Card";
import {RfhFormSuccess} from "@/app/components/Forms/FormError";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {
    changePasswordValidator,
    TChangePasswordFormSchema
} from "@/app/serverActions/validators/changePasswordValidator";
import ArrowForward from "@/assets/icons/arrow-forward.svg";


function UpdatePasswordForm({onUpdate}: { onUpdate: (message?: string) => void }) {
    const t = useTranslations('Forms.register');
    const t_frm = useTranslations('Forms.generic');
    const t_btn = useTranslations('Forms.buttons');
    const t_update_password = useTranslations('Profile.update_password');

    const updatePass = useUpdatePassword();

    const schema = changePasswordValidator({
        password_not_matching: t('fields.confirm_password.errors.no_match'),
        min_password_length: t('fields.password.errors.required'),
        old_password: t('fields.old_password.errors.required'),
        same_as_old: t('fields.password.errors.same_as_old'),
    });

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty},
        setError
    } = useForm<TChangePasswordFormSchema>({
        resolver: zodResolver(schema),

        defaultValues: {
            old_password: '',
            password: '',
            confirm_password: '',
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const response = await updatePass({
                old_password: data.old_password,
                password: data.password
            });
            onUpdate(t_frm('messages.password_updated_ok'));
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            action={action}
            className='account-data-form-1'
        >
            <h3>{t_update_password('title')}</h3>
            <div className="account-data-form-1__fields-grid">
                <div className="account-data-form-1__form-field">
                    <RhfTextField
                        name='old_password'
                        control={control}
                        type="password"
                        autoComplete='current-password'
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t('fields.old_password.label')}
                    />
                </div>

                <div className="account-data-form-1__form-field">
                    <RhfTextField
                        name='password'
                        control={control}
                        type="password"
                        autoComplete='new-password'
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t('fields.password.label')}
                    />
                </div>

                <div className="account-data-form-1__form-field">
                    <RhfTextField
                        name='confirm_password'
                        control={control}
                        type="password"
                        autoComplete='new-password'
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t('fields.confirm_password.label')}
                    />
                </div>
            </div>

            {
                errors?.root?.server_error?.message &&
                <div
                    className="my-4 italic text-base p-4 border border-solid border-b-red-800 rounded-2xl bg-red-100">
                    {errors?.root?.server_error?.message}
                </div>
            }

            <div className="account-data-form-1__form-submit flex justify-between">
                <OneButtonToRuleThemAll
                    background='icon'
                    type='submit'
                    iconAlign='right'
                    icon={<ArrowForward/>}
                    isBusy={isSubmitting}
                    disabled={!isDirty || isSubmitting}
                >{isSubmitting ? t_btn('updating') : t_btn('update')}</OneButtonToRuleThemAll>

                <OneButtonToRuleThemAll
                    background='none'
                    type='button'
                    iconAlign='left'
                    isBusy={isSubmitting}
                    onClick={() => onUpdate('')}
                    disabled={isSubmitting}
                >{t_btn('cancel')}</OneButtonToRuleThemAll>
            </div>
        </form>
    );
}

function UpdatePasswordText({onClick}: { onClick: () => void }) {
    const t = useTranslations('Profile.update_password');

    return (
        <div className="password-form-1__form-submit">
            <OneButtonToRuleThemAll
                background='icon'
                iconAlign='left'
                onClick={onClick}
                icon={<ArrowForward/>}
            >{t('cta_button')}</OneButtonToRuleThemAll>
        </div>
    );
}

export default function UpdatePasswordSection() {
    const t = useTranslations('Profile.access');

    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [changeMessage, setChangeMessage] = useState<string | null>(null);

    return (
        <Card>
            <CardHeader title={t('title')}/>
            <div className="password-form-1">
                <RfhFormSuccess
                    message={changeMessage}
                    onClick={() => setChangeMessage(null)}
                />

                {isChangingPassword ?
                    <UpdatePasswordForm onUpdate={(message) => {
                        setChangeMessage(message || '');
                        setIsChangingPassword(false);
                    }}/> :
                    <UpdatePasswordText onClick={() => setIsChangingPassword(true)}/>
                }

                {/*<p className="password-form-1__form-notes">*/}
                {/*    {t.rich('description', {important: (chunks) => <strong>{chunks}</strong>})}*/}
                {/*</p>*/}
            </div>
        </Card>
    )
}