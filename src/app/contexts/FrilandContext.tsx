'use client';

import React, {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {usePathname} from "@i18n/config";
import {useParams, useSearchParams} from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import {StoreApi, useStore} from "zustand";

import {refreshCartExpiration} from "@/app/checkout/cart-server";
import Drawers from "@/app/components/Drawer/Drawers";
import ExternalConfirmation from "@/app/components/ExternalConfirmation";
import {ClientOnlyContextProvider} from "@/app/contexts/ClientOnlyContext";
import {SessionContextProvider} from "@/app/contexts/SessionContext";
import {TAppliedGiftCard} from "@/app/stores/slices/shoppingCartStore";
import {createFrilandStore, TFrilandStore} from "@/app/stores/useFriland";
import {normalizeDateRange} from "@/app/utils/calendarDates";
import {idFromSlug} from "@/app/utils/slugify";
import {Region, TDateRangeString} from "@/types";

const loaderConfig: {
    height: number,
    color: string,
    shadow: false | string,
} = {
    height: 2,
    color: '#38695b',
    shadow: false,
};

if (process?.env?.NEXT_PUBLIC_PRELOADER_HEIGHT_IN_PX) {
    loaderConfig.height = parseInt(process.env.NEXT_PUBLIC_PRELOADER_HEIGHT_IN_PX);
}

if (process?.env?.NEXT_PUBLIC_PRELOADER_COLOR) {
    loaderConfig.color = process.env.NEXT_PUBLIC_PRELOADER_COLOR;
}

if (process?.env?.NEXT_PUBLIC_PRELOADER_SHADOW_COLOR) {
    loaderConfig.shadow = process.env.NEXT_PUBLIC_PRELOADER_SHADOW_COLOR;
}

const FrilandContext = createContext<StoreApi<TFrilandStore> | null>(null,)


export const useFrilandContext = <T, >(
    selector: (store: TFrilandStore) => T,
): T => {
    const ctx = useContext(FrilandContext)

    if (!ctx) {
        throw new Error('useFrilandContext must be used within a FrilandContextProvider');
    }

    return useStore(ctx, selector);
}


export const FrilandContextProvider = ({
                                           children,
                                           dateRange,
                                           regions,
                                           userSession,
                                           appliedGiftCard,
                                           dateRangeGifts
                                       }: {
    dateRange: TDateRangeString;
    userSession?: string;
    regions: Region[];
    children: ReactNode;
    dateRangeGifts: [];
    appliedGiftCard?: TAppliedGiftCard;
}) => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useParams();

    const storeRef = useRef<StoreApi<TFrilandStore>>()

    if (!storeRef.current) {
        console.debug('⌛Fri.land Init');
        storeRef.current = createFrilandStore({
            dateRange,
            regions,
            dateRangeGifts,
            giftCard: appliedGiftCard
        });
    }

    const {
        activeRegion,
        activeDateRange,
        setActiveRegion,
        setActiveDateRange,

        closeDrawer,
        setBusyEl,
        setIsBusy,
    } = storeRef.current.getState();

    useEffect(() => {
        const [
            url_region,
            url_date_start,
            url_date_end
        ] = typeof params?.slug === 'string' ? [params?.slug] : params?.slug ?? [];

        if (
            !activeRegion && url_region || // nothing in the context
            url_region && activeRegion?.value !== idFromSlug(url_region) // url region is different from active region
        ) {
            const _active_region = regions.find(region => region.value === idFromSlug(url_region));
            _active_region && setActiveRegion(_active_region);
        }

        const start_date_from_query = searchParams.get('start');
        const end_date_from_query = searchParams.get('end');

        if (!activeDateRange &&
            (
                (url_date_start && url_date_end) ||
                (start_date_from_query && end_date_from_query)
            )
        ) {
            setActiveDateRange(normalizeDateRange({
                start: url_date_start ?? start_date_from_query,
                end: url_date_end ?? end_date_from_query,
            }));
        }
    }, [params?.slug, searchParams]);

    useEffect(() => {
        setBusyEl(null);
        setIsBusy(false);
        closeDrawer();
        refreshCartExpiration();
    }, [pathname, searchParams]);

    return (
        <FrilandContext.Provider value={storeRef.current}>
            <NextTopLoader
                height={loaderConfig.height}
                color={loaderConfig.color}
                shadow={loaderConfig.shadow}
                zIndex={99999}
                showSpinner={false}
            />
            <SessionContextProvider
                userSession={userSession}
            >
                {children}
                <ClientOnlyContextProvider>
                    <ExternalConfirmation/>
                </ClientOnlyContextProvider>
            </SessionContextProvider>
            <Drawers/>
        </FrilandContext.Provider>
    );
};
