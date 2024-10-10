import React from "react";
import classNames from "classnames";
import {compareDesc} from "date-fns";

export function SingleDayRenderer({
                                      dayOfMonth,
                                      date,
                                      disabledStartDates,
                                      disabledEndDates,
                                      noGiftCardDates,
                                      disabledDates,
                                      disabledTitles,
                                      isSelecting,
                                      startDate,
                                      endDate
                                  }: {
    dayOfMonth: number;
    date: Date | undefined;
    disabledStartDates: Date[];
    disabledEndDates: Date[];
    noGiftCardDates: Date[];
    disabledDates: Date[];
    disabledTitles: {
        gift: string;
        disabled: string;
        noStart: string;
        noEnd: string;
        noStartEnd: string;
    };
    isSelecting: boolean;
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
}) {
    const noStart = !!disabledStartDates.find((d) => date && compareDesc(date, d) === 0)
    const noEnd = !!disabledEndDates.find((d) => date && compareDesc(date, d) === 0);

    const noGiftCard = !!noGiftCardDates.find((d) => date && compareDesc(date, d) === 0);
    const isDisabled = !!disabledDates.find((d) => date && compareDesc(date, d) === 0);

    const isDisableWithCheckout = noEnd && noStart && isDisabled;

    const noStartEnd = noStart && noEnd;

    const cls = [];
    let title = '';

    if (isDisabled && !isDisableWithCheckout) {
        cls.push('is-disabled');
        title = disabledTitles.disabled;
    }

    if (!isSelecting) {
        if (noStartEnd) {
            cls.push('is-disabled-start-end');
            title = disabledTitles.noStartEnd;
        } else if (noStart) {
            cls.push('is-disabled-start');
            title = disabledTitles.noStart;
        }
    }

    if (noEnd && isSelecting) {
        if (startDate && date && compareDesc(date, startDate) !== 0) {
            cls.push('is-disabled-end');
            title = disabledTitles.noEnd;
        }
    }

    if (noGiftCard && !isDisabled) {
        cls.push('is-disabled-gift');
        title = disabledTitles.gift;
    }

    if (isSelecting) {
        cls.push('is-selecting');
    }

    return (
        <span title={title} className={classNames(cls)}>
            {dayOfMonth}
            {!!title && <span><span>{title}</span></span>}
        </span>
    );
}