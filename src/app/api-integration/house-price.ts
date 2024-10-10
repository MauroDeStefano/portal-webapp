import {formatISO} from "date-fns";

import {jsonCall} from "@/app/api-integration/api-call";
import {useApiAuthCall} from "@/app/api-integration/hooks/useApiAuthCall";
import {useApiErrorHandler} from "@/app/api-integration/hooks/useApiErrorHandler";
import {
    houseBookingData,
    housePriceInDateRange,
    THousePriceInDateRange
} from "@/app/api-integration/normalizer/housePriceInDateRange";
import {DatePickerValue} from "@/app/components/Forms/AvailabilityForm/types";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {convertDateRangeToStringRange} from "@/app/utils/calendarDates";
import {Endpoints} from "@/endpoints";
import {TCartItem, THouseCartItem} from "@/types";


export function useGetHousePriceInDateRange(): (houseID: number, dateRange: DatePickerValue, has_pet?: boolean) => Promise<THousePriceInDateRange> {
    const isLoggedIn = useFrilandContext((state) => state.isLoggedIn);
    const authApi = useApiErrorHandler(useApiAuthCall(jsonCall));

    let api = useApiErrorHandler(jsonCall);

    if (isLoggedIn) {
        api = authApi
    }

    return async (houseID, dateRange, has_pet = false) => {
        if (!dateRange.start || !dateRange.end) {
            return Promise.reject('Date range is not set');
        }

        console.debug('Get house price for selected interval: ', houseID, convertDateRangeToStringRange(dateRange));

        const response = await api.get(
            Endpoints.booking.price(
                houseID,
                formatISO(dateRange.start),
                formatISO(dateRange.end),
                has_pet)
        );

        return housePriceInDateRange({
            ...response.data,
            houseID
        });
    }
}


export function useGetHousePrice() {
    const isLoggedIn = useFrilandContext((state) => state.isLoggedIn);
    const authApi = useApiErrorHandler(useApiAuthCall(jsonCall));

    let api = useApiErrorHandler(jsonCall);

    if (isLoggedIn) {
        api = authApi
    }

    return async (cart: TCartItem & THouseCartItem) => {
        const response = await api.get(
            Endpoints.booking.price(
                cart.product_id,
                formatISO(cart.dateRange.start),
                formatISO(cart.dateRange.end),
                !!cart.hasPet
            )
        );

        return houseBookingData(response.data);
    }
}