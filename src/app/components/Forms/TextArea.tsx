import {ComponentProps} from "react";
import {Controller} from "react-hook-form";
import classNames from "classnames";

import {RfhFormFieldErrorMessage} from "@/app/components/Forms/FormError";

interface Props extends ComponentProps<'textarea'> {
    error?: boolean
    required?: boolean,
}

function TextAreaWrapper({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="form__textarea-wrapper">
            {children}
        </div>
    );
}

function getClassNames(hasErrors = false): string {
    return classNames({
        "form__textarea-input": true,
        'form__textarea-input--error': hasErrors
    });
}

export default function TextArea({
                                     required = false,
                                     ...props
                                 }: Props) {

    if (props.placeholder && required) {
        props.placeholder += ' *';
    }

    return (
        <TextAreaWrapper>
            <textarea className={getClassNames(props.error)} {...props} />
        </TextAreaWrapper>
    )
}


export function RhfTextArea({
                                name,
                                control,
                                rules = {},
                                autoResize = false,
                                conditional = true,
                                ...etc
                            }: Props & {
    name: string,
    control: any,
    autoResize?: boolean,
    rules?: Record<string, any>,
    conditional?: boolean,
}) {
    if (etc?.required) {
        rules.required = true;
    }

    if (rules.required && etc.placeholder) {
        etc.placeholder += ' *';
    }


    const maybeResize = (textAreaRef: HTMLTextAreaElement | null, value: string) => {
        if (!textAreaRef) {
            return;
        }

        textAreaRef.style.height = "auto";
        const scrollHeight = textAreaRef.scrollHeight;

        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        textAreaRef.style.height = scrollHeight + "px";
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
                    <TextAreaWrapper>
                        <textarea
                            className={getClassNames(fieldState.invalid)}
                            {...etc}
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                if (autoResize) maybeResize(e.target, field.value);
                            }}
                        />
                        <RfhFormFieldErrorMessage {...fieldState}/>
                    </TextAreaWrapper>
                )
            }}
        />
    )
}