import {create} from "zustand";
import {devtools} from "zustand/middleware";

import {DatePickerValue} from "@/app/components/Forms/AvailabilityForm/types";
import {authStore} from "@/app/stores/slices/authStore";
import {busyStore, TBusyStoreSlice} from "@/app/stores/slices/busyStore";
import {checkoutStore, TFrilandCheckoutStoreSlice, TStep} from "@/app/stores/slices/checkoutStore";
import {drawerStore, TDrawerStoreSlice} from "@/app/stores/slices/drawerStore";
import {houseReservationStore, THouseReservationStoreSlice} from "@/app/stores/slices/houseReservationStore";
import {shoppingCartStore, TAppliedGiftCard, TShoppingCartStoreStoreSlice} from "@/app/stores/slices/shoppingCartStore";
import {normalizeDateRange} from "@/app/utils/calendarDates";
import {AvailabilityDate, Region, TCartItem, TDateRangeString} from "@/types";
import {TAuthStoreLoggedInSlice, TAuthStoreSlice} from "@/types/auth";

export type TFrilandStore = {
    availableValidDateRange: DatePickerValue;
    availableRegions: Region[];
    dateRangeGifts: AvailabilityDate[];
} & TAuthStoreSlice
    & TAuthStoreLoggedInSlice
    & TDrawerStoreSlice
    & TBusyStoreSlice
    & TShoppingCartStoreStoreSlice
    & THouseReservationStoreSlice

export const createFrilandStore = ({dateRange, regions, dateRangeGifts, giftCard}: {
    dateRange: TDateRangeString;
    regions: Region[];
    dateRangeGifts: AvailabilityDate[];
    giftCard?: TAppliedGiftCard;
}) => {
    console.debug('⚙️ Fri.land Store Init');

    return create<TFrilandStore>()(devtools((...args) => {
        return {
            availableValidDateRange: normalizeDateRange(dateRange),
            availableRegions: regions,
            dateRangeGifts,

            ...shoppingCartStore({
                cart: [],
                giftCard
            })(...args),
            ...houseReservationStore(...args),
            ...authStore(...args),
            ...drawerStore(...args),
            ...busyStore(...args),
        };
    }, {
        name: 'Friland Main Store'
    }));
}

export type TFrilandCheckoutStore =
    TShoppingCartStoreStoreSlice
    & TFrilandCheckoutStoreSlice;

export const createFrilandCheckoutStore = ({
                                               cart,
                                               step,
                                           }: {
    cart?: TCartItem[],
    step?: TStep
}) => {
    console.debug('⚙️ Fri.land Checkout Store Init');

    return create<TFrilandCheckoutStore>()(devtools((...args) => {
        return {
            ...shoppingCartStore({
                cart
            })(...args),
            ...checkoutStore(step)(...args),
        };
    }, {
        name: 'Friland Shopping Cart Store'
    }));
}
