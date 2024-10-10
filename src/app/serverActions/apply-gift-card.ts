'use server';

import {cookies} from "next/headers";

import {TAppliedGiftCard} from "@/app/stores/slices/shoppingCartStore";
import {GIFT_CARD_COOKIE_NAME, ORDER_COOKIE_DURATION_IN_SECONDS} from "@/config";

import 'server-only'

export async function applyGiftCard(giftCardID: string | number) {
    cookies().set(GIFT_CARD_COOKIE_NAME, JSON.stringify({
        id: giftCardID
    }), {
        maxAge: ORDER_COOKIE_DURATION_IN_SECONDS
    });
}

export async function getAppliedGiftCard(): Promise<TAppliedGiftCard | undefined> {
    const giftCard = cookies().get(GIFT_CARD_COOKIE_NAME);

    if (!giftCard) {
        return;
    }

    return JSON.parse(giftCard.value);
}