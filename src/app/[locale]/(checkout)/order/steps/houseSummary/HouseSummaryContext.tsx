'use client';

import React, {createContext, useContext, useEffect, useState} from "react";

import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import HouseSummary from "@/app/[locale]/(checkout)/order/steps/houseSummary/HouseSummary";
import SummaryCollapsed from "@/app/[locale]/(checkout)/order/steps/houseSummary/SummaryCollapsed";
import {useGetHousePrice} from "@/app/api-integration/house-price";
import {THouseBookingData} from "@/app/api-integration/normalizer/housePriceInDateRange";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {TCartItem, THouseCartItem} from "@/types";

type HouseSummaryContext = {
    cartItem: TCartItem & THouseCartItem;
    house: THouseBookingData;
    togglePet: (isSet?: boolean) => void;
};

const HouseSummaryContext = createContext<HouseSummaryContext | null>(null);

export const useHouseSummaryContext = () => {
    const ctx = useContext(HouseSummaryContext);

    if (!ctx) {
        throw new Error('useHouseSummaryContext must be used within a HouseSummaryContextProvider');
    }

    return ctx;
}

export function LoadHouseSummary({cartItem}: {
    cartItem: TCartItem & THouseCartItem;
}) {
    const [house, setHouse] = useState<THouseBookingData>({} as THouseBookingData);
    const [loaded, setLoaded] = useState(false);
    const fetchPrice = useGetHousePrice();

    useEffect(() => {
        const loadHouse = async () => {
            setHouse(await fetchPrice(cartItem));
            setLoaded(true);
        }

        loadHouse();
    }, []);

    if (!loaded) {
        return <LoadingSpinner/>;
    }

    return <HouseSummaryContextProvider
        house={house}
        cartItem={cartItem}/>;
}

export const HouseSummaryContextProvider = ({
                                                house,
                                                cartItem
                                            }: {
    house: THouseBookingData;
    cartItem: TCartItem & THouseCartItem;
}) => {
    const {
        user
    } = useFrilandContext((state) => state);
    const {
        setIsBusy,
        updateCartItem,
        step
    } = useOrderContext((state) => state);
    const [_house, setHouse] = useState<THouseBookingData>(house);
    const fetchPrice = useGetHousePrice();

    const contextValue = {
        house: _house,
        cartItem: cartItem,
        togglePet: (hasPet = false) => {
            setIsBusy(true);
            fetchPrice({...cartItem, hasPet})
                .then((house) => {
                    setHouse(house);
                })
                .finally(() => {
                    setIsBusy(false);
                })
        }
    };

    useEffect(() => {
        updateCartItem({
            ...cartItem,
            discount: _house.discount,
            hasPet: _house.has_pet,
            taxes: _house.taxes,
            petPrice: _house.pet_price,
            totalPrice: _house.totalPrice,
            totalPriceDiscounted: _house.totalPriceDiscounted,
            discountGiftCards: _house.discountGiftCards
        });
    }, [_house, user]);

    return (
        <HouseSummaryContext.Provider value={contextValue}>
            {step === 'summary' && <HouseSummary/>}
            {step === 'user-details' || step === 'confirmation' && <SummaryCollapsed/>}
        </HouseSummaryContext.Provider>
    );
};