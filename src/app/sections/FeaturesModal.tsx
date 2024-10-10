'use client'

import React from "react";

import {CloseIcon} from "@/app/components/Icons";
import {GiftCardFeature} from "@/types";

type Props = {
    data?: GiftCardFeature[] | null;
}

export default function FeaturesModal(props: Props) {
    return (
        <div className="features-modal">
            <div className="features-modal__wrapper">
                <div className="features-modal__header">
                    <div className="features-modal__close">
                        <CloseIcon/>
                    </div>
                </div>
                <div className="features-modal__body">
                    {props.data?.map((item, index) =>
                        <Feature key={index} data={item}/>
                    )}
                </div>
            </div>
        </div>

    )
}

type ItemProps = {
    data?: GiftCardFeature;
}

function Feature(itemProps: ItemProps) {
    return (
        <div className="features-modal__feature">
            <div className="features-modal__feature-icon-wrapper">
                <img src='/icons/checkmark-circle.svg' />
            </div>

            <div className="features-modal__feature-copy">
                <h3 className="features-modal__feature-title">{itemProps.data?.title}</h3>

                <p className="features-modal__feature-description text--13">
                    {itemProps.data?.description}
                </p>

            </div>
        </div>
    )
}