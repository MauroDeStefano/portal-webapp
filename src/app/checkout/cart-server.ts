'use server';

import {cookies} from "next/headers";

import {ORDER_COOKIE_DURATION_IN_SECONDS, ORDER_COOKIE_NAME, ORDER_INTENT_COOKIE_NAME} from "@/config";
import {TCartItem, TOrderIntent} from "@/types";

import 'server-only';



export async function updateCartContent(items: TCartItem[]) {
    cookies().set(ORDER_COOKIE_NAME, JSON.stringify(items), {
        maxAge: ORDER_COOKIE_DURATION_IN_SECONDS
    });
}

export async function addToCart(item: TCartItem, singleProductOnly = true) {
    console.debug('Adding item to cart', item);

    let cart: TCartItem[] = []

    if (!singleProductOnly) {
        cart = await getCart() || [];
    }

    cart.push(item);

    await updateCartContent(cart)
}

export async function getCart(): Promise<TCartItem[]> {
    const value = cookies().get(ORDER_COOKIE_NAME)?.value;

    if (!value) {
        return [];
    }

    return JSON.parse(value);
}

export async function getStoredIntent(): Promise<TOrderIntent> {
    const value = cookies().get(ORDER_INTENT_COOKIE_NAME)?.value;

    if (value === undefined) {
        return {} as TOrderIntent;
    }

    return JSON.parse(value);
}

export async function refreshCartExpiration() {
    console.debug('⌚ Refreshing cart expiration');
    await updateCartContent(await getCart())
}