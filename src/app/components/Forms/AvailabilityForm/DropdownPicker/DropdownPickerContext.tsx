'use client';

import React, {createContext, ReactNode, useContext, useState} from "react";

import {DropdownOption} from "@/app/components/Forms/AvailabilityForm/types";


type DropdownPickerContext = {
    expanded: boolean;
    setExpanded: (value: boolean) => void;

    value: DropdownOption | null;

    label: string;
    options: DropdownOption[];

    fixedPosition?: boolean;

    customCss?: string;
    defaultLabel: string;
    parentRef: React.RefObject<HTMLDivElement>;

    isValid?: boolean;
    isDisabled?: boolean;

    onChange?: (value: DropdownOption | null) => void;
}
const DropdownPickerContext = createContext<DropdownPickerContext | null>(null);

export const useDropdownPickerContext = () => {
    const ctx = useContext(DropdownPickerContext);

    if (!ctx) {
        throw new Error('useDropdownPickerContext must be used within a DropdownPickerContextProvider');
    }

    return ctx;
}

export function DropdownPickerContextProvider({
                                                  defaultValue = null,
                                                  fixedPosition = false,
                                                  isValid = true,
                                                  isDisabled = false,
                                                  defaultLabel : string,
                                                  children,
                                                  ...props
                                              }: {
    defaultLabel:string;
    defaultValue: number | string | DropdownOption | null;
    options: DropdownOption[];
    label: string;
    parentRef: React.RefObject<HTMLDivElement>;
    fixedPosition?: boolean;
    isValid?: boolean;
    isDisabled?: boolean;
    customCss?: string;
    onChange?: (value: DropdownOption | null) => void;

    children: ReactNode;
}) {
    const [expanded, setExpanded] = useState(false);

    const providerValue = {
        expanded, setExpanded,

        defaultValue,
        fixedPosition,
        isValid,
        isDisabled,
        defaultLabel:string,
        value: props.options.find(o => {
            if (typeof defaultValue === 'string' || typeof defaultValue === 'number') {
                return o.value === defaultValue;
            }

            return o.value === defaultValue?.value;
        }) || null,

        ...props,
    };

    return (
        <DropdownPickerContext.Provider value={providerValue}>
            {children}
        </DropdownPickerContext.Provider>
    );
}