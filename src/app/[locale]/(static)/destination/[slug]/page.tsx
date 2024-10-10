import React from "react";
import { autop } from '@wordpress/autop';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { sprintf } from "sprintf-js";

import {
    FeaturedWithDescription,
    FeaturedWithDescriptionList
} from "@/app/[locale]/(static)/destination/[slug]/components/FeaturedWithDescription";
import { ImpactFeatureProps } from "@/app/[locale]/(static)/destination/[slug]/components/ImpactFeature";
import MapWithRelativePointer from "@/app/[locale]/(static)/destination/[slug]/components/MapWithRelativePointer";
import Accordion1 from "@/app/components/Accordions/Accordion1";
import { Carousel2ItemProps } from "@/app/components/carousel/Carousel2";
import SingleDestinationPreBookForm from "@/app/components/Forms/AvailabilityForm/SingleDestinationPreBookForm";
import { SubHeader2 } from "@/app/components/SubHeader";
import Faq from "@/app/sections/Faq";
import Features5 from "@/app/sections/Features5";
import { LocationGridItem } from "@/app/sections/LocationGrid";
import SlideshowHero from "@/app/sections/SlideshowHero";
import Testimonials from "@/app/sections/Testimonials";
import { idFromSlug, slugFromParamsSlug } from "@/app/utils/slugify";
import { getHouseData, getReviews } from "@/app/utils/xhr/api";
import { getOurImpact } from "@/app/utils/xhr/api-calls/mocks/getOurImpact";
import { AvailabilityDate, Image } from "@/types";
import { headers } from "next/headers";
import { slug as slugify } from "@/app/utils/locationSlug";

// import {StickyCheckAvailabilityForm} from "@/app/components/CheckAvailabilityForm";

const FAQ_BLOCK_ID = 10001;

function sortResultItems(items: any[], key: string) {
    return items.sort((a, b) => a[key] - b[key]);
}

interface DestinationSinglePageProps {
    params: {
        locale: string
        slug: string
    };
}

interface TagType {
    name: string
    image: {
        alt: string
        src: string
    }
}

interface CarouselType {
    id: string
    url: string
    urlMobile: string
    name: string
    alt: string
    priority: number
}

interface MapType {
    id: number
    x: number
    y: number
    city: string
    province: string
    url: string,
    park_distance: number
}

interface LocationFeatureType {
    icon?: string
    image?: Image
    title: string
    text: string
}

export interface HouseType {
    gallery: Carousel2ItemProps[]
    impact_features: ImpactFeatureProps[]
    impact_text: string
    impact_title: string
    features_grid_title: string
    _meta: {
        title: string
        description: string
    },
    header: {
        title: string
        text: string
        carousel: CarouselType[]
    }
    tags: TagType[]
    map: MapType
    map_notes: string

    features_list: LocationFeatureType[]
    features_list_notes: string
    features_grid: LocationFeatureType[]
    similarLocationsBox: {
        similarLocations: []
    }
    availabilityRange: {
        min: string
        max: string
    }
    availableDates: AvailabilityDate[]
    dog_allowed: boolean
    min_price: number
    two_nights_price: number
}

function convertCarousel(carousel: CarouselType[]) {
    return sortResultItems(carousel, 'priority').map((slide) => {
        return {
            url: slide.url,
            urlMobile: slide.urlMobile,
            alt: slide.alt,
            name: slide.name
        }
    });
}


const Tag = (tag: TagType) => {
    return (
        <div className="feature-section-2__feature-item">
            <img
                className="feature-section-2__feature-icon"
                src={tag.image.src}
                alt={tag.image.alt}
            />
            <h3 className="feature-section-2__feature-title text--13">{tag.name}</h3>
        </div>
    );
}

export default async function DestinationSinglePage({ params: { locale, slug } }: DestinationSinglePageProps) {
    let house;

    try {
        house = await getHouseData(idFromSlug(slug), locale);

    } catch (e) {
        notFound();
    }

    if (slug) {
        const houseSlug = slugFromParamsSlug({ slug: slug });

        if (slugify(house.header.title) !== houseSlug) {
            return notFound();
        }
    }
    const [
        t,
        impactBoxTranslator,
        reviews,
        ourImpact
    ] = await Promise.all([
        getTranslations('Destination'),
        getTranslations('OurImpactBox'),
        getReviews(locale, idFromSlug(slug)),
        getOurImpact(locale)
    ]);

    return (
        <>
            <SubHeader2 goBack='/destinations'>{house.header.title}</SubHeader2>

            <SlideshowHero slides={convertCarousel(house.header.carousel)} />

            <SingleDestinationPreBookForm
                houseID={idFromSlug(slug)}
                availableDates={house.availableDates}
                availabilityRange={house.availabilityRange}
                house_name={house.header.title}
                pet_allowed={house.dog_allowed}
            />

            <section className="feature-section-2">
                <div className="feature-section-2__container">
                    <div className="feature-section-2__features-unit">
                        <div
                            className="feature-section-2__features-wrapper feature-section-2__features-wrapper--wide">
                            {house.tags.map((tag: TagType) => <Tag key={tag.name} {...tag} />)}
                        </div>
                    </div>

                    <div className="feature-section-2__location-unit">
                        <div className="feature-section-2__location-wrapper">
                            <MapWithRelativePointer
                                mapImage={`/regions/${house.map.id}.svg`}
                                mapCoords={{ top: house.map.y, left: house.map.x }}
                            />

                            <div className="feature-section-2__location-copy mcb-0">
                                {sprintf(t('map.note'), house.map.city, house.map.province)}&nbsp;
                                <a target="_blank" href={house.map.url}>{t('map.here')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="feature-section-3">
                <div className="feature-section-3__container fl-container">
                    <div className="feature-section-3__wrapper">

                        <div className="feature-section-3__copy-unit">
                            <div
                                className="feature-section-3__text text--18 mcb-0"
                                dangerouslySetInnerHTML={{ __html: autop(house.header.text) }} />
                        </div>

                        <div className="feature-section-3__features-unit">
                            <div className="feature-section-3__features-price-description">
                                <div className="feature-section-3__features-text-grid">
                                    <p className="feature-section-3__features-text-primary">
                                        {t('features.features_description.title')}
                                    </p>
                                    <p className="feature-section-3__features-text-price ">
                                        {house.min_price} {' '} €
                                        <span className="feature-section-3__features-text-primary">
                                            /{t('features.features_description.price')}
                                        </span>
                                    </p>
                                </div>
                                <p className="feature-section-3__features-text-secondary">
                                    {t('features.features_description.text')} {' '}
                                    <span className="feature-section-3__features-text-primary">
                                        {house.two_nights_price}€
                                    </span>
                                </p>
                            </div>

                            <div className="feature-section-3__features-wrapper">
                                <FeaturedWithDescription title={t('features.features_list.self_checkin.title')} text={t('features.features_list.self_checkin.text')}
                                    icon='features/checkin.svg' />
                                <FeaturedWithDescription title={t('features.features_list.self_checkout.title')} text={t('features.features_list.self_checkout.text')}
                                    icon='features/checkout.svg' />
                                <FeaturedWithDescription title={t('features.features_list.comfort_and_safety.title')}
                                    text="" icon='features/house.svg' />
                                <FeaturedWithDescription title={t('features.features_list.territory_exploration.title')}
                                    text={t('features.features_list.territory_exploration.text')}
                                    icon='features/crossroads.svg' />
                                <FeaturedWithDescription title={t('features.features_list.parking.title')}
                                    text={sprintf(t('features.features_list.parking.text'), house.map.park_distance)}
                                    icon='features/parking.svg' />
                            </div>

                            <div className="feature-section-3__features-notes text--13 mcb-0">
                                {t('features.features_list_notes')}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="feature-section-4">
                <div className="feature-section-4__mobile">
                    <Accordion1 items={[
                        {
                            title: t.rich('features.features_grid.title', {
                                important: (chunks) => <span className='underline'>{chunks}</span>
                            }),
                            text: <div className="feature-section-4__features-wrapper">
                                <FeaturedWithDescriptionList icon='features/trees.svg' text=""
                                    title={t('features.features_grid.panoramic_window.title')} />
                                <FeaturedWithDescriptionList icon='features/kitchen.svg'
                                    text={t('features.features_grid.kitchen.text')}
                                    title={t('features.features_grid.kitchen.title')} />
                                <FeaturedWithDescriptionList icon='features/shower.svg'
                                    text={t('features.features_grid.bathroom.text')}
                                    title={t('features.features_grid.bathroom.title')} />
                                <FeaturedWithDescriptionList icon='features/cup.svg'
                                    text={t('features.features_grid.breakfast_kit.text')}
                                    title={t('features.features_grid.breakfast_kit.title')} />
                                <FeaturedWithDescriptionList icon='features/temp.svg'
                                    text={t('features.features_grid.temperature_control.text')}
                                    title={t('features.features_grid.temperature_control.title')} />
                                <FeaturedWithDescriptionList icon='features/bed.svg'
                                    text={t('features.features_grid.double_bed.text')}
                                    title={t('features.features_grid.double_bed.title')} />
                                <FeaturedWithDescriptionList icon='features/toilet.svg'
                                    text={t('features.features_grid.essentials.text')}
                                    title={t('features.features_grid.essentials.title')} />
                                <FeaturedWithDescriptionList icon='features/cross.svg'
                                    text={t('features.features_grid.safety_devices.text')}
                                    title={t('features.features_grid.safety_devices.title')} />
                            </div>
                        }
                    ]} />
                </div>

                <div className="feature-section-4__desktop">
                    <div className="feature-section-4__container fl-container">
                        <div className="feature-section-4__wrapper">
                            <h2 className="feature-section-4__title display--34">
                                {t.rich(('features.features_grid.title'), {
                                    important: (chunks) => <span className="underline">{chunks}</span>
                                })}
                            </h2>

                            <div className="feature-section-4__features-wrapper">
                                <FeaturedWithDescriptionList icon='features/trees.svg' text=""
                                    title={t('features.features_grid.panoramic_window.title')} />
                                <FeaturedWithDescriptionList icon='features/kitchen.svg'
                                    text={t('features.features_grid.kitchen.text')}
                                    title={t('features.features_grid.kitchen.title')} />
                                <FeaturedWithDescriptionList icon='features/shower.svg'
                                    text={t('features.features_grid.bathroom.text')}
                                    title={t('features.features_grid.bathroom.title')} />
                                <FeaturedWithDescriptionList icon='features/cup.svg'
                                    text={t('features.features_grid.breakfast_kit.text')}
                                    title={t('features.features_grid.breakfast_kit.title')} />
                                <FeaturedWithDescriptionList icon='features/temp.svg'
                                    text={t('features.features_grid.temperature_control.text')}
                                    title={t('features.features_grid.temperature_control.title')} />
                                <FeaturedWithDescriptionList icon='features/bed.svg'
                                    text={t('features.features_grid.double_bed.text')}
                                    title={t('features.features_grid.double_bed.title')} />
                                <FeaturedWithDescriptionList icon='features/toilet.svg'
                                    text={t('features.features_grid.essentials.text')}
                                    title={t('features.features_grid.essentials.title')} />
                                <FeaturedWithDescriptionList icon='features/cross.svg'
                                    text={t('features.features_grid.safety_devices.text')}
                                    title={t('features.features_grid.safety_devices.title')} />
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            <Features5
                features={ourImpact.features}
                gallery={ourImpact.gallery}
                title={impactBoxTranslator('title')}
                text={ourImpact.content.body}
            />

            <Testimonials title={reviews.title} subtitle={reviews.subtitle} slides={reviews.items} />
            <Faq id={FAQ_BLOCK_ID} />

            <section className="suggested-locations-1">
                <div className="suggested-locations-1__header">
                    <div className="suggested-locations-1__header-container fl-container">
                        <h2 className="suggested-locations-1__header-title display--34">
                            {t('related_heading')}
                        </h2>
                    </div>
                </div>

                <div className="suggested-locations-1__body">
                    <div className="location-grid">
                        <div className="location-grid__container fl-container">
                            <div className="location-grid__wrapper">
                                {house.similarLocationsBox.similarLocations.map((item: any) => (
                                    <LocationGridItem key={item.id} {...item} showDetails={false} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function generateMetadata({ params: { locale, slug } }: DestinationSinglePageProps): Promise<Metadata> {
    let house;
    const url = headers().get('x-url');
    try {
        house = await getHouseData(idFromSlug(slug), locale);
    } catch (e) {
        notFound();
    }

    return {
        title: house._meta.title,
        description: house._meta.description,
        openGraph: {
            title: house._meta.title,
            description: house._meta.description
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },

    }
}