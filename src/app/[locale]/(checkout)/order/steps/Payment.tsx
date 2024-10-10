'use client';

import React, {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {PaymentElement, useElements} from "@stripe/react-stripe-js";
import {useTranslations} from "next-intl";

import ProductSummary from "@/app/[locale]/(checkout)/order/components/ProductSummary";
import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import PaymentZero from "@/app/[locale]/(checkout)/order/steps/PaymentZero";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {RfhFormError} from "@/app/components/Forms/FormError";
import {ArrowForwardIcon} from "@/app/components/Icons";
import {TCompleteOrderSchema} from "@/app/serverActions/validators/completeOrderValidator";
import Alert from "@/assets/icons/alert.svg";
import {getStoredIntent} from "@/app/checkout/cart-server";
import {useRouter} from "@i18n/config";

export default function Payment() {
    const t = useTranslations('Checkout');
    const t_next = useTranslations('Checkout.step_button_nav');
    const stripeElements = useElements();

    const {
        cart,
        step,
    } = useOrderContext((state) => state);

    const {
        trigger,
        clearErrors,
        getValues,

        formState: {errors, isSubmitting, isValid},
    } = useFormContext<TCompleteOrderSchema>();

    const router = useRouter();
    const minimumAmount = parseInt(process?.env?.NEXT_PUBLIC_STRIPE_MINIMUM_AMOUNT_IN_CENTS as string, 10);

    const amount = Math.max(minimumAmount, 100 * cart.reduce((acc, item) => acc + item?.totalPriceDiscounted || 0, 0))

    const [canPay, setCanPay] = useState(amount === minimumAmount);

    stripeElements?.update({
        amount,
    });

    useEffect(() => {
        if (step !== 'payment') {
            return;
        }

        let intervalId = setInterval(async () => {
            const intent = await getStoredIntent();
            if (Object.keys(intent).length === 0) {
                router.push({pathname: '/'} );
                return;
            }
        }, 5000);
        return () => clearInterval(intervalId);
    }, [router, step]);

    if (step !== 'payment') {
        return null;
    }



    return <>
        {cart.map((item) => (
            <ProductSummary item={item} key={item.uniq_id}/>
        ))}

        <div className="card-1">
            {amount > 1 ?
                <PaymentElement
                    onChange={({complete, ...etc}) => {
                        setCanPay(complete);
                    }}
                    options={{
                        defaultValues: {
                            billingDetails: {
                                name: `${getValues('name')} ${getValues('surname')}`,
                                phone: getValues('phone'),
                                email: getValues('email'),
                            }
                        }
                    }}/>
                : <PaymentZero/>}

            <RfhFormError
                size={'large'}
                errors={errors?.root?.server_error?.message}
                spacing={'mt-8'}
                icon={<Alert/>}
                onClick={() => {
                    clearErrors();
                    trigger();
                }}
            />

            <div className="payment-form-1__submit items-center mt-16">
                <div className="payment-form-1__submit-text">
                    {t.rich('payment_form.implicit_privacy_agreement')}
                </div>

                <div className="payment-form-1__submit-button">
                    <OneButtonToRuleThemAll
                        background={'icon'}
                        icon={<ArrowForwardIcon/>}
                        type={'submit'}
                        disabled={!isValid || !canPay}
                        isBusy={isSubmitting}
                    >{t_next('payment')}</OneButtonToRuleThemAll>
                </div>
            </div>
        </div>
    </>;
};