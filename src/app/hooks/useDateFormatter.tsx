import {intlFormat} from "date-fns";
import {useLocale} from "use-intl";

import {maybeConvertStringDateToACalendarDate} from "@/app/utils/calendarDates";

export function useDateFormatter() {
    const locale = useLocale();
    return (date?: Date | string | null) => {
        const parsed = maybeConvertStringDateToACalendarDate(date);

        if (!parsed) {
            return "";
        }

        return intlFormat(parsed, {
            month: "short",
            day: "numeric",
            year: "numeric",
        }, {
            locale
        });
    };
}