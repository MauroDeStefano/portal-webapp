import {addDays, compareDesc, isBefore, subDays} from "date-fns";

export const isDateEnabled = ({
                                  isSelecting,
                                  startDate,
                                  endDate,
                                  disabledDates,
                                  disabledStartDates,
                                  disabledEndDates,
                                  noGiftCardDates,
                                  date: theDate
                              }: {
    isSelecting: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    disabledDates: Date[];
    disabledStartDates: Date[];
    disabledEndDates: Date[];
    noGiftCardDates: Date[];
    date: Date;
}): boolean => {
    let isEnabled = true;
    let offsetToCompare = 0;

    const isDisabledStartByRule = disabledStartDates.find(d => compareDesc(theDate, d) === 0);
    const isDisabledByRule = disabledDates.find(d => compareDesc(theDate, d) === 0);


    if (isDisabledByRule) {
        if (compareDesc(theDate, isDisabledByRule) === 0) {
            offsetToCompare = 1;
        }

        if (isDisabledStartByRule) {
            isEnabled = isSelecting || (!isSelecting && compareDesc(theDate, isDisabledStartByRule) === 0);
        } else {
            isEnabled = isSelecting && compareDesc(theDate, isDisabledByRule) === 0;
        }
    }

    if (isSelecting && startDate && !endDate) {
        isEnabled = isEnabled && isBefore(subDays(startDate, 1), theDate);
        if (disabledDates.length) {
            const disabledAfter = disabledDates.find((d) => isBefore(startDate, d));
            if (disabledAfter) {
                isEnabled = isEnabled && isBefore(theDate, addDays(disabledAfter, offsetToCompare));
            }
        }
    }

    return isEnabled;
}