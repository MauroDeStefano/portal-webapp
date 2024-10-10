'use client';

import React, {createContext, useContext} from "react";
import {createPortal} from "react-dom";
import {useRouter} from "@i18n/config";

import DesktopCart from "@/app/[locale]/(static)/gift-card/components/DesktopCart";
import MobileCart from "@/app/[locale]/(static)/gift-card/components/MobileCart";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {TCartItem} from "@/types";

type CartContext = {
    isCartVisible: (productType: TCartItem['product_type']) => boolean;
    isCartExpanded: boolean;
    setIsCartExpanded: (value: boolean) => void;
    toggleCart: () => void;

    isRedirecting: boolean;
    completePurchase: () => void;
}

const CartContext = createContext<CartContext | null>(null);

export const useGiftCardCartContext = () => {
    const ctx = useContext(CartContext);

    if (!ctx) {
        throw new Error('useCartContext must be used within a CartContextProvider');
    }

    return ctx;
}

export default function Cart() {
    const {
        cart,
    } = useFrilandContext((state) => state)
    const router = useRouter();

    const [isCartExpanded, setIsCartExpanded] = React.useState(false);
    const [isRedirecting, setIsRedirecting] = React.useState(false);

    const contextValue = {
        isRedirecting,

        isCartExpanded, setIsCartExpanded,
        toggleCart: () => setIsCartExpanded(!isCartExpanded),

        isCartVisible: (productType: string) => {
            return cart.some((item) => item.product_type === productType);
        },

        completePurchase: () => {
            if (isRedirecting) {
                return;
            }
            setIsRedirecting(true);
            router.push({
                pathname: '/order',
            });
        }
    };

    return (
        <CartContext.Provider value={contextValue}>
            {
                typeof document !== 'undefined' &&
                createPortal(<>
                    <DesktopCart/>
                    <MobileCart/>
                </>, document.body)
            }
        </CartContext.Provider>
    );
};
