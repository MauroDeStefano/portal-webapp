'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {FormProvider, SetValueConfig, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getPathNameWithPrefix} from "@i18n/config";
import {useElements, useStripe} from "@stripe/react-stripe-js";
import {getCookie, setCookie} from "cookies-next";
import {useLocale, useTranslations} from "next-intl";

import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {usePaymentIntent} from "@/app/api-integration/checkout-house-payment";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {completeOrderValidator, TCompleteOrderSchema} from "@/app/serverActions/validators/completeOrderValidator";
import {maybeConvertDateToString} from "@/app/utils/calendarDates";
import {ORDER_INTENT_COOKIE_DURATION_IN_SECONDS, ORDER_INTENT_COOKIE_NAME} from "@/config";
import {TOrderIntent} from "@/types";

type OrderFormContext = {}
const OrderFormContext = createContext<OrderFormContext | null>(null);

export const useOrderFormContext = () => {
    const ctx = useContext(OrderFormContext);

    if (!ctx) {
        throw new Error('useOrderFormContext must be used within a OrderFormContextProvider');
    }

    return ctx;
}

export const OrderFormContextProvider = ({
                                             children
                                         }: {
    children: ReactNode
}) => {
    const elements = useElements();
    const stripe = useStripe();
    const locale = useLocale();
    const {user} = useFrilandContext((state) => state);

    const [intent, setIntent] = useState<null | TOrderIntent>(null);

    const t = useTranslations('Forms.generic');
    const {
        cart,
        cartType,
        step,
        goToPayment,
        goToConfirmation
    } = useOrderContext((state) => state);

    const getPaymentIntent = usePaymentIntent();

    const schema = completeOrderValidator({
        required_email: t('fields.email.errors.required'),
        required_name: t('fields.name.errors.required'),
        required_surname: t('fields.surname.errors.required'),
        required_phone: t('fields.phone.errors.required'),
    });

    let extraValues: Record<string, any> = {};

    extraValues.giftCards = cart.map((item) => {
        if (item.product_type !== 'GIFT_CARD') {
            return
        }

        return {
            delivery_method: item.delivery_method ?? 'myself',
            gift_card_template_id: item.product_id,
            id: item.uniq_id,

            name: item.recipient.name ?? '',
            surname: item.recipient.surname ?? '',
            email: item.recipient.email ?? '',
            date_gift: maybeConvertDateToString(item.recipient.date_gift) || undefined,
            message: item.recipient.message ?? '',
        };
    });

    const form = useForm<TCompleteOrderSchema>({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: {
            cart_type: cartType,
            name: user?.name ?? '',
            surname: user?.surname ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
            newsletter_subscription: user?.preferences.newsletter_subscription ? 'true' : 'false',
            invoice: 'false',
            ...extraValues
        }
    });

    useEffect(() => {
        if (!user) {
            return;
        }

        const opts: SetValueConfig = {
            shouldValidate: true,
            shouldTouch: true,
            shouldDirty: true
        };

        !form.getValues('name') && form.setValue('name', user.name, opts);
        !form.getValues('surname') && form.setValue('surname', user.surname, opts);
        !form.getValues('email') && form.setValue('email', user.email, opts);
        !form.getValues('phone') && form.setValue('phone', user.phone, opts);
        !form.getValues('newsletter_subscription') && form.setValue('newsletter_subscription', user.preferences.newsletter_subscription ? 'true' : 'false', opts);
    }, [user]);

    useEffect(() => {
        if (step !== 'payment') {
            return;
        }
        const cartIDs = cart.map((item) => item.uniq_id);

        if (cart.find((item) => item.product_type === 'HOUSE')) {
            const _saved = getCookie(ORDER_INTENT_COOKIE_NAME);
            const saved: null | TOrderIntent = _saved ? JSON.parse(_saved) : null;

            if (saved && !saved.error) {
                if (saved.cartIDs.sort().join('') === cartIDs.sort().join('')) {
                    console.debug('🍪 Intent already exists');

                    setIntent(saved);
                    return;
                }
            }
        }

        const maybeSetIntent = async () => {
            console.debug('💵 Getting Intent');

            const {getValues} = form;

            const [intentObj, intentError] = await getPaymentIntent(cart, {
                email: getValues('email'),
                name: getValues('name'),
                surname: getValues('surname'),
                phone: getValues('phone'),
                newsletter_subscription: getValues('newsletter_subscription') ? 'true' : 'false',
            });

            const data: TOrderIntent = {
                client_secret: intentObj?.client_secret ?? null,
                error: intentError ?? null,
                cartIDs: cartIDs
            };

            if (intentError) {
                console.debug('intentObjError', intentError);
                form.setError('root.server_error', {message: intentError});
            } else {
                console.debug('🍪 Save payment Intent');
                setCookie(ORDER_INTENT_COOKIE_NAME, JSON.stringify(data), {
                    maxAge: ORDER_INTENT_COOKIE_DURATION_IN_SECONDS
                });
            }

            setIntent(data);
        }

        maybeSetIntent();
    }, [step])

    const contextValue = {};

    const action: () => void = form.handleSubmit(async (data) => {
        if (step === 'user-details' || !form.formState.isValid) {
            goToPayment();
            return;
        }

        if (intent === null) {
            return;
        }

        console.debug('✅ Validating form');
        const {error: submitError} = await elements!.submit();

        if (submitError) {
            console.debug('submitError', submitError);
            form.setError('root.server_error', {message: submitError.message});
            return;
        }

        if (intent.error) {
            console.debug('intentError', intent.error);
            form.setError('root.server_error', {message: intent.error});
            return;
        }

        if (intent.client_secret === '' && !intent.error) {
            goToConfirmation();
            return;
        }

        const {error: confirmError} = await stripe!.confirmPayment({
            elements: elements!,
            clientSecret: intent.client_secret as string,
            confirmParams: {
                return_url: `${process?.env?.NEXT_PUBLIC_SITE_DOMAIN}${getPathNameWithPrefix({
                    href: '/order/confirmation?step=confirmation',
                    locale
                })}`
            },
        });

        if (confirmError) {
            console.debug('confirmError', confirmError);
            form.setError('root.server_error', {message: confirmError.message});
            return;
        }

        goToConfirmation();
    });

    if (!elements || !stripe) {
        // do we even have this situation?
        return null;
    }

    return (
        <OrderFormContext.Provider value={contextValue}>
            <FormProvider {...form}>
                <form action={action}>
                    <input type="hidden" {...form.register('cart_type')}/>
                    {children}
                </form>
            </FormProvider>
        </OrderFormContext.Provider>
    );
};