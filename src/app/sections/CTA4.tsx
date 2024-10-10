import React from "react";
import {Link} from "@i18n/config";
import {autop} from "@wordpress/autop";

import ButtonRoundIcon from "@/app/components/buttons/ButtonRoundIcon";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

type Props = {
    children?: React.ReactNode
};
export default function Cta4(props: Props) {
    return (
        <section className="cta-4">
            {props.children}
        </section>

    );
};

type BgUnitProps = {
    link?: any,
    image?: any,
    text?: string
    buttonLabel?: string,
}

export function Cta4BackgroundUnit(props: BgUnitProps) {
    return (
        <div className="cta-4__background-unit hover-sync">
            <Link href={props?.link || '/'} className="cta-4__background-unit-link"/>
            <img
                className="cta-4__background-unit-image"
                src={props.image ? props.image : '/images/placeholder.jpg'}
            />

            <div className="cta-4__background-unit-container fl-container">
                <h2 className="cta-4__background-unit-title display--34"
                    dangerouslySetInnerHTML={{__html: autop(props?.text || '')}}/>

                <div className="cta-4__background-unit-button">
                    <ButtonRoundIcon icon={<ArrowForward/>}>{props.buttonLabel}</ButtonRoundIcon>
                </div>
            </div>
        </div>
    )
}

type SolidUnitProps = {
    link?: any,
    image?: any,
    text?: string
    buttonLabel?: string
}

export function Cta4SolidUnit(props: SolidUnitProps) {
    return (
        <div className="cta-4__solid-unit hover-sync">
            <Link href={props?.link || '/'} className="cta-4__solid-unit-link"/>

            <img
                className="cta-4__solid-unit-image"
                src={props.image ? props.image : '/images/gift-card-single.webp'}
            />

            <div className="cta-4__solid-unit-container fl-container">
                <h2 className="cta-4__solid-unit-title display--34"
                    dangerouslySetInnerHTML={{__html: autop(props?.text || '')}}/>

                <div className="cta-4__solid-unit-button">
                    <ButtonRoundIcon icon={<ArrowForward/>}>{props.buttonLabel}</ButtonRoundIcon>
                </div>
            </div>
        </div>
    )
}