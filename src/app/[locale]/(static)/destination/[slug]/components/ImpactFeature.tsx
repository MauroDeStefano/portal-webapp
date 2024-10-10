import React from "react";
import {autop} from "@wordpress/autop";

import {LazyIcon} from "@/app/components/Icons";
import {Image} from "@/types";

export interface ImpactFeatureProps {
    image?: Image;
    icon?: string;
    highlight: string;
    text: string;
    featureClass?: string
}

export default function ImpactFeature(props: ImpactFeatureProps) {

    const featureClass = props.featureClass ? props.featureClass : 'feature-section-5'

    return (
        <div className={`${featureClass}__feature-item`}>
            <div className={`${featureClass}__feature-icon-wrapper`}>
                {props.icon ? <LazyIcon
                    icon={props.icon}
                    className={`${featureClass}__feature-icon`}
                /> : null}

                {props.image ? <img
                    src={props.image.src}
                    width={props.image.width}
                    height={props.image.height}
                    className={`${featureClass}__feature-icon`}
                    alt={props.image?.alt}/> : null}
            </div>

            <div className={`${featureClass}__feature-copy mcb-0`}>
                <h4 className={`${featureClass}__feature-title`}>
                    {props.highlight}
                </h4>
                <div className={`${featureClass}__feature-text text--13`}
                     dangerouslySetInnerHTML={{__html: autop(props.text)}}/>
            </div>
        </div>
    );
};