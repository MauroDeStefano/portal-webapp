import {StateCreator} from "zustand";

import {DatePickerValue} from "@/app/components/Forms/AvailabilityForm/types";
import {Region} from "@/types";


type TActiveRegion = Region | null;
type TActiveDateRange = DatePickerValue | null;

type TSetReservationFormData = {
    activeRegion: TActiveRegion;
    activeDateRange: TActiveDateRange;
}

export type THouseReservationStoreSlice = {
    activeRegion: TActiveRegion;
    setActiveRegion: (region: TActiveRegion) => void;

    activeDateRange: TActiveDateRange;
    setActiveDateRange: (dateRange: TActiveDateRange) => void;

    setReservationFormData: ({activeRegion, activeDateRange}: TSetReservationFormData) => void;
}

export const houseReservationStore: StateCreator<THouseReservationStoreSlice> = (set) => {
    return {
        activeRegion: null,
        setActiveRegion: (activeRegion: TActiveRegion) => set((state) => ({
            activeRegion
        })),

        activeDateRange: null,
        setActiveDateRange: (activeDateRange) => set((state) => {
            return {
                activeDateRange
            };
        }),

        setReservationFormData: ({activeRegion, activeDateRange}: TSetReservationFormData) => set((state) => {
            return {
                activeDateRange,
                activeRegion
            };
        }),
    };
};