import React from "react";
import {redirect} from "@i18n/config";

import Footer from "@/app/[locale]/(checkout)/order/components/Footer";
import Header from "@/app/[locale]/(checkout)/order/components/Header";
import StepHeading from "@/app/[locale]/(checkout)/order/components/StepHeading";
import {OrderContextProvider} from "@/app/[locale]/(checkout)/order/OrderContext";
import {
    GiftCardSummaryContextProvider
} from "@/app/[locale]/(checkout)/order/steps/giftCardSummary/GiftCardSummaryContextProvider";
import {LoadHouseSummary} from "@/app/[locale]/(checkout)/order/steps/houseSummary/HouseSummaryContext";
import Payment from "@/app/[locale]/(checkout)/order/steps/Payment";
import UserDetails from "@/app/[locale]/(checkout)/order/steps/UserDetails";
import {getCart} from "@/app/checkout/cart-server";

interface Props {
    params: { locale: string };
}

export default async function page({params: {locale}}: Props) {
    let cart = await getCart();

    if (cart.length === 0) {
        redirect('/destinations');
        return;
    }

    return (
        <OrderContextProvider cart={cart}>
            <div className="iterative-screens">
                <Header/>

                <div className="iterative-screens__body">
                    <div className="iterative-screens__body-container fl-container">
                        <div className="iterative-screens__body-wrapper">
                            <StepHeading/>

                            {cart.map(async (item) => {
                                if (item.product_type === 'HOUSE') {
                                    return <LoadHouseSummary
                                        key={item.uniq_id}
                                        cartItem={item}
                                    />
                                }
                                return null;
                            })}

                            {cart?.[0]?.product_type === 'GIFT_CARD' &&
                                <GiftCardSummaryContextProvider/>
                            }

                            <UserDetails/>
                            <Payment/>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        </OrderContextProvider>
    );
};
