'use client';

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import {
    CreatePasswordFormSuccess
} from "@/app/[locale]/(static)/create-password/formComponents/CreatePasswordFormSuccess";
import {usePasswordRecovery} from "@/app/api-integration/user-password-recovery";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RfhFormError} from "@/app/components/Forms/FormError";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {
    setFirstPasswordValidator,
    TSetFirstPasswordFormSchema
} from "@/app/serverActions/validators/changePasswordValidator";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

export type TPasswordRecoveryVariant = 'new' | 'reset';

export default function CreatePasswordForm({
                                               unique_id,
                                               action
                                           }: {
    unique_id: string;
    action: TPasswordRecoveryVariant
}) {
    const [showForm, setShowForm] = React.useState<boolean>(true);

    if (showForm) {
        return <_CreatePasswordForm
            unique_id={unique_id}
            action={action}
            onUpdate={() => {
                setShowForm(false);
            }}/>
    }

    return <CreatePasswordFormSuccess/>;
}

function _CreatePasswordForm({
                                 unique_id,
                                 onUpdate,
                                 action: formVariant
                             }: {
    unique_id: string
    onUpdate?: (message?: string) => void
    action: TPasswordRecoveryVariant

}) {
    const t = useTranslations('Forms.register');
    const t_btn = useTranslations('Forms.buttons');

    const schema = setFirstPasswordValidator({
        password_not_matching: t('fields.confirm_password.errors.no_match'),
        min_password_length: t('fields.password.errors.required'),
    });

    const formHandler = usePasswordRecovery();

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty},
        setError
    } = useForm<TSetFirstPasswordFormSchema>({
        resolver: zodResolver(schema),

        defaultValues: {
            password: '',
            confirm_password: '',
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const response = await formHandler({
                ...data,
                unique_id,
                action: formVariant
            });

            onUpdate?.(response.message);
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            action={action}
            className="contact-form__form"
        >

            <div className="new-password__form">
                <div className="new-password__fields-grid">
                    <div className="new-password__form-field">
                        <RhfTextField
                            name='password'
                            type='password'
                            autoComplete='new-password'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t('fields.password.label')}
                        />
                    </div>

                    <div className="new-password__form-field">
                        <RhfTextField
                            name='confirm_password'
                            type='password'
                            autoComplete='new-password'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t('fields.confirm_password.label')}
                        />
                    </div>
                </div>

                <RfhFormError errors={errors?.root?.server_error?.message}/>

                <div className="new-password__form-submit">
                    <OneButtonToRuleThemAll
                        background='icon'
                        type='submit'
                        iconAlign='right'
                        icon={<ArrowForward/>}
                        isBusy={isSubmitting}
                        disabled={!isDirty || isSubmitting}
                    >{isSubmitting ? t_btn('saving') : t_btn('save')}</OneButtonToRuleThemAll>
                </div>
            </div>
        </form>
    );
}