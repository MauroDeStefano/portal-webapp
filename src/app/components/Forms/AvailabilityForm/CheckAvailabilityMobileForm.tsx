'use client';

import React, {useRef} from "react";
import {useWindowScroll} from "react-use";
import {usePathname} from "@i18n/config";
import classNames from "classnames";
import {useTranslations} from "next-intl";

import ButtonLabelIcon from "@/app/components/buttons/ButtonLabelIcon";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import css from "@/app/components/Forms/AvailabilityForm/availability-form.module.css";
import {useCheckAvailabilityForm} from "@/app/components/Forms/AvailabilityForm/hooks/useCheckAvailabilityForm";
import MobileDropdownList from "@/app/components/Forms/AvailabilityForm/MobileDropdownList";
import TheDateRangePicker from "@/app/components/Forms/TheDateRangePicker";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useDateFormatter} from "@/app/hooks/useDateFormatter";
import {ROUTES_WITHOUT_HEADER_SEARCH, ROUTES_WITHOUT_HERO} from "@/app/layout/config";
import SearchIcon from "@/assets/icons/search.svg";


export default function CheckAvailabilityMobileFormButton() {
    const pathname = usePathname();
    const hasSearch = !ROUTES_WITHOUT_HEADER_SEARCH.includes(pathname);
    const hasHero = !ROUTES_WITHOUT_HERO.includes(pathname) || pathname === '/';

    const {
        addDrawer,
    } = useFrilandContext((state) => state);

    const t = useTranslations('SearchForm');
    const ref = useRef<HTMLDivElement>(null);
    const {y} = useWindowScroll();

    const top_scroll_when_sticky = 40;

    const cls = classNames({
        'lg:hidden': true,
        [css.mobileSearchTrigger]: true,
        [css.mobileHasHero]: hasHero,
        [css.isStuck]: y > top_scroll_when_sticky,
    })

    let style: Record<string, string> = {};

    if (['/companies-services', '/contact', '/partners'].includes(pathname)) {
        style['--mobile-search-top-offset'] = '240px'
    }

    if (['/destinations/[...slug]'].includes(pathname) || ['/destinations'].includes(pathname)) {
        style['--mobile-search-top-offset'] = '310px'
    }


    if (['/regions/[...slug]'].includes(pathname)) {
        style['--mobile-search-top-offset'] = '450px'
    }

    if (['/about'].includes(pathname)) {
        style['--mobile-search-top-offset'] = '350px'
    }

    if (['/blog'].includes(pathname)) {
        style['--mobile-search-top-offset'] = '550px'
    }


    if (!hasSearch) {
        return null;
    }

    return <div className={cls} style={style}>
        <div className="" ref={ref}>
            <ButtonLabelIcon
                onClick={() => addDrawer({
                    title: '',
                    className: 'drawer-extra-wide',
                    children: <CheckAvailabilityMobileForm/>
                })}
                decoration="border"
                icon={<SearchIcon/>}>{t('search_cta')}
            </ButtonLabelIcon>
        </div>
    </div>;
}


function CheckAvailabilityMobileForm() {
    const t = useTranslations('SearchForm');
    const t_btn = useTranslations('Forms.buttons');
    const dateFormatter = useDateFormatter();

    const {
        availableRegions,
        setRegion,
        setDateRange,
        formState,
        isSubmitting,
        canSubmit,
        handleSubmit,
        availableDates
    } = useCheckAvailabilityForm();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit()
            }}
            className='flex flex-col gap-16 pb-32'
        >
            <div>
                <h3>{t('region')}</h3>
                <MobileDropdownList
                    items={availableRegions}
                    selectedItem={formState.region}
                    onChange={setRegion}/>
            </div>

            <div>
                <h3 className={`${css.mobileDateRangeHeader} mb-8 py-8 font-medium`}>
                    {!formState.dateRange?.start ? <>
                        {t('date_picker_cta_short')}
                    </> : <>
                        {t.rich('date_picker_short', {
                            start: dateFormatter(formState.dateRange?.start),
                            end: dateFormatter(formState.dateRange?.end)
                        })}
                    </>}
                </h3>

                <TheDateRangePicker
                    visibleMonths={1}
                    value={formState.dateRange}
                    onChange={setDateRange}
                    availableDates={availableDates}
                />
            </div>

            <div>
                <OneButtonToRuleThemAll
                    icon={isSubmitting ? <LoadingSpinner/> : <SearchIcon/>}
                    className={css.submitButton}
                    background={'icon'}

                    iconAlign={'left'}
                    type='submit'
                    disabled={!canSubmit || isSubmitting}
                >{isSubmitting ? t_btn('searching') : t_btn('search')}</OneButtonToRuleThemAll>
            </div>
        </form>
    )
}