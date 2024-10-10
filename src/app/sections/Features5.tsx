'use client'

import React from "react";
import {autop} from "@wordpress/autop";

import ImpactFeature, {ImpactFeatureProps} from "@/app/[locale]/(static)/destination/[slug]/components/ImpactFeature";
import Accordion1 from "@/app/components/Accordions/Accordion1";
import Carousel2, {Carousel2ItemProps} from "@/app/components/carousel/Carousel2";

type Props = {
    title?: string,
    text?: string,
    features: ImpactFeatureProps[],
    gallery: Carousel2ItemProps[],
    classes?: string
}

export function Feature5Wrapper(props: Props) {
    return (
        <div className="feature-section-5__wrapper" data-aos="fade-up">
            <div className="feature-section-5__copy-unit">
                <h2 className="feature-section-5__title display--34"
                    dangerouslySetInnerHTML={{__html: props?.title || ''}}/>

                <div className="feature-section-5__text text--18 mcb-0"
                     dangerouslySetInnerHTML={{__html: autop(props?.text || '')}}/>
            </div>

            <div className="feature-section-5__features-unit" data-aos="fade-left">
                <div className="feature-section-5__features-wrapper">
                    {props.features.map((props: ImpactFeatureProps, i) => <ImpactFeature
                            key={i}
                            {...props}
                        />
                    )}
                </div>
            </div>

            <div className="feature-section-5__gallery-unit" data-aos="fade-up">
                <Carousel2 showDots={true} items={props.gallery}/>
            </div>
        </div>
    )
}

export default function Features5(props: Props) {
    return (
        <section className="feature-section-5">
            <div className="feature-section-5__mobile">
                <Accordion1 items={[
                    {
                        title: props?.title || '',
                        text: <Feature5Wrapper {...props} />
                    }
                ]}/>
            </div>

            <div className={`feature-section-5__desktop ${props.classes}`}>
                <div className="feature-section-5__container fl-container">
                    <Feature5Wrapper {...props} />
                </div>
            </div>
        </section>
    )
}