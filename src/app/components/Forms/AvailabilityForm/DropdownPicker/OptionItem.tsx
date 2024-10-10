import React from "react";
import classNames from "classnames";

import css from "@/app/components/Forms/AvailabilityForm/availability-form.module.css";
import {useDropdownPickerContext} from "@/app/components/Forms/AvailabilityForm/DropdownPicker/DropdownPickerContext";
import {DropdownOption} from "@/app/components/Forms/AvailabilityForm/types";

interface OptionItemProps {
    option: DropdownOption;
}

export default function OptionItem({option}: OptionItemProps) {
    const {
        onChange,
        value,
        setExpanded,
    } = useDropdownPickerContext();

    return (
        <div
            role="option"
            className={classNames([
                css.dropdownItem,
                value?.value === option.value ? css.dropdownItemSelected : '',
            ])}
            onClick={() => {
                if (option?.disabled) {
                    return;
                }
                onChange?.(option);
                setExpanded(false);
            }}
            aria-disabled={option?.disabled || false}
        >
            {option.label}
        </div>
    );
};