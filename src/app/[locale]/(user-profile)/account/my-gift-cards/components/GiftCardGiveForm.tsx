'use client'

import React from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";

import {useSendGiftCard} from "@/app/api-integration/user-send-giftcard";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RfhFormError} from "@/app/components/Forms/FormError";
import {RhfTextArea} from "@/app/components/Forms/TextArea";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {TheDatePicker} from "@/app/components/Forms/TheDateRangePicker";
import {sendGiftCardValidator, TSendGiftCardFormSchema} from "@/app/serverActions/validators/sendGiftcardValidator";
import {maybeConvertDateToString, maybeConvertStringDateToACalendarDate} from "@/app/utils/calendarDates";
import ArrowForward from "@/assets/icons/arrow-forward.svg";
import {formatISO} from "date-fns";

type Props = {
    onCancel: () => void,
    onSend: () => void,
    giftCardId: number | string
}

export default function GiftCardGiveForm({
                                             onCancel,
                                             onSend,
                                             giftCardId
                                         }: Props) {
    const t = useTranslations('Forms.send_gift_card');
    const t_buttons = useTranslations('Forms.buttons');
    const formHandler = useSendGiftCard();

    const schema = sendGiftCardValidator({
        required_name: t('fields.receiver_name.errors.required'),
        required_surname: t('fields.receiver_surname.errors.required'),
        required_email: t('fields.receiver_email.errors.required'),
    });

    const {
        watch,
        control,
        handleSubmit,
        formState: {errors, isSubmitting, isDirty},
        setError
    } = useForm<TSendGiftCardFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            message: '',
            date: '',
        }
    });

    const action: () => void = handleSubmit(async (data) => {
        try {
            const response = await formHandler(giftCardId, {
                ...data,
                date: maybeConvertDateToString(data.date) || undefined
            })
            onSend?.();
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    });

    const onSubmit = async (data: TSendGiftCardFormSchema) => {
        console.log("called");
        try {
            const response = await formHandler(giftCardId, {
                ...data,
                date: maybeConvertDateToString(data.date) || undefined
            })
            onSend?.();
        } catch (e: any) {
            setError('root.server_error', {message: e.message});
        }
    }

    {/*
        Added onSubmit function, substituted to action
        because it rendered:
        <form action="javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you're trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
    */}

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="gift-card-overview-1__form">
                <div className="gift-card-overview-1__form-wrapper">
                    <button onClick={onCancel}
                            className="gift-card-overview-1__form-action">{t_buttons('cancel')}</button>
                    <div className="gift-card-overview-1__form-body">
                        <div className="share-gift-card-from">
                            <h3 className="gift-card-form__section-title">{t('insert_receiver_data')}</h3>
                            <div className="gift-card-form__fields-grid">
                                <div className="gift-card-form__form-field-wrapper half-width">
                                    <RhfTextField
                                        name='name'
                                        control={control}
                                        rules={{required: true}}
                                        disabled={isSubmitting}
                                        placeholder={t('fields.receiver_name.label')}
                                        autoComplete='given-name'
                                    />
                                </div>

                                <div className="gift-card-form__form-field-wrapper half-width">
                                    <RhfTextField
                                        name='surname'
                                        control={control}
                                        rules={{required: true}}
                                        disabled={isSubmitting}
                                        placeholder={t('fields.receiver_surname.label')}
                                        autoComplete='family-name'
                                    />
                                </div>

                                <div className="gift-card-form__form-field-wrapper half-width">
                                    <RhfTextField
                                        name='email'
                                        control={control}
                                        rules={{required: true}}
                                        disabled={isSubmitting}
                                        placeholder={t('fields.receiver_email.label')}
                                        autoComplete='email'
                                    />
                                </div>
                            </div>

                            <div className="gift-card-form__fields-grid">
                                <div className="gift-card-form__form-field-wrapper">
                                    <h3 className="gift-card-form__section-title">{t('your_message')}</h3>
                                    <RhfTextArea
                                        name='message'
                                        control={control}
                                        autoResize={true}
                                        disabled={isSubmitting}
                                        placeholder={t('fields.message.label')}
                                    />
                                </div>
                            </div>

                            <div className="gift-card-form__fields-grid">
                                <div className="gift-card-form__form-field-wrapper">
                                    <h3 className="gift-card-form__section-title">{t('send_deferred')}</h3>

                                    <Controller
                                        name='date'
                                        control={control}
                                        render={({field, fieldState}) => {
                                            return (
                                                <div className="form__textfield-wrapper">
                                                    <TheDatePicker
                                                        ranged={false}
                                                        inline={false}
                                                        isDisabled={isSubmitting}
                                                        value={field.value ? maybeConvertStringDateToACalendarDate(field.value) : undefined}
                                                        onChange={(date) => {
                                                            // @ts-ignore
                                                            field.onChange(!date ? '' : formatISO(date));
                                                        }}
                                                    />
                                                </div>

                                            )
                                        }}/>
                                </div>
                            </div>

                            <div className="gift-card-form__fields-grid">
                                <div className="gift-card-form__form-submit">
                                    <OneButtonToRuleThemAll
                                        background='icon'
                                        type='submit'
                                        iconAlign='right'
                                        icon={<ArrowForward/>}
                                        isBusy={isSubmitting}
                                        disabled={!isDirty || isSubmitting}
                                    >{t('submit_cta')}</OneButtonToRuleThemAll>
                                </div>
                            </div>

                            <RfhFormError errors={errors?.root?.server_error?.message}/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}