import React from "react";
import classNames from "classnames";
import { useTranslations } from 'next-intl';
import css from "@/app/components/Forms/AvailabilityForm/availability-form.module.css";
import {useDropdownPickerContext} from "@/app/components/Forms/AvailabilityForm/DropdownPicker/DropdownPickerContext";

export default function OptionPicked() {
    const {
        value,
        expanded,
        customCss,
        setExpanded,
        label,
        defaultLabel,
        isValid,
        parentRef,
    } = useDropdownPickerContext();
    console.log('OptionPicked received label:', label);
    const t = useTranslations('SearchForm');
    return (
        <>
            <div
                ref={parentRef}
                className={classNames([
                    expanded ? css.groupWrapperSelected : '',
                    css.groupWrapper,
                    customCss ? customCss : '!min-w-[20ch]',
                    !isValid ? css.invalid : '',
                    value ? css.groupWrapperShadow : ''
                ])}
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                <label className={css.labelWrapper}>
                    <div className={css.pseudoLabel}>{label}</div>

                    <div className={css.labelValue}>
                        {value?.label || defaultLabel}
                    </div>
                </label>
            </div>
        </>
    );
};