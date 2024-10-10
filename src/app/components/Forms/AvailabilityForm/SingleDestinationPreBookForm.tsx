'use client';

import React, {useEffect, useState} from "react";
import {Controller} from "react-hook-form";
import classNames from "classnames";
import {useTranslations} from "next-intl";

import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import CalendarDateRangePicker from "@/app/components/Forms/AvailabilityForm/CalendarPicker/CalendarDateRangePicker";
import DropdownPicker from "@/app/components/Forms/AvailabilityForm/DropdownPicker/DropdownPicker";
import {
    useSingleDestinationPreBookForm
} from "@/app/components/Forms/AvailabilityForm/hooks/useSingleDestinationPreBookForm";
import SingleDestinationPreBookMobile from "@/app/components/Forms/AvailabilityForm/SingleDestinationPreBookMobileForm";
import {DropdownOption} from "@/app/components/Forms/AvailabilityForm/types";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";
import ArrowForward from '@/assets/icons/arrow-forward.svg';
import SearchIcon from "@/assets/icons/search.svg";
import {AvailabilityDate} from "@/types";

import availability_css from './availability-form.module.css';
import css from './destination-form.module.css';
import {TGenericEventObject, useTrackAddToCart, useTrackViewContent} from "@/app/utils/tracking";
import {usePathname} from "next/navigation";

export type SingleDestinationFormProps = {
    houseID: number;
    house_name: string;
    availableDates: AvailabilityDate[];
    availabilityRange: {
        min: string;
        max: string;
    }
    pet_allowed: boolean;
}

function GuestCount({value, onChange, disabled}: {
    value: DropdownOption | null,
    onChange: (value: DropdownOption | null) => void,
    disabled: boolean,
}) {
    const t = useTranslations('guest_count');

    const personCount = [
        {label: t('dropdown.1'), value: 1},
        {label: t('dropdown.2'), value: 2},
        {label: t('dropdown.3'), value: 3},
        {label: t('dropdown.4'), value: 4}
    ];

    return <DropdownPicker
        options={personCount}
        label={t('guests')}
        defaultLabel={t('guests_default')}
        value={value}
        fixedPosition={true}
        isDisabled={disabled}
        customCss='!min-w-[30ch]'
        onChange={onChange}
    />
}

export default function SingleDestinationPreBookForm(props: SingleDestinationFormProps & {}) {
    const currency = useCurrencyFormatter();
    const t = useTranslations('SingleLocationOrder');
    const track = useTrackViewContent();

    const {
        handleSubmit,
        register,
        control,
        isSubmitting,
        isValid,
        availableDates,
        checkingPrice,
        price,
        availabilityRange,
    } = useSingleDestinationPreBookForm(props);



    return (
        <>
            <SingleDestinationPreBookMobile {...props} />
            <form onSubmit={handleSubmit}>
                <div className={classNames([
                    css.desktopNavWrapper,
                    isValid ? 'valid' : '',
                    availability_css.form,
                    'max-md:hidden'
                ])}>
                    <div>
                        <input type="hidden" {...register('houseID')}/>
                        <Controller
                            name='dateRange'
                            control={control}
                            render={({field, fieldState}) => {
                                return <CalendarDateRangePicker
                                    fixedPosition={true}
                                    availableDates={availableDates}
                                    isDisabled={isSubmitting}
                                    availabilityRange={availabilityRange}
                                    emptyValueLabel={{
                                        start: t('pick_date_cta'),
                                        end: t('pick_date_cta'),
                                    }}
                                    label={{
                                        start: t('date_picker_start'),
                                        end: t('date_picker_end'),
                                    }}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            }}/>

                        <Controller
                            name='guests'
                            control={control}
                            render={({field, fieldState}) => {
                                return <GuestCount
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    disabled={isSubmitting}
                                />
                            }}/>

                        <div className={availability_css.submitWrapper}>
                            <OneButtonToRuleThemAll
                                icon={isValid ? <ArrowForward/> : <SearchIcon/>}
                                className={availability_css.submitButton}
                                iconAlign={'right'}
                                type={isValid ? 'submit' : 'button'}
                                hoverEffect={isValid ? 'background' : 'scale'}
                                disabled={!isValid || isSubmitting}
                                isBusy={isSubmitting || checkingPrice}
                            >{price?.totalPriceDiscounted &&
                                <>
                                    <small>{t('day_count_summary', {night_count: price.days.length})}</small>
                                    <br/>
                                    <span>{currency(price.totalPriceDiscounted)}</span>
                                </>
                            }</OneButtonToRuleThemAll>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
