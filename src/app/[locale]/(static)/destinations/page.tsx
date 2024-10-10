import React from "react";
import { Link } from "@i18n/config";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import CheckAvailabilityForm from "@/app/components/Forms/AvailabilityForm/CheckAvailabilityForm";
import Cta4, { Cta4BackgroundUnit, Cta4SolidUnit } from "@/app/sections/CTA4";
import Faq from "@/app/sections/Faq";
import LocationGrid from "@/app/sections/LocationGrid";
import SectionWithCarousel from "@/app/sections/SectionWithCarousel";
import { getDateRangeFromUrlParams } from "@/app/utils/calendarDates";
import { slug } from "@/app/utils/locationSlug";
import { idFromParamsSlug, slugFromParamsSlug } from "@/app/utils/slugify";
import { getHousesInRegion, getRegions } from "@/app/utils/xhr/api";
import { getBestLocations } from "@/app/utils/xhr/api-calls/getBestLocations";
import FrilandRoundLogo from "@/assets/icons/friland-round-logo.svg";
import SectionWithNatureRetreat from "@/app/sections/SectionWithNatureRetreat";

const FAQ_BLOCK_ID = 10000;

type Props = {
    "params": {
        "locale": string,
        "slug": string[]
    },
    "searchParams": {}
};


export default async function DestinationsPage(props: Props) {
    const activeRegion = idFromParamsSlug(props.params)

    const [items, advTranslator, bestLocations, destinationsTranslator, regions] = await Promise.all([
        getHousesInRegion({
            region: activeRegion,
            locale: props.params.locale,
            dateRange: getDateRangeFromUrlParams(props?.params),
        }),
        getTranslations('AdvBoxes'),
        getBestLocations(props.params.locale),
        getTranslations('Destinations'),
        getRegions()
    ]);

    if (props.params.hasOwnProperty('slug')) {
        const regionSlug = slugFromParamsSlug(props.params);

        if (regions.filter(({ label }) => slug(label) === regionSlug).length === 0) {
            return notFound();
        }
    }

    return (
        <>
            <div className="location-booking">
                <div className="location-booking__header">
                    <div className="location-booking__container fl-container">
                        <div className="location-booking__wrapper">

                            <div className="location-booking__logo">
                                <Link href="/"><FrilandRoundLogo /></Link>
                            </div>

                            <h1 className="location-booking__title display--34 text-balance">
                                {destinationsTranslator.rich('title', {
                                    important: (chunks) => <span className="underline">{chunks}</span>
                                })}
                            </h1>

                            <div className="location-booking__form">
                                <CheckAvailabilityForm />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="location-booking__body">
                    <LocationGrid
                        dateRange={getDateRangeFromUrlParams(props?.params)}
                        houses={items.houses} moreInfo={true}/>
                </div>
            </div>

            <SectionWithNatureRetreat />

            <SectionWithCarousel slides={bestLocations.item} />

            <Faq id={FAQ_BLOCK_ID} />

            <Cta4>
                <>
                    <Cta4SolidUnit image='/images/gift-card-single.webp'
                        buttonLabel={advTranslator('gift-card.label')}
                        text={advTranslator('gift-card.title')}
                        link='/gift-card'
                    />
                    <Cta4BackgroundUnit buttonLabel={advTranslator('partners.label')}
                        text={advTranslator('partners.title')}
                        image='/images/diventa-nostro-partner.jpg'
                        link='/partners'
                    />
                </>
            </Cta4>
        </>
    );
}


export async function generateMetadata(props: Props): Promise<Metadata> {

    const t = await getTranslations('Destinations');
    const activeRegion = idFromParamsSlug(props.params);
    const url = headers().get('x-url');

    const items = await getHousesInRegion({
        region: activeRegion,
        locale: props.params.locale,
        dateRange: getDateRangeFromUrlParams(props?.params),
    });
    return {
        title: items._meta.title,
        description: items._meta.description,
        openGraph: {
            title: items._meta.title,
            description: items._meta.description,
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }


}


