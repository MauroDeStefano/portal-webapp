'use client';

import React, {createContext, ReactNode, useContext} from "react";

import {AvailabilityDate} from "@/types";

type CheckAvailabilityFormContext = {
    houseID?: number;
    availableDates: AvailabilityDate[];

    fixedPosition: boolean;
}
const CheckAvailabilityFormContext = createContext<null | CheckAvailabilityFormContext>(null);

export const useCheckAvailabilityFormContext = (): CheckAvailabilityFormContext => {
    const ctx = useContext(CheckAvailabilityFormContext);

    if (!ctx) {
        throw new Error('useCheckAvailabilityFormContext must be used within a CheckAvailabilityFormContextProvider');
    }

    return ctx;
}

export function CheckAvailabilityFormContextProvider<Frm>({
                                                              children,
                                                              houseID,
                                                              availableDates = [],
                                                              fixedPosition = false
                                                          }: {
    children: ReactNode
    houseID?: number;
    availableDates?: AvailabilityDate[];
    fixedPosition?: boolean;
}) {

    const value = {
        houseID,
        availableDates,
        fixedPosition,
    };

    return (
        <CheckAvailabilityFormContext.Provider value={value}>
            {children}
        </CheckAvailabilityFormContext.Provider>
    );
}