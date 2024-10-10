import React from "react";

import css from "../availability-form.module.css";

export function DatePicked({
                               label,
                               value,
                               defaultValue,
                               isValid,
                               expanded,
                               isDisabled,

                               ...etc
                           }: {
    label: string,
    value: string | undefined,
    defaultValue?: string,
    isValid?: boolean,
    expanded?: boolean,
    isDisabled?: boolean,
}) {

    return (
        <label className={css.labelWrapper}>
            <div className={css.pseudoLabel}>{label}</div>
            <div className={css.labelValue}>{value || defaultValue}</div>
        </label>
    );
}