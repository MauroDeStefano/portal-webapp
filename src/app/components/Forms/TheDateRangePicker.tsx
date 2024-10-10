import React, {createRef, useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import {useClickAway} from "react-use";
import classNames from "classnames";
import {addDays, compareAsc, compareDesc, isPast, isToday, subDays} from "date-fns";
import {de as deLocale, enGB as enLocale, it as itLocale} from "date-fns/locale";
import {useTranslations} from "next-intl";
import {useLocale} from "use-intl";

import {isDateEnabled} from "@/app/components/Forms/TheDateRangePicker/isDateEnabled";
import {SingleDayRenderer} from "@/app/components/Forms/TheDateRangePicker/SingleDayRenderer";
import {AvailabilityDate} from "@/types";

registerLocale('en', enLocale)
registerLocale('it', itLocale)
registerLocale('de', deLocale)

export type TDatePickerValue = {
    start?: Date | null;
    end?: Date | null;
}

type TTheDatePickerProps = {
    value?: TDatePickerValue | null;

    availableDates?: AvailabilityDate[];

    onChange?: (value: TDatePickerValue) => void;
    isValid?: boolean;
    isDisabled?: boolean;
    ranged?: boolean;
    children?: React.ReactNode;
    visibleMonths?: number;
    inline?: boolean;

    maxDate?: Date | null | undefined;
    minDate?: Date | null | undefined;
}

const availabilityDatesParse = (availableDates: AvailabilityDate[]) => {
    availableDates = availableDates.sort((a, b) => compareAsc(a.date, b.date))

    const disabledDates: Date[] = [];
    const disabledStartDates: Date[] = [];
    const disabledEndDates: Date[] = [];
    const noGiftCardDates: Date[] = [];
    availableDates.forEach((date) => {
        const _prev = subDays(date.date, 1);
        const prevDay = availableDates.find((d) => compareAsc(d.date, _prev) === 0);
        // date is no-vacancy && (date - 1 == vacancy || date - 1 == no-checkin || date -1 == no-checkout)  then date is checkout only
        // when current day is disabled but previous day is enabled, the current day can be used for check-out
        // why? : we also force that previous day cannot be a check-in day
        if (!date.vacancy && prevDay && (prevDay.vacancy || prevDay.no_check_in || prevDay.no_check_out)) {
            // disabledStartDates.push(prevDay.date);
            disabledStartDates.push(date.date);
            disabledDates.push(date.date);

            return;
        }

        if (!date.vacancy) {
            disabledDates.push(date.date);
        }

        if (date.no_check_in) {
            disabledStartDates.push(date.date);
        }

        if (date.no_check_out) {
            disabledEndDates.push(date.date);
        }

        if (date.no_gift_card) {
            noGiftCardDates.push(date.date);
        }
    });

    return {
        disabledDates,
        disabledStartDates,
        disabledEndDates,
        noGiftCardDates
    };
}


export function TheDatePicker({
                                  value,
                                  availableDates = [],
                                  onChange,
                                  isDisabled = false,
                                  children,
                                  ranged = true,
                                  visibleMonths = 2,
                                  inline = true,
                                  maxDate,
                                  minDate,

                                  ...props
                              }: TTheDatePickerProps & {
    onChange?: (value: Date | null) => void;
    value?: Date | null;
}) {
    const locale = useLocale();
    const [selectedDate, setDate] = useState<Date | null>(value ?? null)

    const {
        disabledDates
    } = availabilityDatesParse(availableDates);

    const SingleDayRenderer = (dayOfMonth: number, date?: Date) => {
        return <span
            className={classNames({
                'is-disabled': !!disabledDates.find((d) => date && compareDesc(date, d) === 0),
            })}
        >{dayOfMonth}</span>;
    };

    return <>
        <DatePicker
            className={'form__textfield form__textfield-input inline-block w-auto min-w-60'}
            dayClassName={(date) => {
                return isPast(date) && !isToday(date) ? 'is-past' : '';
            }}

            minDate={minDate ? subDays(minDate, 1) : undefined}
            maxDate={maxDate ? addDays(maxDate, 1) : undefined}

            locale={locale}

            showTimeSelect={true}
            timeIntervals={60}
            renderDayContents={SingleDayRenderer}
            dateFormat="MMMM d, yyyy h:mm aa"

            onChange={(date) => {
                setDate(date as Date);
                onChange?.(date as Date);
            }}

            disabled={isDisabled}
            selected={selectedDate}
            {...props}
        >{children}</DatePicker>
    </>;
}


export default function TheDateRangePicker({
                                               value,
                                               availableDates = [],
                                               onChange,
                                               isDisabled = false,
                                               children,
                                               ranged = true,
                                               visibleMonths = 2,
                                               inline = true,
                                               maxDate,
                                               minDate,
                                           }: TTheDatePickerProps) {

    const [prevValue, setPrevValue] = useState<TDatePickerValue | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startDate, setStartDate] = useState<TDatePickerValue['start'] | undefined>(value?.start);
    const [endDate, setEndDate] = useState<TDatePickerValue['end'] | undefined>(value?.end);
    const locale = useLocale();

    const containerRef = createRef<HTMLDivElement>();

    const t = useTranslations('Calendar');
    const {
        disabledDates,
        disabledStartDates,
        disabledEndDates,
        noGiftCardDates
    } = availabilityDatesParse(availableDates);

    const disabledTitles = {
        gift: t('gift_card_not_available'),
        disabled: t('date_not_available'),
        noStart: t('date_not_available_for_check_in'),
        noEnd: t('date_not_available_for_check_out'),
        noStartEnd: t('date_not_available_for_check_in_and_out'),
    }

    const restorePrevValue = () => {
        if (!isSelecting) {
            return;
        }
        setIsSelecting(false);
        setStartDate(prevValue?.start);
        setEndDate(prevValue?.end);
    }

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                restorePrevValue();
            }
        }

        document.addEventListener('keydown', closeOnEsc, true);

        return () => {
            document.removeEventListener('keydown', closeOnEsc);
        };
    });

    useClickAway(containerRef, () => restorePrevValue());

    return (
        <>
            <div
                ref={containerRef}
                className={`friland-datepicker-wrapper has-${visibleMonths}-months`}
            >
                {visibleMonths === 2 && <div className="friland-separator"></div>}

                <DatePicker
                    dayClassName={(date) => {
                        return isPast(date) && !isToday(date) ? 'is-past' : '';
                    }}

                    minDate={minDate}
                    maxDate={maxDate}

                    locale={locale}

                    renderDayContents={(dayOfMonth, date) => <SingleDayRenderer
                        dayOfMonth={dayOfMonth}
                        date={date}
                        disabledStartDates={disabledStartDates}
                        disabledEndDates={disabledEndDates}
                        noGiftCardDates={noGiftCardDates}
                        disabledDates={disabledDates}
                        disabledTitles={disabledTitles}
                        isSelecting={isSelecting}
                        startDate={startDate}
                        endDate={endDate}
                    />}

                    // excludeDates={disabledDates}

                    filterDate={(date) => isDateEnabled({
                        date,
                        isSelecting,
                        startDate,
                        endDate,
                        disabledDates,
                        disabledStartDates,
                        disabledEndDates,
                        noGiftCardDates
                    })}

                    onChange={(dates) => {
                        // @ts-ignore
                        const [start, end] = dates;

                        if (start) {
                            if (!!disabledStartDates.find((d) => start && compareDesc(start, d) === 0)) {
                                return;
                            }
                            setStartDate(start);
                        }

                        if (end && compareDesc(end, start) === 0) {
                            return;
                        }

                        if (end && !!disabledEndDates.find((d) => end && compareDesc(end, d) === 0)) {
                            return;
                        }

                        if (end) {
                            if (compareDesc(end, start) === -1) {
                                setEndDate(end);
                            } else {
                                console.log('end date is before start date, reverting.');
                                setStartDate(end);
                                setEndDate(start);
                            }
                        } else {
                            setEndDate(null);
                        }

                        setIsSelecting(!end);

                        if (start && end) {
                            setPrevValue({start, end});
                            onChange?.({start, end});
                        }
                    }}

                    disabled={isDisabled}
                    startDate={startDate}
                    endDate={endDate}

                    selectsRange={ranged}
                    monthsShown={visibleMonths}
                    inline={inline}

                    //@ts-ignore
                    swapRange={true}
                />
                {children}
            </div>
        </>
    );
}