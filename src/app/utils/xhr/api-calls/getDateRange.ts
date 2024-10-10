import {maybeConvertDateToString} from "@/app/utils/calendarDates";
import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TDateRangeString} from "@/types";

export const getDateRange = async (): Promise<TDateRangeString> => {
    const dateRange = await _get(Endpoints.date_range);

    return {
        start: dateRange.open,
        end: dateRange.close,
    };
}

export const getDateRangeWithGiftCard = async (until: Date | string, cardID?: number | string) => {
    if (!cardID) {
        return [];
    }

    const dateRange = await _get(Endpoints.gift_card_availability(
            maybeConvertDateToString(new Date) as string,
            maybeConvertDateToString(until) as string,
            cardID,
        ),
        'GET',
        {},
        {},
        'no-store');

    return dateRange?.days ?? []
};