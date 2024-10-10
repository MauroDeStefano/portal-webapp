import {getTranslations} from "next-intl/server";
import ImageBundle from "@/app/components/ImageBundle";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {ArrowForwardIcon} from "@/app/components/Icons";
import {Link} from "@i18n/config";
import {locationSlug} from "@/app/utils/locationSlug";
import React from "react";
import {TMostClickedLocation} from "@/types/mostClickedtLocation";

type Props = {
    data?: TMostClickedLocation[]
}

export default async function DestinationList1(props: Props) {
    const t = await getTranslations('MostClickedDestinations');

    return (
        <div className="destination-list-1">
            <div className="destination-list-1__fl-container">
                <div className="destination-list-1__header">
                    <div className="destination-list-1__header-container fl-container">
                        <div className="destination-list-1__header-wrapper">
                            <h3 className="destination-list-1__header-title">{t('title')}</h3>
                        </div>
                    </div>
                </div>

                <div className="destination-list-1__body">
                    <div className="destination-list-1__body-container fl-container">
                        <div className="destination-list-1__body-wrapper">
                            {props?.data && props.data.map((item, index) =>
                                <DestinationItem item={item} key={item.id} ranking={index} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

type ItemProps = {
    item?: TMostClickedLocation,
    ranking?: number
}

export function DestinationItem(props: ItemProps) {

    return (
        <div className="destination-list-1__item">
            <Link className="destination-list-1__item-unit-link" href={{
                pathname: '/destination/[slug]',
                params: {slug: locationSlug(props?.item? props?.item.id: 0, props?.item? props?.item.title: '' )}
            }}/>
            <ImageBundle srcMobile={props.item?.images.mobile.src}
                         srcDesktop={props.item?.images.desktop.src}
                         alt={props.item?.images.alt}
                         className="destination-list-1__item-image"
            />
            <div className="destination-list-1__item-content">
                <h4 className="destination-list-1__item-number">#{(props?.ranking || 0) + 1}</h4>
                <h3 className="destination-list-1__item-title">{props.item?.title}</h3>
            </div>
            <div className="destination-list-1__item-button-wrapper">
                <Link href={{
                    pathname: '/destination/[slug]',
                    params: {slug: locationSlug(props?.item? props?.item.id: 0, props?.item? props?.item.title: '' )}
                }}>
                <LinkWithIcon icon={<ArrowForwardIcon />} tagName="button" />
                </Link>
            </div>
        </div>
    )
}