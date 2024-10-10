'use client';

import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import ContactFormSuccess from "@/app/[locale]/(static)/contact/formComponents/ContactFormSuccess";
import {useFormHandler} from "@/app/api-integration/guest-form-handler";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RhfCheckbox} from "@/app/components/Forms/Checkbox";
import {RfhFormError, RfhFormFieldErrorMessage} from "@/app/components/Forms/FormError";
import {RadioWrapper} from "@/app/components/Forms/Radio";
import {RhfTextArea} from "@/app/components/Forms/TextArea";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {ClientOnlyContextProvider} from "@/app/contexts/ClientOnlyContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {contactValidator, TContactFormSchema} from "@/app/serverActions/validators/contactValidator";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

interface ContactFormProps {
    onUpdate?: (message: string) => void
}

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (isSubmitted) {
        return <ContactFormSuccess/>;
    }

    return (
        <ClientOnlyContextProvider>
            <_ContactForm onUpdate={() => setIsSubmitted(true)}/>
        </ClientOnlyContextProvider>
    );
}

function _ContactForm({onUpdate}: ContactFormProps) {
    const t = useTranslations('Contact');

    const t_frm = useTranslations('Forms.generic');
    const t_btn = useTranslations('Forms.buttons');

    const {user, updateUserProfileData,} = useFrilandContext((state) => state);

    const schema = contactValidator({
        required_name: t_frm('fields.name.errors.required'),
        required_surname: t_frm('fields.surname.errors.required'),
        required_email: t_frm('fields.email.errors.required'),
        required_message: t('form_fields_errors.message'),
        required_describe_location: '',//t('form_fields_errors'),
        required_location: t('form_fields_errors.location'),
        required_city: t('form_fields_errors.city'),
        required_phone: t_frm('fields.phone.errors.required'),
        required_tos: t_frm('fields.terms.errors.required'),
    });

    const formHandler = useFormHandler();

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty, isValid},
        setError,
        setValue
    } = useForm<TContactFormSchema>({
        resolver: zodResolver(schema),

        defaultValues: {
            name: user?.name ?? '',
            surname: user?.surname ?? '',
            mail: user?.email ?? '',
            reasons_for_contact: '',
            message: '',
            describe_location: '',
            location: '',
            city: '',
            phone_number: user?.phone ?? '',
            is_newsletter: user?.preferences.newsletter_subscription ? 'true' : 'false',
            terms: undefined,
        }
    });

    useEffect(() => {
        if (!user) {
            return;
        }

        setValue('name', user.name);
        setValue('surname', user.surname);
        setValue('mail', user.email);
        setValue('phone_number', user.phone);
        setValue('is_newsletter', user.preferences.newsletter_subscription ? 'true' : 'false');
    }, [user]);


    const action: () => void = handleSubmit(async (data) => {
        try {
            const response = await formHandler(data, 'contact-us')
            onUpdate?.(response.message);
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    return (
        <form
            action={action}
            className="contact-form__form">

            <p className="contact-from__form-intro">{t('instructions')}</p>

            <div className="contact-form__fields-grid">
                <div className="contact-form__form-field half-width">
                    <RhfTextField
                        name='name'
                        control={control}
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t_frm('fields.name.label')}
                        autoComplete='given-name'
                    />
                </div>

                <div className="contact-form__form-field half-width">
                    <RhfTextField
                        name='surname'
                        control={control}
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t_frm('fields.surname.label')}
                        autoComplete='family-name'
                    />
                </div>

                <div className="contact-form__form-field">
                    <RhfTextField
                        name='mail'
                        control={control}
                        rules={{required: true}}
                        disabled={isSubmitting}
                        placeholder={t_frm('fields.email.label')}
                        autoComplete='email'
                    />
                </div>
            </div>

            <h3 className="contact-form__section-title display--24">{t('form_fields.why_contact')}</h3>

            <Controller
                name='reasons_for_contact'
                control={control}
                render={({field: {onChange, value: groupValue, ...etc}, fieldState}) => {
                    return (
                        <>
                            <div className="contact-form__tabs">
                                <div className="contact-form__tab">
                                    <RadioWrapper
                                        field={<input
                                            className="form__radio-input"
                                            type="radio"
                                            value='reasons_for_contact.1'
                                            checked={'reasons_for_contact.1' === groupValue}
                                            onChange={(e) => onChange('reasons_for_contact.1')}
                                            {...etc}
                                        />}
                                        label={t('form_fields.reasons_for_contact.1')}
                                    />
                                </div>

                                <div className="contact-form__tab">
                                    <RadioWrapper
                                        field={<input
                                            className="form__radio-input"
                                            type="radio"
                                            value='reasons_for_contact.2'
                                            checked={'reasons_for_contact.2' === groupValue}
                                            onChange={(e) => onChange('reasons_for_contact.2')}
                                            {...etc}
                                        />}
                                        label={t('form_fields.reasons_for_contact.2')}
                                    />
                                </div>

                                <div className="contact-form__tab">
                                    <RadioWrapper
                                        field={<input
                                            className="form__radio-input"
                                            type="radio"
                                            value='reasons_for_contact.3'
                                            checked={'reasons_for_contact.3' === groupValue}
                                            onChange={(e) => onChange('reasons_for_contact.3')}
                                            {...etc}
                                        />}
                                        label={t('form_fields.reasons_for_contact.3')}
                                    />
                                </div>
                            </div>

                            <RfhFormFieldErrorMessage {...fieldState}/>
                        </>
                    )
                }}/>

            <div className="contact-form__tab-body">
                <div className="contact-form__fields-grid">
                    <div className="contact-form__form-field contact-form__form-textarea">
                        <RhfTextArea
                            control={control}
                            placeholder={t('form_fields.message')}
                            required={true}
                            name='message'/>
                    </div>
                </div>
            </div>

            <div className="contact-form__tab-body">
                <div className="contact-form__fields-grid">
                    <div className="contact-form__form-field contact-form__form-textarea">
                        <RhfTextArea
                            control={control}
                            placeholder={t('form_fields.describe_location')}
                            required={true}
                            name='describe_location'/>
                    </div>

                    <div className="contact-form__form-field half-width">
                        <RhfTextField
                            name='location'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t('form_fields.location')}
                        />
                    </div>

                    <div className="contact-form__form-field half-width">
                        <RhfTextField
                            name='city'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t('form_fields.city')}
                        />
                    </div>

                    <div className="contact-form__form-field">
                        <RhfTextField
                            name='phone_number'
                            type='tel'
                            autoComplete='tel'
                            control={control}
                            rules={{required: true}}
                            disabled={isSubmitting}
                            placeholder={t_frm('fields.phone.label')}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-2">
                <RhfCheckbox control={control}
                             value={'true'}
                             name='is_newsletter'>{t('form_fields.newsletter')}</RhfCheckbox>
            </div>

            <div className="mb-2">
                <RhfCheckbox
                    value={'true'}
                    control={control}
                    name='terms'>{t.rich('form_fields.terms')}</RhfCheckbox>
            </div>

            <div className="contact-form__form-submit">
                <OneButtonToRuleThemAll
                    background='icon'
                    type='submit'
                    iconAlign='right'
                    icon={<ArrowForward/>}
                    isBusy={isSubmitting}
                    disabled={!isValid || !isDirty || isSubmitting}
                >{isSubmitting ? t_btn('submitting') : t_btn('submit')}</OneButtonToRuleThemAll>
            </div>

            <RfhFormError errors={errors?.root?.server_error?.message}/>
        </form>
    );
}