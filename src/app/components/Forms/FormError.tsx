import React from "react";
import {ControllerFieldState} from "react-hook-form";
import classNames from "classnames";

export default function FormErrorMessage({children}: {
    children: React.ReactNode | string
}) {
    return (
        <div className="">
            {children}
        </div>
    );
};


export function RfhFormFieldErrorMessage(fieldState: ControllerFieldState) {
    if (!fieldState.error) return null;

    return (
        <div className='text-sm italic text-red-800 p-2'>
            {fieldState.error.message}
        </div>
    );
}

export function RfhFormError({errors, size = 'small', width = 'full', spacing = 'm-4', icon, onClick}: {
    errors?: string | null;
    size?: 'small' | 'medium' | 'large';
    width?: 'full' | 'half';
    spacing?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}) {
    if (!errors) return null;

    const cls = classNames([
        'italic p-4 border border-solid border-b-red-800 rounded-2xl bg-red-100 [&>svg]:w-8 [&>svg]:h-8 flex gap-4 align-center',
        spacing,
        {
            'text-base': size === 'small',
            'text-xl': size === 'medium',
            'text-2xl': size === 'large',
            'w-1/2': width === 'half',
            'cursor-pointer': !!onClick
        }
    ])

    return <div
        onClick={() => onClick?.()}
        className={cls}>
        {icon}
        {errors}
    </div>
}


export function RfhFormSuccess({message, ...props}: {
    message?: string | null
} & React.HTMLAttributes<HTMLDivElement>) {
    if (!message) return null;

    return <div
        className="my-4 italic text-base p-4 border border-solid border-b-green-800 rounded-2xl bg-green-100"
        {...props}>
        {message}
    </div>
}