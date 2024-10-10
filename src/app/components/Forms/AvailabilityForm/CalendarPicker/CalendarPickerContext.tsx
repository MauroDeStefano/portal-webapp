'use client';

import React, {createContext, ReactNode, useContext, useState} from "react";

import {TDatePickerValue} from "@/app/components/Forms/TheDateRangePicker";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {AvailabilityDate} from "@/types";

export type TAvailabilityRange = {
    min: null | Date;
    max: null | Date;
}

type CalendarPickerContext = {
    expanded: boolean;
    setExpanded: (value: boolean) => void;
    openPopover: () => void;

    value: TDatePickerValue | null;

    availableDates: AvailabilityDate[];
    availabilityRange: TAvailabilityRange,

    fixedPosition?: boolean;
    parentRef: React.RefObject<HTMLDivElement>;

    isValid?: boolean;
    isDisabled?: boolean;


    label: {
        start: string;
        end: string;
    };
    emptyValueLabel: {
        start: string;
        end: string;
    };

    onChange: (value: null | TDatePickerValue) => void;
}
const CalendarPickerContext = createContext<CalendarPickerContext | null>(null);

export const useCalendarPickerContext = () => {
    const ctx = useContext(CalendarPickerContext);

    if (!ctx) {
        throw new Error('useCalendarPickerContext must be used within a CalendarPickerContextProvider');
    }

    return ctx;
}

export function CalendarPickerContextProvider({
                                                  defaultValue,
                                                  children,
                                                  ...props
                                              }: {
    availableDates: AvailabilityDate[],
    availabilityRange: TAvailabilityRange,
    defaultValue: null | TDatePickerValue,
    parentRef: React.RefObject<HTMLDivElement>,

    label: {
        start: string;
        end: string;
    };
    emptyValueLabel: {
        start: string;
        end: string;
    };

    isDisabled?: boolean,
    isValid?: boolean,
    onChange: (value: null | TDatePickerValue) => void;

    children: ReactNode,
}) {
    const [expanded, setExpanded] = useState(false);
    const {
        availableValidDateRange
    } = useFrilandContext((state) => state);

    const openPopover = () => {
        if (!availableValidDateRange?.start || props.isDisabled) {
            return;
        }

        setExpanded(!expanded);
    }

    const providerValue = {
        openPopover,
        expanded, setExpanded,
        value: defaultValue,
        ...props,
    };

    return (
        <CalendarPickerContext.Provider value={providerValue}>
            {children}
        </CalendarPickerContext.Provider>
    );
}