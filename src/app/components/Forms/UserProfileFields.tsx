// @ts-nocheck
import React from "react";
import {Control} from "react-hook-form";
import {useTranslations} from "next-intl";

import {RhfTextField} from "@/app/components/Forms/TextField";

type FieldProps = {
    control: Control
}

// TODO: extract all common form fields here
export function Name({...props}: FieldProps) {
    const t_frm = useTranslations('Forms.generic');

    return (
        <RhfTextField
            name='name'
            control={control}
            rules={{required: true}}
            disabled={control._formState.isSubmitting}
            placeholder={t_frm('fields.name.label')}
            autoComplete='given-name'
        />
    )
}

export function Surname({control}: FieldProps) {
    const t_frm = useTranslations('Forms.generic');

    return (
        <RhfTextField
            name='surname'
            control={control}
            rules={{required: true}}
            disabled={control._formState.isSubmitting}
            placeholder={t_frm('fields.surname.label')}
            autoComplete='family-name'
        />
    )
}