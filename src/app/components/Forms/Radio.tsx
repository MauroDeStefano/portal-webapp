import {ComponentProps} from "react";
import {Controller} from "react-hook-form";

import {RfhFormFieldErrorMessage} from "@/app/components/Forms/FormError";

interface Props extends ComponentProps<'input'> {
    children?: React.ReactNode
}

export function RadioWrapper({field, label}: {
    field: React.ReactNode,
    label: React.ReactNode
}) {
    return (
        <label className="form__radio-wrapper">
            {field}

            <div className="form__radio-icon">
                <div className="form__radio-icon-inner"></div>
            </div>

            <div className="form__radio-label">
                {label}
            </div>
        </label>
    );
}

export default function Radio({children, ...props}: Props) {
    return <RadioWrapper
        field={<input className="form__radio-input" type="radio"{...props}/>}
        label={children}
    />
}

export function RadioRfh({
                             name,
                             control,
                             rules = {},
                             options,
                             ...props
                         }: {
    name: string,
    control: any,
    rules?: Record<string, any>,
    options: {
        value: string,
        label: string | React.ReactNode,
    }[]
}) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field: {value: groupValue, ...etc}, fieldState}) => {
                return (
                    <>
                        {
                            options.map(({label, value}) => {
                                return (
                                    <RadioWrapper
                                        key={value}
                                        field={<input
                                            className="form__radio-input"
                                            type="radio"
                                            value={value}
                                            checked={groupValue === value}
                                            {...etc}
                                        />}
                                        label={label}
                                    />
                                )
                            })
                        }

                        <RfhFormFieldErrorMessage {...fieldState}/>
                    </>
                )
            }}
        />
    );
}