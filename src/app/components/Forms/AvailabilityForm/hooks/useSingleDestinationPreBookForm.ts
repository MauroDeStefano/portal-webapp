import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "@i18n/config";
import {parseISO} from "date-fns";

import {addToCart} from "@/app/checkout/cart-server";
import {useGetHousePrice} from "@/app/components/Forms/AvailabilityForm/hooks/useGetHousePrice";
import {SingleDestinationFormProps} from "@/app/components/Forms/AvailabilityForm/SingleDestinationPreBookForm";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {
    singleDestinationOrderValidator,
    TSingleDestinationOrderFormSchema
} from "@/app/serverActions/validators/singleDestinationOrderValidator";
import {maybeConvertDateToString} from "@/app/utils/calendarDates";
import {AvailabilityDate} from "@/types";
import {TGenericEventObject, useTrackAddToCart, useTrackViewContent} from "@/app/utils/tracking";
import {useIubenda} from "@mep-agency/next-iubenda";

export function useSingleDestinationPreBookForm(props: SingleDestinationFormProps) {
    const router = useRouter();
    const {
        dateRangeGifts,
        giftCardEnabled,
        activeDateRange
    } = useFrilandContext((state) => state);

    const schema = singleDestinationOrderValidator();
    const trackAddToCart = useTrackAddToCart();
    const trackViewContent = useTrackViewContent();
    const {
        userPreferences, // The latest available user preferences data
        showCookiePolicy, // Displays the cookie policy popup
        openPreferences, // Opens the preferences panel
        showTcfVendors, // Opens the TCF vendors panel
        resetCookies, // Resets all cookies managed by Iubenda

        /*
         * The following exposed entries are meant for internal use only and should
         * not be used in your projects.
         */
        dispatchUserPreferences, // Update the user preferences data across the app
        i18nDictionary, // Contains the translations for the built-in components
    } = useIubenda();


    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: {
            errors,
            isSubmitting,
            isValid
        },
    } = useForm<TSingleDestinationOrderFormSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            guests: undefined,
            dateRange: activeDateRange ? activeDateRange : undefined,
            houseID: props.houseID,
        }
    });

    useEffect(() => {
        if (activeDateRange) {
            setValue('dateRange', activeDateRange);
        }
    }, [activeDateRange]);



    const [checkingPrice, price] = useGetHousePrice({control});

    const action: () => void = handleSubmit(async (data) => {
        console.debug('preparing cookie', data);

        if (!data.dateRange.start || !data.dateRange.end) {
            return;
        }

        const trackObj = [
            {
                product_id: data.houseID,
                product_name: props.house_name,
                totalPrice: price.totalPrice,
                discount: price?.discount,
                taxes: price?.taxes,
                totalPriceDiscounted: price?.totalPriceDiscounted,
            } as TGenericEventObject];

        if (typeof userPreferences !== 'undefined') {
            if (userPreferences.gdprPurposes.measurement) {
                trackViewContent(trackObj);
                trackAddToCart(trackObj);
            }
        }

        await addToCart({
            uniq_id: Math.random().toString(36).substring(7),
            product_id: data.houseID,
            product_type: 'HOUSE',
            product_name: props.house_name,

            fullPrice: price.totalPrice,
            discount: price?.discount,
            taxes: price?.taxes,
            totalPriceDiscounted: price?.totalPriceDiscounted,

            product_url: '/destination/[slug]',

            petAllowed: props.pet_allowed,
            hasPet: false,//props.pet_allowed,
            petPrice: 0,

            dateRange: {
                start: maybeConvertDateToString(data.dateRange.start) as string,
                end: maybeConvertDateToString(data.dateRange.end) as string,
            },

            // @ts-ignore
            guests: data.guests.value,
        });

        console.debug('redirecting to order page');
        router.push({
            pathname: '/order',
        });

        return new Promise(() => {
        });
    });

    const parseAvailabilityDate = (day: any): AvailabilityDate => {
        let vacancy = day.vacancy;

        return {
            ...day,
            vacancy,
            no_gift_card: day?.no_gift_card || false,
            date: parseISO(day.date),
        };
    }

    const availableDates = props.availableDates.map(parseAvailabilityDate);
    const availableGiftDates = dateRangeGifts.map(parseAvailabilityDate);

    return {
        handleSubmit: action,
        register,
        control,
        errors,
        isSubmitting,
        isValid,
        watch,
        availabilityRange: {
            min: props.availabilityRange.min ? parseISO(props.availabilityRange.min) : null,
            max: props.availabilityRange.max ? parseISO(props.availabilityRange.max) : null,
        },
        availableDates: giftCardEnabled ? [...availableGiftDates, ...availableGiftDates] : availableDates,
        availableGiftDates,
        checkingPrice,
        activeDateRange,
        price
    };
}