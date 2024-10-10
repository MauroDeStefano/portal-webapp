'use client';

import {createContext, useContext} from "react";

import GiftCardSummaryList from "@/app/[locale]/(checkout)/order/steps/giftCardSummary/GiftCardSummaryList";

type GiftCardSummaryContext = {}
const GiftCardSummaryContext = createContext<GiftCardSummaryContext | null>(null);

export const useGiftCardSummaryContext = () => {
    const ctx = useContext(GiftCardSummaryContext);

    if (!ctx) {
        throw new Error('useGiftCardSummaryContext must be used within a GiftCardSummaryContextProvider');
    }

    return ctx;
}

export const GiftCardSummaryContextProvider = ({}: {}) => {
    const contextValue = {};
    return (
        <GiftCardSummaryContext.Provider value={contextValue}>
            <GiftCardSummaryList/>
        </GiftCardSummaryContext.Provider>
    );
};