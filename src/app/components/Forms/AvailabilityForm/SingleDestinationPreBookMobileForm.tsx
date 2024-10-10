import React from "react";
import {Controller} from "react-hook-form";
import {useTranslations} from "next-intl";

import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import availability_css from "@/app/components/Forms/AvailabilityForm/availability-form.module.css";
import {
    useSingleDestinationPreBookForm
} from "@/app/components/Forms/AvailabilityForm/hooks/useSingleDestinationPreBookForm";
import MobileDropdownList from "@/app/components/Forms/AvailabilityForm/MobileDropdownList";
import {SingleDestinationFormProps} from "@/app/components/Forms/AvailabilityForm/SingleDestinationPreBookForm";
import TheDateRangePicker from "@/app/components/Forms/TheDateRangePicker";
import {ArrowForwardIcon} from "@/app/components/Icons";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";
import ArrowForward from "@/assets/icons/arrow-forward.svg";
import SearchIcon from "@/assets/icons/search.svg";

function SingleDestinationPreBookMobileForm(props: SingleDestinationFormProps & {
    handleChange?: (value: any) => void
}) {
    const t = useTranslations('SingleLocationOrder');
    const currency = useCurrencyFormatter();
    const t_guests = useTranslations('guest_count');
    const personCount = [
        {label: t_guests('dropdown.1'), value: 1},
        {label: t_guests('dropdown.2'), value: 2},
        {label: t_guests('dropdown.3'), value: 3},
        {label: t_guests('dropdown.4'), value: 4}
    ];

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

    return <>
        <form
            onSubmit={handleSubmit}
            action=""
            className='flex flex-col gap-16 pb-32'
        >
            <input type="hidden" {...register('houseID')}/>

            <Controller
                name='dateRange'
                control={control}
                render={({field, fieldState}) => {
                    return <TheDateRangePicker
                        visibleMonths={1}
                        availableDates={availableDates}
                        minDate={availabilityRange.min}
                        maxDate={availabilityRange.max}
                        isDisabled={isSubmitting}
                        value={field.value}
                        onChange={field.onChange}
                    />
                }}/>

            <Controller
                name='guests'
                control={control}
                render={({field, fieldState}) => {
                    return <MobileDropdownList
                        items={personCount}
                        selectedItem={field.value}
                        onChange={field.onChange}
                    />;
                }}/>

            <div>
                <OneButtonToRuleThemAll
                    icon={isValid ? <ArrowForward/> : <SearchIcon/>}
                    className={availability_css.submitButton}
                    iconAlign={'right'}
                    type={isValid ? 'submit' : 'button'}
                    hoverEffect={isValid ? 'background' : 'scale'}
                    disabled={!isValid || isSubmitting}
                    isBusy={isSubmitting || checkingPrice}
                >{price?.totalPriceDiscounted ?
                    <>
                        <small>{t('day_count_summary', {night_count: price.days.length})}</small>
                        <br/>
                        <span>{currency(price.totalPriceDiscounted)}</span>
                    </>
                    : t('book_now')
                }</OneButtonToRuleThemAll>
            </div>
        </form>
    </>;
}

export default function SingleDestinationPreBookMobile(props: SingleDestinationFormProps) {
    const currency = useCurrencyFormatter();
    const t = useTranslations('SingleLocationOrder');
    const {
        addDrawer,
    } = useFrilandContext((state) => state);

    return (
        <>
            <div className="destination-mobile-nav__container fl-container md:hidden"
                 onClick={() => addDrawer({
                     title: '',
                     className: 'drawer-extra-wide',
                     children: <SingleDestinationPreBookMobileForm {...props} />
                 })}>
                <div className="destination-mobile-nav__wrapper">
                    <div className="destination-mobile-nav__dates-wrapper">
                        <div className="destination-mobile-nav__date-button" role="button">
                            {t('pick_date_cta')}
                        </div>
                    </div>

                    <div className="destination-mobile-nav__nav-book">
                        <OneButtonToRuleThemAll
                            background={'icon'}
                            icon={<ArrowForwardIcon/>}
                            type={'button'}
                        ></OneButtonToRuleThemAll>
                    </div>
                </div>
            </div>
        </>
    );
}