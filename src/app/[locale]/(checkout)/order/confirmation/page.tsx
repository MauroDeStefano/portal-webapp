import React from "react";

import Footer from "@/app/[locale]/(checkout)/order/components/Footer";
import Header from "@/app/[locale]/(checkout)/order/components/Header";
import Failed from "@/app/[locale]/(checkout)/order/confirmation/components/Failed";
import Success from "@/app/[locale]/(checkout)/order/confirmation/components/Success";
import {getCart} from "@/app/checkout/cart-server";

import {OrderContextProvider} from "../OrderContext";

export type TStripeStatus =
    'cancelled'
    | 'processing'
    | 'requires_action'
    | 'requires_capture'
    | 'requires_confirmation'
    | 'requires_payment_method'
    | 'succeeded';

type TPage = {
    searchParams: {
        payment_intent: string,
        payment_intent_client_secret: string,
        redirect_status: TStripeStatus
    }
}
export default async function Page({
                                       searchParams: {
                                           payment_intent,
                                           payment_intent_client_secret,
                                           redirect_status
                                       }
                                   }: TPage) {
    const cart = await getCart();

    return (
        <OrderContextProvider cart={cart}>
            <div className="iterative-screens">
                <Header/>

                <div className="iterative-screens__body">
                    <div className="iterative-screens__body-container fl-container">
                        <div className="iterative-screens__body-wrapper">
                            {redirect_status === 'succeeded' ?
                                <Success payment_intent={payment_intent}/> :
                                <Failed status={redirect_status}/>
                            }
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        </OrderContextProvider>
    )
};