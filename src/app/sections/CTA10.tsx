import {TBlogPictureOfTheMonth} from "@/types/blog";
import {Link} from "@i18n/config";
import {locationSlug} from "@/app/utils/locationSlug";
import React from "react";
import ImageBundle from "@/app/components/ImageBundle";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {ArrowForwardIcon} from "@/app/components/Icons";

type Props = {
    data?: TBlogPictureOfTheMonth
}

export default function Cta10(props: Props) {
    return (
        <div className="cta-10">
            <Link className="cta-10__unit-link" href={{
                pathname: '/blog/article/[slug]',
                params: {slug: locationSlug(props?.data? (props.data?props.data.id:0) : 0, props?.data? (props.data?props.data?.title:'') : '' )}
            }}/>

            <div className="cta-10__image-unit">
                <ImageBundle srcDesktop={props?.data?.images?.desktop.src}
                             srcMobile={props?.data?.images?.mobile.src}
                             alt={props?.data?.images?.alt}
                             className="cta-10__image"
                             />
            </div>

            <div className="cta-10__content-unit">
                <div className="cta-10__content">
                    <div className="cta-10__date">{props.data?.subtile}</div>
                    <h3 className="cta-10__title">{props.data?.title}</h3>
                    <div className="cta-10__text">{props.data?.quote}</div>
                    <div className="cta-10__button-wrapper">
                        <Link href={{
                            pathname: '/blog/article/[slug]',
                            params: {slug: locationSlug(props?.data? (props.data?props.data.id:0) : 0, props?.data? (props.data?props.data?.title:'') : '' )}
                        }}
                              scroll={true}
                        >
                        <LinkWithIcon tagName="button" outline="true" icon={<ArrowForwardIcon />}></LinkWithIcon>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}