'use client';

import {useFormContext} from "react-hook-form";
import classNames from "classnames";
import {useTranslations} from "next-intl";

import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RhfCheckbox} from "@/app/components/Forms/Checkbox";
import {RhfTextField} from "@/app/components/Forms/TextField";
import {ArrowForwardIcon} from "@/app/components/Icons";
import {TCompleteOrderSchema} from "@/app/serverActions/validators/completeOrderValidator";

export default function UserDetails() {
    {
        const t = useTranslations('Checkout.payment_form');
        const t_next = useTranslations('Checkout.step_button_nav');

        const {
            control, setValue,
            formState: {
                isValid,
                isSubmitting
            }
        } = useFormContext<TCompleteOrderSchema>();

        const {
            step,
        } = useOrderContext((state) => state);

        return (
            <div className={classNames({
                "card-1": true,
                "hidden": step !== 'user-details'
            })}>
                <div className="payment-form-1">
                    <div className="payment-form-1__header justify-between">
                        <h2 className="payment-form-1__title">{t('title')}</h2>
                        <div className="payment-form-1__notes">{t('subtitle')}</div>
                    </div>

                    <div className="payment-form-1__form">
                        <div className="payment-form-1__fields-grid">
                            <div className="payment-form-1__form-field half-width">
                                <RhfTextField name='name' control={control} placeholder={t('fields.name')}/>
                            </div>

                            <div className="payment-form-1__form-field half-width">
                                <RhfTextField name='surname' control={control} placeholder={t('fields.surname')}/>
                            </div>

                            <div className="payment-form-1__form-field">
                                <RhfTextField name='email' control={control} placeholder={t('fields.email')}/>
                            </div>

                            <div className="payment-form-1__form-field">
                                <RhfTextField name='phone' control={control} placeholder={t('fields.phone')}/>
                            </div>
                        </div>

                        <div className="payment-form-1__checkboxes">
                            <div className="payment-form-1__checkbox">
                                <RhfCheckbox
                                    control={control}
                                    name='newsletter_subscription'>{t('fields.subscribe_to_newsletter')}</RhfCheckbox>
                            </div>
                        </div>

                        <p className="payment-form-1__form-notes">
                            {t.rich('fields.data_request')}
                        </p>
                    </div>

                    <div className="payment-form-1__submit">
                        <div className=""></div>
                        <div
                            className="payment-summary__button-wrapper">
                            <OneButtonToRuleThemAll
                                background={'icon'}
                                icon={<ArrowForwardIcon/>}
                                type={'submit'}
                                disabled={!isValid || isSubmitting}
                            >{t_next('review')}</OneButtonToRuleThemAll>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};