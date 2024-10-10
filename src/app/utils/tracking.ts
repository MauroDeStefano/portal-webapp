'use client'
import {useRef} from "react";
import {event as gaEvent} from "nextjs-google-analytics";

import {TCartItem} from "@/types";
import {FBEventPayload, FBEventPayloadItem, GAEventPayload, GAEventPayloadItem} from "@/types/trackingPayloads";

import {event as fbEvent} from "./fbpixel";
import {pathnames} from "@i18n/config";

export type TGenericEventObject = {
    product_id: number;
    uniq_id?: string;

    product_name: string;
    product_url?: keyof typeof pathnames;

    totalPrice: number;
    taxes?: number;
    discount?: number;
    totalPriceDiscounted: number;
    discountGiftCards?: number;
}



const getTotalPrice = (cart: TCartItem[] | TGenericEventObject[]): number => {
    return cart.reduce((acc, item) => {
        return acc + item.totalPrice;
    }, 0);
}

export function useTrackOrderComplete() {
    const sent = useRef<string[]>([])
    return (cart: TCartItem[], orderId = '') => {
        const cacheKey = JSON.stringify(cart) + orderId;

        if (sent.current.includes(cacheKey)) {
            return;
        }

        sent.current.push(cacheKey);

        fbEvent('Purchase', getFacebookPayload(cart, orderId));
        gaEvent('purchase', getGooglePayload(cart, orderId));
    };
}

export function useTrackViewContent() {
    return (obj: TGenericEventObject[]) => {
        fbEvent('ViewContent', getFacebookPayload(obj));
        gaEvent('view_item', getGooglePayload(obj));
    }
}

export function useTrackAddToCart() {
    return (obj: TGenericEventObject[]) => {
        fbEvent('AddToCart', getFacebookPayload(obj));
        gaEvent('add_to_cart', getGooglePayload(obj));
    }
}

const getFacebookPayload = (cart: TCartItem[] | TGenericEventObject[] , orderId?: string): FBEventPayload => {
    const payload = {
        currency: 'EUR',
        content_type: "product",
        value: getTotalPrice(cart),
        content_ids: cart.map(({product_id}, index) => product_id),
    } as FBEventPayload

    payload.contents = cart.map((item, index): FBEventPayloadItem => {
        return {
            id: item.product_id,
            quantity: 1,
            item_price: item.totalPrice
        }
    });

    if (orderId !== '') {
        payload.order_id = orderId;
    }

    console.debug('🍪 Facebook tracking payload', payload);
    return payload;
}

const getGooglePayload = (cart: TCartItem[] | TGenericEventObject[], orderId?: string): GAEventPayload => {
    let payload = {
        currency: 'EUR',
        value: getTotalPrice(cart),
    } as GAEventPayload;

    payload.items = cart.map((item, index): GAEventPayloadItem => {
        return {
            item_id: item.product_id,
            item_name: item.product_name,
            price: item.totalPriceDiscounted,
            quantity: 1
        }
    });

    if (orderId !== '') {
        payload.transaction_id = orderId;
    }

    console.debug('🍪 Google Tracking payload', payload);
    return payload;
}