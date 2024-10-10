'use client';

import {useEffect} from "react";
import {useTranslations} from "next-intl";

import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {TCartItem} from "@/types";

type TSummaryGiftCardOrderCompleteProps = {
    item: TCartItem
}

export default function SummaryGiftCardOrderComplete({item}: TSummaryGiftCardOrderCompleteProps) {
    const t = useTranslations('Reservation');
    const {
        emptyCart
    } = useOrderContext((state) => state);

    useEffect(() => {
        emptyCart();
    }, [])

    if (item.product_type !== 'GIFT_CARD') {
        return null;
    }

    return (
        <>

            <div className="gift-card-overview-3__item">
                <div className="gift-card-overview-3__item-title">
                    {item.product_name}
                </div>

                <div className="gift-card-overview-3__item-num-nights">
                    {t('nights_label', {night_count: item.qty})}
                </div>
            </div>
        </>
    );
}