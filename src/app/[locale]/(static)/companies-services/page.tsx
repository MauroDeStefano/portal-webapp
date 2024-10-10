import React from "react";
import classNames from "classnames";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import Composite1, {
    Composite1Cta,
    Composite1Cta2,
    Composite1Features,
    Composite1FeaturesItem,
    Composite1Hero
} from "@/app/sections/Composite1";
import Cta8, {Cta8Item} from "@/app/sections/CTA8";
import Features9 from "@/app/sections/Features9";
import OurCustomers from "@/app/sections/OurCustomers";
import SectionWithCarousel from "@/app/sections/SectionWithCarousel";
import {getBestLocations} from "@/app/utils/xhr/api-calls/getBestLocations";
import {getCompaniesServices} from "@/app/utils/xhr/api-calls/mocks/getCompaniesServices";
import {getOurImpact} from "@/app/utils/xhr/api-calls/mocks/getOurImpact";
import {headers} from "next/headers";


type Props = {
    params: {
        locale: string
    }
}

export default async function CompaniesServicesPage({params: {locale}}: Props) {

    const [
        t,
        impactBoxTranslator,
        ourImpact,
        dummyContent,
        bestLocations
    ] = await Promise.all([
        getTranslations('CompaniesServices'),
        getTranslations('OurImpactBox'),
        getOurImpact(locale),
        getCompaniesServices(locale),
        getBestLocations(locale)
    ]);

    function RenderCustomers() {
        if (dummyContent.customers.length > 0)
            return (
                <OurCustomers items={dummyContent.customers} title={t('OurCustomers.title')}
                              subtitle={t('OurCustomers.subtitle')}/>
            );
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <Composite1>
                <Composite1Hero slides={dummyContent.emblaSlides} title={t.rich('title', {
                    important: (chunks) => <span
                        className="underline">{chunks}</span>
                })}/>
                <div className="composite-1__group">
                    <Composite1Cta href="/contact" label={t('ctaBox.label')} title={t.rich('ctaBox.title', {
                        important: (chunks) => <span className="underline">{chunks}</span>
                    })}>
                        {t('ctaBox.text')}
                    </Composite1Cta>
                    <Composite1Features>
                        <Composite1FeaturesItem>{t('features.1')}</Composite1FeaturesItem>
                        <Composite1FeaturesItem>{t('features.2')}</Composite1FeaturesItem>
                        <Composite1FeaturesItem>{t('features.3')}</Composite1FeaturesItem>
                        <Composite1FeaturesItem>{t('features.4')}</Composite1FeaturesItem>
                        <Composite1FeaturesItem>{t('features.5')}</Composite1FeaturesItem>
                        <Composite1FeaturesItem>{t('features.6')}</Composite1FeaturesItem>
                    </Composite1Features>
                </div>
                <Composite1Cta2 href="/contact" label={t('cta2Box.label')}
                                title={t.rich('cta2Box.title', {
                                    important: (chunks) => <span className="underline">{chunks}</span>
                                })}
                                imgMobile={dummyContent.underSlide.imgMobile}
                                imgDesktop={dummyContent.underSlide.imgMobile}

                >
                    {t('cta2Box.text')}
                </Composite1Cta2>
            </Composite1>

            <Cta8 text={t.rich('imgBoxes.text', {important: (chunks) => <span className="underline">{chunks}</span>})}
                  title={t('imgBoxes.title')}>
                {dummyContent.imgBoxes.map((item, index) =>
                    <Cta8Item
                        key={index}
                        // @ts-ignore
                        title={t.rich('imgBoxes.' + item.id + '.title', {
                            important: (chunks) => <span className="underline">{chunks}</span>
                        })}
                        // @ts-ignore
                        duration={t('imgBoxes.' + item.id + '.duration')}
                        mainCtaHref={item?.mainCtaHref || '/'}
                        // @ts-ignore
                        mainCtaLabel={t('imgBoxes.' + item.id + '.mainCtaLabel')}
                        otherCtaHref={item.otherCtaHref || '/'}
                        // @ts-ignore
                        otherCtaLabel={t('imgBoxes.' + item.id + '.otherCtaLabel')}
                        imgDesktop={item?.imgDesktop}
                        imgMobile={item?.imgMobile}
                    >
                        {
                            // @ts-ignore
                            t('imgBoxes.' + item.id + '.text')
                        }
                    </Cta8Item>
                )}
            </Cta8>
            <SectionWithCarousel slides={bestLocations.item}/>

            <Features9
                features={ourImpact.features}
                gallery={ourImpact.gallery}
                text={ourImpact.content.body}
                title={impactBoxTranslator('title')}
                classes={classNames({'pt-0': true})}
            />

            <RenderCustomers/>

        </>
    );
};


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('CompaniesServices');
    const url = headers().get('x-url');

    return {
        title: t('_meta.title'),
        description: t('_meta.description'),
        openGraph: {
            title: t('_meta.title'),
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }
}