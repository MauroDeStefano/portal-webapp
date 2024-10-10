import React from "react";
import {autop} from "@wordpress/autop";

import {LazyIcon} from "@/app/components/Icons";
import {Image} from "@/types";

interface FeaturedWithDescriptionProps {
    icon?: string;
    image?: Image;
    title: string;
    text: string;
}

export function FeaturedWithDescription({icon, image, title, text}: FeaturedWithDescriptionProps) {
    return (
        <div className="feature-section-3__feature-item">
            <div className="feature-section-3__feature-icon-wrapper">
                {icon ? <LazyIcon icon={icon}/> : null}
                {image ? <img src={image.src}
                              width={image.width}
                              height={image.height}
                              alt={image?.alt}/> : null}
            </div>

            <div className="feature-section-3__feature-copy mcb-0">
                <h4 className="feature-section-3__feature-title">{title}</h4>

                <div className="feature-section-3__feature-text text--13"
                     dangerouslySetInnerHTML={{__html: autop(text)}}/>
            </div>
        </div>
    );
}


export function FeaturedWithDescriptionList({icon, image, title, text}: FeaturedWithDescriptionProps) {
    return (
        <div className="feature-section-4__feature">
            <div className="feature-section-4__feature-icon-wrapper">
                {icon ? <LazyIcon
                    icon={icon}
                    className="feature-section-4__feature-icon"
                /> : null}

                {image ? <img
                    src={image.src}
                    className="feature-section-4__feature-icon"
                    width={image.width}
                    height={image.height}
                    alt={image?.alt}/> : null}
            </div>

            <div className="feature-section-4__feature-copy mcb-0">
                <h3 className="feature-section-4__feature-title">{title} </h3>
                <div className="feature-section-4__feature-text text--13"
                     dangerouslySetInnerHTML={{__html: autop(text)}}/>
            </div>
        </div>
    );
}

