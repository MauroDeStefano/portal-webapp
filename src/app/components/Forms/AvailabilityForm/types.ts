import {AvailabilityDate} from "@/types";


export type CustomFormField = {
    isValid?: boolean;
    isDisabled?: boolean;
    fixedPosition?: boolean;
}

export type DropdownOption<T = string | number | null> = {
    label: string;
    value: T;
    disabled?: boolean;
}

export type DropdownPickerProps = CustomFormField & {
    label: string;
    value: null | number | string | DropdownOption;
    defaultLabel:string,
    options: DropdownOption[];
    onChange?: (value: null | DropdownOption) => void;
    customCss?: string;
}

export type DatePickerValue = {
    start?: Date | null;
    end?: Date | null;
}

export type CalendarPickerProps = CustomFormField & {
    label: {
        start: string;
        end: string;
    };
    emptyValueLabel: {
        start: string;
        end: string;
    };

    value: null | DatePickerValue;

    availableDates: AvailabilityDate[];
    availabilityRange: {
        min: null | Date;
        max: null | Date;
    }
    onChange: (value: null | DatePickerValue) => void;
}

