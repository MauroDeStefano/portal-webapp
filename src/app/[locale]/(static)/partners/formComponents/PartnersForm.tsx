'use client';

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import {useFormHandler} from "@/app/api-integration/guest-form-handler";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RhfCheckbox} from "@/app/components/Forms/Checkbox";
import {RfhFormError} from "@/app/components/Forms/FormError";
import GenericFormSuccess from "@/app/components/Forms/GenericFormSuccess";
import {RhfTextArea} from "@/app/components/Forms/TextArea";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {partnersValidator, TPartnersFormSchema} from "@/app/serverActions/validators/partnersValidator";
import ArrowForward from "@/assets/icons/arrow-forward.svg";


export default function PartnersForm() {
    const [showForm, setShowForm] = React.useState<boolean>(true);

    if (showForm) {
        return <_PartnersForm onUpdate={() => setShowForm(false)}/>;
    }
    return <GenericFormSuccess/>
}


function _PartnersForm({
                           onUpdate,
                       }: {
    onUpdate?: (message?: string) => void
}) {
    const t = useTranslations('Forms.partners');
    const t_frm = useTranslations('Forms.generic');
    const t_btn = useTranslations('Forms.buttons');

    const {user} = useFrilandContext((state) => state);
    const formHandler = useFormHandler();

    const schema = partnersValidator({
        required_name: t_frm('fields.name.errors.required'),
        required_surname: t_frm('fields.surname.errors.required'),
        required_email: t_frm('fields.email.errors.required'),
        required_phone: t_frm('fields.phone.errors.required'),
        required_property_address: t('fields.property_address.errors.required'),
        required_property_size: t('fields.property_size.errors.required'),
        required_property_additional_info: t('fields.property_additional_info.errors.required'),
        required_tos: t_frm('fields.terms.errors.required')
    });

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty},
        setError
    } = useForm<TPartnersFormSchema>({
        resolver: zodResolver(schema),

        defaultValues: {
            name: user?.name,
            surname: user?.surname,
            mail: user?.email,
            phone: user?.phone,
            property_address: '',
            property_size: "",
            property_additional_info: '',
            subscribe_to_newsletter: user?.preferences.newsletter_subscription ? 'true' : 'false',
            terms: undefined,
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const response = await formHandler(data, 'partners')
            onUpdate?.(response.message);
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <>
            <h2 className="form-1__title display--34">{t('why_title')}</h2>

            <form
                className="form-1__form-wrapper"
                action={action}
            >
                <p className="form-1__form-notes">{t_frm('instructions')}</p>

                <div className="form-1__fields-grid">
                    <div className="form-1__form-field half-width">
                        <RhfTextField
                            name='name'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t_frm('fields.name.label')}
                            autoComplete='given-name'
                        />
                    </div>

                    <div className="form-1__form-field half-width">
                        <RhfTextField
                            name='surname'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t_frm('fields.surname.label')}
                            autoComplete='family-name'
                        />
                    </div>

                    <div className="form-1__form-field">
                        <RhfTextField
                            name='mail'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t_frm('fields.email.label')}
                            autoComplete='mail'
                        />
                    </div>

                    <div className="form-1__form-field">
                        <RhfTextField
                            name='phone'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t_frm('fields.phone.label')}
                            autoComplete='tel'
                        />
                    </div>

                    <div className="form-1__form-field">
                        <RhfTextField
                            name='property_address'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t('fields.property_address.label')}
                        />
                    </div>

                    <div className="form-1__form-field">
                        <RhfTextField
                            name='property_size'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t('fields.property_size.label')}
                        />
                    </div>

                    <div className="form-1__form-field">
                        <RhfTextArea
                            name='property_additional_info'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            autoResize={true}
                            placeholder={t('fields.property_additional_info.label')}
                        />
                    </div>

                </div>

                <div className="form-1__form-checkbox">
                    <RhfCheckbox
                        control={control}
                        value={'true'}
                        name='subscribe_to_newsletter'>{t_frm('fields.newsletter.label')}</RhfCheckbox>
                </div>

                <div className="form-1__form-checkbox">
                    <RhfCheckbox
                        value={'true'}
                        control={control}
                        name='terms'>{t_frm.rich('fields.terms.label')}</RhfCheckbox>
                </div>

                <RfhFormError errors={errors?.root?.server_error?.message}/>

                <div className="form-1__form-submit">
                    <OneButtonToRuleThemAll
                        background='icon'
                        type='submit'
                        iconAlign='right'
                        icon={<ArrowForward/>}
                        isBusy={isSubmitting}
                        disabled={!isDirty || isSubmitting}
                    >{isSubmitting ? t_btn('submitting') : t_btn('submit')}</OneButtonToRuleThemAll>
                </div>
            </form>
        </>
    );
}