'use client';

import {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {useRouter, useSearchParams} from "next/navigation";
import {StoreApi, useStore} from "zustand";

import {OrderFormContextProvider} from "@/app/[locale]/(checkout)/order/OrderFormContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {TStep} from "@/app/stores/slices/checkoutStore";
import {createFrilandCheckoutStore, TFrilandCheckoutStore,} from "@/app/stores/useFriland";
import {TCartItem} from "@/types";

const STRIPE_PUBLIC_KEY = process?.env?.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const stripeOptions: StripeElementsOptions = {
    mode: 'payment',
    amount: parseInt(process?.env?.NEXT_PUBLIC_STRIPE_MINIMUM_AMOUNT_IN_CENTS as string, 10),
    // paymentMethodCreation: 'manual',
    currency: process?.env?.NEXT_PUBLIC_CURRENCY?.toLowerCase(),

    appearance: {
        theme: 'stripe',

        labels: 'floating',

        variables: {
            colorBackground: '#fff',
        },

        rules: {
            '.Input': {
                border: '0.1rem solid #c6c6c6',
                padding: '0.8rem 2.6rem',
                borderRadius: '30rem',
            },

            '.CheckboxInput': {
                border: '0.1rem solid #c6c6c6',
            },
        }
    },
};

const OrderContext = createContext<StoreApi<TFrilandCheckoutStore> | null>(null);

export const useOrderContext = <T, >(
    selector: (store: TFrilandCheckoutStore) => T,
): T => {
    const ctx = useContext(OrderContext);

    if (!ctx) {
        throw new Error('useOrderContext must be used within a OrderContextProvider');
    }

    return useStore(ctx, selector);
}

export const OrderContextProvider = ({
                                         cart,
                                         emptyCart = false,
                                         children
                                     }: {
    cart: TCartItem[];
    emptyCart?: boolean;
    children: ReactNode
}) => {
    const router = useRouter();
    const storeRef = useRef<StoreApi<TFrilandCheckoutStore>>()
    const mainStore = useFrilandContext((state) => state);

    const searchParams = useSearchParams();

    if (!storeRef.current) {
        storeRef.current = createFrilandCheckoutStore({
            cart,
            step: (searchParams.get('step') ?? 'summary') as TStep
        });
    }

    if (emptyCart) {
        storeRef.current.getState().emptyCart();
    }

    useEffect(() => storeRef.current!.subscribe(({cart}, {step: old}) => {
        mainStore.replaceCart(cart);
    }), []);

    useEffect(() => storeRef.current!.subscribe(({step}, {step: old}) => {
        if (step === old) return;
        router.push(`?step=${step}`, {scroll: true});
    }), [])

    return (
        <Elements stripe={stripePromise} options={stripeOptions}>
            <OrderContext.Provider value={{...storeRef.current}}>
                <OrderFormContextProvider>
                    {children}
                </OrderFormContextProvider>
            </OrderContext.Provider>
        </Elements>
    );
};