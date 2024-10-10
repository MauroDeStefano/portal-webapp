import React from "react";
import {autop} from "@wordpress/autop";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import CheckAvailabilityForm from "@/app/components/Forms/AvailabilityForm/CheckAvailabilityForm";
import Cta4, {Cta4BackgroundUnit, Cta4SolidUnit} from "@/app/sections/CTA4";
import Faq from "@/app/sections/Faq";
import FeaturesLanding from "@/app/sections/FeaturesLanding";
import ImageHero from "@/app/sections/ImageHero";
import LocationGrid from "@/app/sections/LocationGrid";
import SectionWithCarousel from "@/app/sections/SectionWithCarousel";
import {getDateRangeFromUrlParams} from "@/app/utils/calendarDates";
import {idFromParamsSlug, slugFromParamsSlug} from "@/app/utils/slugify";
import {getHousesInRegion} from "@/app/utils/xhr/api";
import {getBestLocations} from "@/app/utils/xhr/api-calls/getBestLocations";
import {getRegionsMarketing} from "@/app/utils/xhr/api-calls/getRegionsMarketing";
import {getDestinations} from "@/app/utils/xhr/api-calls/mocks/getDestinations";
import {headers} from "next/headers";
import {slug} from "@/app/utils/locationSlug";
import {notFound} from "next/navigation";

const FAQ_BLOCK_ID = 10000;

type Props = {
    "params": {
        "locale": string,
        "slug": string[]
    },
    "searchParams": {}
};


export default async function RegionsPage(props: Props) {
    const activeRegion = idFromParamsSlug(props.params);



    const [items, dummyContent, advTranslator, bestLocations, destinationsTranslator, regionsTranslator, regionsMarketing] = await Promise.all([
        getHousesInRegion({
            region: activeRegion,
            locale: props.params.locale,
            dateRange: getDateRangeFromUrlParams(props?.params)
        }),
        getDestinations(props.params.locale),
        getTranslations('AdvBoxes'),
        getBestLocations(props.params.locale),
        getTranslations('Destinations'),
        getTranslations('Regions'),
        getRegionsMarketing(props.params.locale, activeRegion)
    ]);

    if (props.params.hasOwnProperty('slug')) {
        const regionSlug = slugFromParamsSlug(props.params);

        if (slug(regionsMarketing.region) !== regionSlug) {
            return notFound();
        }
    }

    return (
        <>
            <ImageHero noJump={true} reduced={true} bundle={{
                srcDesktop: regionsMarketing.images.imgDesktop,
                srcMobile: regionsMarketing.images.imgMobile
            }}>
                <div dangerouslySetInnerHTML={{__html: autop(regionsMarketing.title)}}></div>
            </ImageHero>
            <FeaturesLanding title={regionsMarketing.text1}
                             cta_href='#location-booking'
                             cta_label={regionsTranslator('cta', {region: regionsMarketing.region})}

            >
                {regionsMarketing.text2}
            </FeaturesLanding>
            <div className="location-booking" id="location-booking">

                <div className="location-booking__container location-booking__container-landing fl-container">
                    <div className="location-booking__wrapper">
                        <div className="location-booking__form">
                            <CheckAvailabilityForm/>
                        </div>
                    </div>
                </div>

                <div className="location-booking__body">
                    <LocationGrid dateRange={getDateRangeFromUrlParams(props?.params)} houses={items.houses} moreInfo={true}/>
                </div>
            </div>

            <SectionWithCarousel slides={bestLocations.item}/>

            <Faq id={FAQ_BLOCK_ID}/>
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

    const activeRegion = idFromParamsSlug(props.params);
    const regionsMarketing = await getRegionsMarketing(props.params.locale, activeRegion);

    const url = headers().get('x-url');

    return {
        title: regionsMarketing._meta.title,
        description: regionsMarketing._meta.description,
        openGraph: {
            title: regionsMarketing._meta.title,
            description: regionsMarketing._meta.description,
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }
}