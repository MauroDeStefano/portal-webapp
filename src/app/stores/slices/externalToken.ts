import {StateCreator} from "zustand";

export type TBusyStoreSlice = {
    isBusy: boolean;
    setIsBusy: (isBusy: boolean) => void;

    busyEl: HTMLElement | null;
    setBusyEl: (el: HTMLElement | null) => void;
}

export const busyStore: StateCreator<TBusyStoreSlice> = (set) => ({
    isBusy: false,
    setIsBusy: (isBusy: boolean) => set((state) => ({isBusy})),

    busyEl: null,
    setBusyEl: (el: HTMLElement | null) => set((state) => ({busyEl: el})),
});