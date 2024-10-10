import React, {useRef} from "react";
import {createPortal} from "react-dom";
import {useClickAway} from "react-use";
import classNames from "classnames";
import {useTranslations} from "next-intl";

import {
    CalendarPickerContextProvider,
    useCalendarPickerContext
} from "@/app/components/Forms/AvailabilityForm/CalendarPicker/CalendarPickerContext";
import {DatePicked} from "@/app/components/Forms/AvailabilityForm/CalendarPicker/DatePicked";
import {CalendarPickerProps} from "@/app/components/Forms/AvailabilityForm/types";
import TheDateRangePicker from "@/app/components/Forms/TheDateRangePicker";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {useDateFormatter} from "@/app/hooks/useDateFormatter";

import css from '../availability-form.module.css';


function RangeCalendarComponent() {
    const {
        value,
        availableDates,
        expanded, setExpanded,
        parentRef,
        onChange,
        fixedPosition,
        availabilityRange
    } = useCalendarPickerContext();

    const {
        availableValidDateRange,
        giftCard,
        setGiftCardEnabled,
        giftCardEnabled
    } = useFrilandContext((state) => state);

    const t = useTranslations('Calendar');


    const containerRef = React.useRef(null);

    useClickAway(containerRef, () => {
        setExpanded(false);
    });

    if (!expanded) {
        return null;
    }

    const rect = parentRef.current!.getBoundingClientRect();

    const parentPosition = {
        relative_bottom: window.innerHeight - rect.top,
        top: window.scrollY + rect.top + rect.height,
        left: window.scrollX + rect.left
    }

    return (
        <div
            ref={containerRef}
            className={classNames([
                css.popupWrapper,
                css.popupWrapperCalendar,
                fixedPosition ? css.popupWrapperFixed : '',
            ])}
            style={{
                '--popup-wrapper-left': `${parentPosition.left}px`,
                '--popup-wrapper-bottom': `${parentPosition.relative_bottom}px`,
                '--popup-wrapper-top': `${parentPosition.top}px`,
            }}>

            <div>
                <TheDateRangePicker
                    minDate={availabilityRange?.min || availableValidDateRange.start}
                    maxDate={availabilityRange?.max || availableValidDateRange.end}
                    availableDates={availableDates}
                    value={value}
                    onChange={(value => {
                        setExpanded(false);
                        onChange?.(value);
                    })}
                >
                    {
                        giftCard && <div className='italic mt-8 text-balance'>
                            {t.rich('gift_card_warning', {
                                enable: (chunk) => !giftCardEnabled ? chunk : null,
                                disable: (chunk) => giftCardEnabled ? chunk : null,

                                remove: (chunk) => <button type={'button'} className={'underline'}
                                                           onClick={() => setGiftCardEnabled(!giftCardEnabled)}>{chunk}</button>
                            })}
                        </div>
                    }
                </TheDateRangePicker>

            </div>
        </div>
    );
}

function CalendarPickerDisplayValue() {
    const {
        parentRef,
        isValid,
        expanded,
        isDisabled,
        openPopover,
        value,
        emptyValueLabel,
        label
    } = useCalendarPickerContext();

    const dateFormatter = useDateFormatter();
    const containerClassNames = classNames([
        !isDisabled && (isValid || expanded) ? css.groupWrapperSelected : '',
        isDisabled ? css.groupWrapperDisabled : '',
        css.groupWrapper
    ]);

    return (
        <>
            <div
                ref={parentRef}
                className={containerClassNames}
                onClick={openPopover}
            >
                <DatePicked
                    defaultValue={emptyValueLabel.start}
                    value={value?.start ? dateFormatter(value?.start) : undefined}
                    label={label.start}/>
            </div>

            <div
                className={containerClassNames}
                onClick={openPopover}
            >
                <DatePicked
                    defaultValue={emptyValueLabel.end}
                    value={value?.end ? dateFormatter(value?.end) : undefined}
                    label={label.end}/>
            </div>
        </>
    );
}

export default function CalendarDateRangePicker({
                                                    value,
                                                    ...etc
                                                }: CalendarPickerProps) {

    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <CalendarPickerContextProvider
                defaultValue={value}
                parentRef={parentRef}
                {...etc}
            >
                <CalendarPickerDisplayValue/>

                {typeof document !== 'undefined' &&
                    createPortal(<RangeCalendarComponent/>, document.body)}
            </CalendarPickerContextProvider>
        </>
    );
};

