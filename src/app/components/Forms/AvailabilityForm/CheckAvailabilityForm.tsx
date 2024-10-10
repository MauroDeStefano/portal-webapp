'use client'

import React, {useEffect, useRef} from "react";
import {useSearchParam} from "react-use";
import {useRouter} from "@i18n/config";
import {SearchIcon} from "@storybook/icons";
import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";

import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import CalendarDateRangePicker from "@/app/components/Forms/AvailabilityForm/CalendarPicker/CalendarDateRangePicker";
import DropdownPicker from "@/app/components/Forms/AvailabilityForm/DropdownPicker/DropdownPicker";
import {useCheckAvailabilityForm} from "@/app/components/Forms/AvailabilityForm/hooks/useCheckAvailabilityForm";
import LoadingSpinner from "@/app/components/LoadingSpinner";

import css from './availability-form.module.css';

export default function CheckAvailabilityForm({redirect = false}: {
    redirect?: boolean
}) {
    const t = useTranslations('SearchForm');
    const searchResult = useSearchParam('searchResult');
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();
    const params = useParams();

    const {
        availableRegions,
        setRegion,
        setDateRange,
        formState,
        isSubmitting,
        canSubmit,
        handleSubmit,
        availableDates,
    } = useCheckAvailabilityForm();

    useEffect(() => {
        if (formState.dateRange !== null) {
            formRef.current?.scrollIntoView({block: "start", inline: "nearest"});
        }
    }, [formState.dateRange]);

    return (
        <form
            ref={formRef}
            style={{paddingTop: '2rem'}}
            className='flex justify-center'
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <div className={css.form}>
                <div className={css.formInner}>
                    <DropdownPicker
                        options={availableRegions}
                        label={t('where')}
                        defaultLabel={t('region')}                 
                        onChange={setRegion}
                        value={formState.region}
                    />

                    <CalendarDateRangePicker
                        availabilityRange={{min: null, max: null}}
                        availableDates={availableDates}
                        emptyValueLabel={{
                            start: t('pick_date_cta'),
                            end: t('pick_date_cta'),
                        }}
                        label={{
                            start: t('date_picker_start'),
                            end: t('date_picker_end'),
                        }}
                        value={formState.dateRange}
                        isDisabled={!formState.region}
                        isValid={true}
                        onChange={setDateRange}
                    />
                </div>

                <div className={css.submitWrapper}>
                    <OneButtonToRuleThemAll
                        icon={isSubmitting ? <LoadingSpinner/> : <SearchIcon/>}
                        className={css.submitButton}
                        iconAlign={'right'}
                        type='submit'
                        disabled={!canSubmit || isSubmitting}
                    />
                </div>
            </div>
        </form>
    );
}