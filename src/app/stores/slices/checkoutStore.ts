import {StateCreator} from "zustand";

export type TStep = 'summary' | 'user-details' | 'payment' | 'confirmation';
export type TFrilandCheckoutStoreSlice = {
    step: TStep;
    goToSummary: () => void;
    goToPayment: () => void;
    goToConfirmation: () => void;
    goToUserDetails: () => void;

    canChangeStep: boolean;
    setCanChangeStep: (value: boolean) => void;

    isBusy: boolean;
    setIsBusy: (value: boolean) => void;

    error: string;
    setError: (value: string) => void;
}


export const checkoutStore = (step: TStep = 'summary'): StateCreator<TFrilandCheckoutStoreSlice> => (set) => {
    return {
        step,

        error: '',

        setError: (error) => set((state) => {
            return {error};
        }),

        canChangeStep: true,
        setCanChangeStep: (canChangeStep: boolean) => set((state) => {
            return {canChangeStep};
        }),

        isBusy: false,

        setIsBusy: (isBusy: boolean) => set((state) => {
            return {isBusy};
        }),

        goToSummary: () => set((state) => {
            return {step: 'summary'};
        }),

        goToPayment: () => set((state) => {
            return {step: 'payment'};
        }),

        goToConfirmation: () => set((state) => {
            return {step: 'confirmation'};
        }),

        goToUserDetails: () => set((state) => {
            return {step: 'user-details'};
        }),

    };
};
