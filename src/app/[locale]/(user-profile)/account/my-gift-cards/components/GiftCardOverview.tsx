'use client'

import React from "react";
import {useTranslations} from "next-intl";

import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";

type Props = {
    nights?: number,
    expiration?: string,
    price: number,
    children?: React.ReactNode
}

export default function GiftCardOverview(props: Props) {
    const tom = useTranslations('OneMany');
    const currency = useCurrencyFormatter();

    return (
        <>
            <div className="gift-card-overview-1">
                <div className="gift-card-overview-1__overview">
                    <p className="gift-card-overview-1__num-nights">{tom('night', {count: props?.nights})}</p>

                    <div className="gift-card-overview-1__details">
                        <p className="gift-card-overview-1__price">{currency(props.price)}</p>
                    </div>
                </div>
                {props?.children}
            </div>
        </>
    );
}