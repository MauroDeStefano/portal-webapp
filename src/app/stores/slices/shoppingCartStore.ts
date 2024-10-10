import {deleteCookie, getCookie} from "cookies-next";
import {StateCreator} from "zustand";

import {updateCartContent} from "@/app/checkout/cart-server";
import {GIFT_CARD_COOKIE_NAME, ORDER_COOKIE_NAME} from "@/config";
import {TCartItem} from "@/types";

export type TAppliedGiftCard = {
    id: string | number;
}

export type TShoppingCartStoreStoreSlice = {
    cart: TCartItem[];
    addToCart: (item: TCartItem) => void;
    removeFromCart: (item: TCartItem) => void;
    updateCartItem: (item: TCartItem) => void;
    replaceCart: (cart: TCartItem[]) => void;
    emptyCart: () => void;

    cartType: TCartItem['product_type'];

    giftCard: null | TAppliedGiftCard;
    applyGiftCard: (giftCardID: TAppliedGiftCard | null) => void;

    giftCardEnabled: boolean;
    setGiftCardEnabled: (enabled: boolean) => void;
}

export const shoppingCartStore = ({
                                      cart: _cart,
                                      giftCard = null
                                  }: {
    cart?: TCartItem[],
    giftCard?: TAppliedGiftCard | null
}): StateCreator<TShoppingCartStoreStoreSlice> => (set) => {
    let cart: TCartItem[] = [];

    if (!_cart || _cart.length === 0) {
        const cookieCart = getCookie(ORDER_COOKIE_NAME);

        if (cookieCart) {
            cart = JSON.parse(cookieCart);
        }
    } else {
        cart = _cart;
    }

    const getCartType = (cart: TCartItem[]): 'HOUSE' | 'GIFT_CARD' => {
        if (cart.length === 0) {
            return 'HOUSE';
        }

        return cart[0].product_type;
    }

    const cartType = getCartType(cart);

    return {
        cart,

        cartType,

        giftCard,
        giftCardEnabled: !!giftCard,

        setGiftCardEnabled: (enabled) => set((state) => {
            return {giftCardEnabled: enabled};
        }),

        applyGiftCard: (giftCardID) => set((state) => {
            return {giftCard: giftCardID};
        }),

        addToCart: (item) => set((state) => {
            const cart = [...state.cart].filter((cartItem) => cartItem.product_type === item.product_type);
            cart.push(item);

            updateCartContent(cart);

            return {cart, cartType: getCartType(cart)};
        }),

        removeFromCart: (item) => set((state) => {
            const cart = state.cart.filter((cartItem) => cartItem.uniq_id !== item.uniq_id);

            updateCartContent(cart);

            return {cart, cartType: getCartType(cart)};
        }),

        updateCartItem: (updatedItem) => set((state) => {
            const cart = state.cart.map(item => item.uniq_id === updatedItem.uniq_id ? updatedItem : item);

            updateCartContent(cart);

            return {cart, cartType: getCartType(cart)};
        }),

        replaceCart: (newCart) => set((state) => {
            updateCartContent(newCart);

            return {cart: newCart, cartType: getCartType(newCart)};
        }),

        emptyCart: () => set((state) => {
            deleteCookie(GIFT_CARD_COOKIE_NAME);
            updateCartContent([]);

            return {cart: [], cartType: 'HOUSE'};
        }),
    };
};
