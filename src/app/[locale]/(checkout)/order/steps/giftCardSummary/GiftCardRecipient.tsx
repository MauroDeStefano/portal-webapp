import React from "react";
import {Controller, useFormContext, useWatch} from "react-hook-form";
import classNames from "classnames";
import {formatISO} from "date-fns";
import {useTranslations} from "next-intl";

import {RadioRfh} from "@/app/components/Forms/Radio";
import {RhfTextArea} from "@/app/components/Forms/TextArea";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {TheDatePicker} from "@/app/components/Forms/TheDateRangePicker";
import {TCompleteOrderSchema} from "@/app/serverActions/validators/completeOrderValidator";
import {maybeConvertStringDateToACalendarDate} from "@/app/utils/calendarDates";
import {TCartItem} from "@/types";

type TGiftCardRecipientsProps = {
    item: TCartItem
    index: number
}

function GiftCardEmail({
                           index,
                           conditional
                       }: {
    index: number
    conditional: boolean
}) {
    const {control, ...etc} = useFormContext<TCompleteOrderSchema>();

    const t = useTranslations('Forms.send_gift_card');

    return (
        <div className={classNames({
            'radio-accordion p-8 mt-8': true,
            'hidden': !conditional
        })}>
            <h3 className="gift-card-form__section-title">{t('insert_receiver_data')}</h3>

            <div className="gift-card-form__fields-grid">
                <div
                    className="gift-card-form__form-field-wrapper gift-card-form__form-field-wrapper--half-width">
                    <RhfTextField
                        control={control}
                        conditional={conditional}
                        name={`giftCards.${index}.name`}
                        placeholder={t('fields.receiver_name.label')}/>
                </div>

                <div
                    className="gift-card-form__form-field-wrapper gift-card-form__form-field-wrapper--half-width">
                    <RhfTextField
                        control={control}
                        conditional={conditional}
                        name={`giftCards.${index}.surname`}
                        placeholder={t('fields.receiver_surname.label')}/>
                </div>

                <div
                    className="gift-card-form__form-field-wrapper gift-card-form__form-field-wrapper--half-width">
                    <RhfTextField
                        control={control}
                        conditional={conditional}
                        name={`giftCards.${index}.email`}
                        placeholder={t('fields.receiver_email.label')}
                        type={'email'}/>
                </div>
            </div>

            <h3 className="gift-card-form__section-title">{t('fields.message.label')}</h3>

            <div className="gift-card-form__fields-grid">
                <div className=" gift-card-form__form-field-wrapper">
                    <RhfTextArea
                        control={control}
                        conditional={conditional}
                        name={`giftCards.${index}.message`}
                        autoResize={true}/>
                </div>
            </div>

            <h3 className="gift-card-form__section-title">{t('fields.send_date.label_alt')}</h3>

            <div className="share-gift-card-from__date-time-fields">
                <div className="share-gift-card-from__date-field">
                    <Controller
                        name={`giftCards.${index}.date_gift`}
                        control={control}
                        render={({field, fieldState}) => {
                            if (!conditional) {
                                return <>/</>;
                            }
                            return (
                                <div className="form__textfield-wrapper">
                                    <TheDatePicker
                                        ranged={false}
                                        inline={false}
                                        minDate={new Date()}
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
        </div>
    );
}

export default function GiftCardRecipient({index, item}: TGiftCardRecipientsProps) {
    const t = useTranslations('Checkout.gift');

    const form = useFormContext<TCompleteOrderSchema>();
    const {control, register} = form;
    const delivery_method = useWatch({
        name: `giftCards.${index}.delivery_method`,
        control
    });

    return (
        <>
            <input
                type="hidden"
                defaultValue={item.uniq_id}
                {...register(`giftCards.${index}.id`)} />

            <input
                type="hidden"
                defaultValue={item.product_id}
                {...register(`giftCards.${index}.gift_card_template_id`)} />

            <div className="flex gap-4 lg:gap-20 flex-col lg:flex-row">
                <RadioRfh
                    name={`giftCards.${index}.delivery_method`}
                    control={control}
                    options={[
                        {value: 'myself', label: t('delivery.myself.title')},
                        {value: 'email', label: t('delivery.email.title')},
                    ]}/>
            </div>

            <GiftCardEmail index={index} conditional={delivery_method === 'email'}/>
        </>
    );
}