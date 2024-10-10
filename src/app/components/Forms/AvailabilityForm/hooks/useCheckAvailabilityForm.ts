import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "@i18n/config";
import {formatISO, parseISO} from "date-fns";
import {useParams} from "next/navigation";

import {DatePickerValue, DropdownOption} from "@/app/components/Forms/AvailabilityForm/types";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {slugify} from "@/app/utils/slugify";
import {AvailabilityDate} from "@/types";

export function useCheckAvailabilityForm() {
    const {
        availableRegions,
        activeRegion,
        activeDateRange,
        dateRangeGifts,
        setActiveDateRange,
        setActiveRegion,
        setReservationFormData
    } = useFrilandContext((state) => state);

    const params = useParams();
    const currentPathname = usePathname();
    const router = useRouter();

    const [formState, setFormState] = React.useState<{
        region: null | DropdownOption;
        dateRange: DatePickerValue | null;
    }>({
        region: activeRegion,
        dateRange: activeDateRange,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const getFormAction = () => {
        if (currentPathname.indexOf('/regions') != -1 && formState?.region?.value !== 0) {
            return '/regions/[...slug]';
        } else {
            return '/destinations/[...slug]'
        }
    }

    const getSlugParams = () => {
        if (!formState?.region) {
            return [];
        }

        return [
            slugify(formState.region.value, formState.region.label),
            !formState?.dateRange?.start ? '' : formatISO(formState.dateRange.start, {representation: 'date'}),
            !formState?.dateRange?.end ? '' : formatISO(formState.dateRange.end, {representation: 'date'})
        ];
    }

    const slugIsTheSame = () => {
        return typeof params.slug === 'object' && params.slug.join('/') === getSlugParams().join('/');
    }

    useEffect(() => {
        setCanSubmit(
            !!formState?.region && !slugIsTheSame()
            // &&
            // !!formState?.dateRange?.start &&
            // !!formState?.dateRange?.end
        );
    }, [formState])

    useEffect(() => {
        setFormState({
            region: activeRegion,
            dateRange: activeDateRange,
        });
    }, [activeRegion, activeDateRange]);

    useEffect(() => {
        if (!formState.region && !formState.dateRange) {
            return;
        }

        if (slugIsTheSame()) {
            return;
        }

        setActiveDateRange(null);
        setActiveRegion(null);
    }, [currentPathname]);


    function handleSubmit() {
        if (!formState?.region) {
            return;
        }

        setActiveDateRange(formState.dateRange);
        setIsSubmitting(true);

        router.push({
            pathname: getFormAction(),
            params: {
                slug: getSlugParams()
            },
            query: {searchResult: true}
        });

        return false;
    }

    const setRegion = (region: null | DropdownOption) => {
        setFormState({
            ...formState,
            region
        });
    }

    const setDateRange = (dateRange: DatePickerValue | null) => {
        setFormState({
            ...formState,
            dateRange
        });
    }

    const availableDates = dateRangeGifts
        .map((day: any): AvailabilityDate => {
            return {
                ...day,
                no_gift_card: day?.no_gift_card || false,
                vacancy: day.vacancy && (day.no_check_in || day.no_check_out),

                // since this is the generic form, we don't need to check for no_check_in and no_check_out
                no_check_in: false,
                no_check_out: false,

                date: parseISO(day.date),
            };
        });


    return {
        availableDates,
        availableRegions,
        setRegion,
        setDateRange,
        formState,
        isSubmitting,
        canSubmit,
        handleSubmit,
        isRedirecting
    };
}