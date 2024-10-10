import {parseAbsoluteToLocal} from "@internationalized/date";
import {formatISO, parseISO} from "date-fns";

import {DatePickerValue} from "@/app/components/Forms/AvailabilityForm/types";
import {TDatePickerValue} from "@/app/components/Forms/TheDateRangePicker";
import {TDateRangeString} from "@/types";


export function normalizeDateRange(
    range: TDateRangeString | TDatePickerValue,
    minimumToday = true
): TDatePickerValue {
    const _today = new Date();
    const startDate = maybeConvertStringDateToACalendarDate(range.start);

    return {
        start: !minimumToday || startDate && startDate > _today ? startDate : _today,
        end: maybeConvertStringDateToACalendarDate(range.end),
    };
}

export const maybeConvertStringDateToACalendarDate = (date?: string | null | Date): null | Date => {
    if (!date) {
        return null
    }

    if (typeof date === 'string') {
        try {
            return parseAbsoluteToLocal(date).toDate();
        } catch (e) {
            return parseISO(date)
        }
    }


    return date;
}

export const maybeConvertDateToString = (date?: string | null | Date): null | string => {
    date = maybeConvertStringDateToACalendarDate(date);

    if (!date) {
        return null
    }

    return formatISO(date);
}

export const maybeConvertDateToStringNoTime = (date?: string | null | Date): null | string => {
    date = maybeConvertStringDateToACalendarDate(date);

    if (!date) {
        return null
    }

    return formatISO(date, {representation: 'date'});
}

export const convertDateRangeToStringRange = (dateRange: DatePickerValue) => {
    if (!dateRange.start || !dateRange.end) {
        return null;
    }

    return {
        start: formatISO(dateRange.start),
        end: formatISO(dateRange.start),
    };
}


export const getDateRangeFromUrlParams = (params: any): null | TDateRangeString => {
    return params?.slug?.[1] && params?.slug?.[2] ? {
        start: params?.slug[1],
        end: params?.slug[2]
    } : null;
};