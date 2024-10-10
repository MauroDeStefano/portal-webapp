import React, {ComponentProps} from "react";
import {Controller} from "react-hook-form";
import classNames from "classnames";

import {RfhFormFieldErrorMessage} from "@/app/components/Forms/FormError";
import {CheckMarkIcon} from "@/app/components/Icons";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface Props extends ComponentProps<'input'> {
    children?: React.ReactNode
    error?: boolean
    required?: boolean,
    isBusy?: boolean
}


function CheckboxWrapper({field, label, isBusy, required}: {
    field: React.ReactNode,
    label: React.ReactNode,
    isBusy: boolean,
    required: boolean
}) {
    return (
        <label className={classNames({
            'form__checkbox-wrapper cursor-pointer': true,
            'form__checkbox-wrapper--busy': isBusy,
        })}>
            {field}

            <div className="form__checkbox-icon" style={{'--spinner-color': '#000'}}>
                {
                    isBusy ?
                        <LoadingSpinner/> :
                        <CheckMarkIcon/>
                }
            </div>

            <div className="form__checkbox-label">
                {required ? '*' : ''}
                {label}
            </div>
        </label>
    );
}

export default function Checkbox({
                                     children,
                                     required = false,
                                     isBusy = false,
                                     ...props
                                 }: Props) {
    return (
        <CheckboxWrapper
            field={<input className="form__checkbox-input" type="checkbox"{...props}/>}
            isBusy={isBusy}
            label={children}
            required={required}
        />
    )
}


export function RhfCheckbox({
                                name,
                                control,
                                rules = {},

                                children,
                                isBusy = false,
                                returnAsString = true,
                                ...etc
                            }: Props & {
    name: string,
    control: any,
    returnAsString?: boolean,
    rules?: Record<string, any>,
}) {

    if (etc?.required) {
        rules.required = true;
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}

            render={({field, fieldState}) => {
                return (
                    <>
                        <CheckboxWrapper
                            field={<input
                                className="form__checkbox-input"
                                type="checkbox"
                                {...field} {...etc}
                                onChange={(e) => {
                                    const checked = e.target.checked && etc.value ? etc.value : e.target.checked;
                                    field.onChange(returnAsString ? checked.toString() : checked);
                                }}
                            />}
                            isBusy={isBusy}
                            label={children}
                            required={etc?.required || false}
                        />
                        <RfhFormFieldErrorMessage {...fieldState}/>
                    </>
                )
            }}
        />
    )
}