'use client'

import React from "react";
import {autop} from "@wordpress/autop";

import ImpactFeature, {ImpactFeatureProps} from "@/app/[locale]/(static)/destination/[slug]/components/ImpactFeature";
import Carousel2, {Carousel2ItemProps} from "@/app/components/carousel/Carousel2";

type Props = {
    title?: string,
    text?: string,
    features: ImpactFeatureProps[],
    gallery: Carousel2ItemProps[],
    classes?: string
}

export function Feature9Wrapper(props: Props) {
    return (
        <div className="feature-section-9__content-wrapper" data-aos="fade-up">
            <div className="feature-section-9__copy-unit">
                <div className="feature-section-9__copy-unit">
                    <div className="feature-section-9__text text--18 mcb-0"
                         dangerouslySetInnerHTML={{__html: autop(props?.text || '')}}/>
                </div>
            </div>

            <div className="feature-section-9__features-unit" data-aos="fade">
                <div className="feature-section-9__features-wrapper">
                    {props.features.map((props: ImpactFeatureProps, i) => <ImpactFeature
                            key={i}
                            featureClass='feature-section-9'
                            {...props}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default function Features9(props: Props) {
    return (
        <section className="feature-section-9">
            <div className="feature-section-9__content">
                <div className="feature-section-9__content-container fl-container">
                    <Feature9Wrapper {...props} />
                </div>
            </div>
            <div className="feature-section-9__gallery-unit" data-aos="fade-up">
                <div className="feature-section-9__gallery-container fl-container">
                    <div className="feature-section-9__gallery-wrapper">
                        <Carousel2 showDots={true} items={props.gallery}/>
                    </div>
                </div>
            </div>
        </section>
    )
}