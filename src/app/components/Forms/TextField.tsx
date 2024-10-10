import {ComponentProps} from "react";
import {Controller} from "react-hook-form";
import classNames from "classnames";

import {RfhFormFieldErrorMessage} from "@/app/components/Forms/FormError";

interface Props extends ComponentProps<'input'> {
    error?: boolean
    type?: string | '',
    required?: boolean,
}

function TextFieldWrapper({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="form__textfield-wrapper">
            {children}
        </div>
    );
}

function getClassNames(hasErrors = false) {
    return classNames({
        'form__textfield-input': true,
        'form__textfield-input--error': hasErrors
    });
}

export default function TextField({
                                      type = 'text',
                                      required = false,
                                      ...props
                                  }: Props) {

    if (props.placeholder && required) {
        props.placeholder += ' *';
    }

    return (
        <TextFieldWrapper>
            <input className={getClassNames(props.error)} {...props} type={type}/>
        </TextFieldWrapper>
    )
}

export function RhfTextField({
                                 name,
                                 control,
                                 rules = {},
                                 type = 'text',
                                 conditional = true,
                                 ...etc
                             }: Props & {
    name: string,
    control: any,
    rules?: Record<string, any>,
    conditional?: boolean,
}) {
    if (etc?.required) {
        rules.required = true;
    }

    if (rules.required && etc.placeholder) {
        etc.placeholder += ' *';
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}

            render={({field, fieldState}) => {
                if (!conditional) {
                    return <></>;
                }

                return (
                    <TextFieldWrapper>
                        <input
                            className={getClassNames(fieldState.invalid)} {...etc} {...field} type={type}/>
                        <RfhFormFieldErrorMessage {...fieldState}/>
                    </TextFieldWrapper>
                )
            }}
        />
    )
}