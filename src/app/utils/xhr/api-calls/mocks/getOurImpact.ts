import {getTranslations} from "next-intl/server";

import {ImpactFeatureProps} from "@/app/[locale]/(static)/destination/[slug]/components/ImpactFeature";
import {Carousel2ItemProps} from "@/app/components/carousel/Carousel2";
import {getLocaleLongContentWithMeta} from "@/app/utils/getLocaleLongContent";

export const getOurImpact = async (locale: string) => {

    const t = await getTranslations('OurImpactBox')

    interface LongText {
        attributes: {
            title: string
            auto_paragraphs?: boolean
            other_meta?: string
        },
        body: string
    }


    const impactFeatures: ImpactFeatureProps[] = [
        {
            icon: 'features/temp.svg',
            highlight: '-30%',
            text: t('features.1.text')
        },
        {
            icon: 'features/drop.svg',
            highlight: '-41%',
            text: t('features.2.text')
        }
    ]

    const impactGallery: Carousel2ItemProps[] = [
        {
            image: {
                src: '/images/impact-feature-1.jpg',
                alt: '',
                width: 500,
                height: 300
            }
        },
        {
            image: {
                src: '/images/impact-feature-2.jpg',
                alt: '',
                width: 500,
                height: 300
            }
        },
        {
            image: {
                src: '/images/impact-feature-3.jpg',
                alt: '',
                width: 500,
                height: 300
            }
        },
        {
            image: {
                src: '/images/impact-feature-4.jpg',
                alt: '',
                width: 500,
                height: 300
            }
        },
    ]

    const longText = getLocaleLongContentWithMeta(`${locale}/our-impact/features.md`) as LongText;
    
    return {features: impactFeatures, gallery: impactGallery, content: longText};
}