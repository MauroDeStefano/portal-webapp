'use client'

import React, {useEffect, useRef, useState} from "react";
import {Link} from "@i18n/config";

import ButtonWithLabelOver from "@/app/components/buttons/ButtonWithLabelOver";
import ImageBundle from "@/app/components/ImageBundle";

import 'aos/dist/aos.css';
import {CSSTransition} from "react-transition-group";
import FeaturesModal from "@/app/sections/FeaturesModal";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import ArrowForward from "@/assets/icons/arrow-forward.svg";
import {ArrowForwardIcon} from "@/app/components/Icons";
import {TBlogPost} from "@/types/blog";
import {getTranslations} from "next-intl/server";
import {useTranslations} from "next-intl";
import {slugify} from "@/app/utils/slugify";
import {locationSlug} from "@/app/utils/locationSlug";

type Props = {
    children?: React.ReactNode,
    title?: string,
    text?: React.ReactNode,
    data?: TBlogPost
}

export default  function Cta9(props: Props) {
    const t =  useTranslations('Blog');
    const slug = locationSlug(props?.data?.id? props?.data.id: 0, props?.data?.title? props?.data.title: '' )

    return (
        <div className="cta-9">
            <Link className="cta-9__unit-link" href={{
            pathname: '/blog/article/[slug]',
            params: {slug: locationSlug(props?.data?.id? props?.data.id: 0, props?.data?.title? props?.data.title: '' )}
            }}></Link>

            <div className="cta-9__content-unit">
                <div className="cta-9__content-container fl-container">
                    <div className="cta-9__content-wrapper">
                        <div className="cta-9__content">
                            <div className="cta-9__time-estimate-wrapper">
                                <p className="time-estimate-1">
                                    <Link href={{
                                        pathname: '/blog/[slug]',
                                        params: {slug: locationSlug(props?.data? props?.data.tags[0].id: 0, props?.data? props?.data.tags[0].title: '' )}
                                    }}
                                    >{props?.data?.tags[0].title}</Link> - {t.rich('reading_time', {value: props?.data?.reading_time})}

                                </p>
                            </div>
                            <h2 className="cta-9__title display--54">{props?.data?.title}</h2>
                            <div className="cta-9__button-wrapper">
                                <Link href={{
                                    pathname: '/blog/article/[slug]',
                                    params: {slug: locationSlug(props?.data?.id? props?.data.id: 0, props?.data?.title? props?.data.title: '' )}
                                }}>
                                    <LinkWithIcon icon={<ArrowForwardIcon/>}
                                                  outline="true"
                                                  tagName="button"
                                    >
                                    {t('read_the_article')}
                                     </LinkWithIcon>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cta-9__image-unit">
                <div className="cta-9__image-container fl-container">
                    <div className="cta-9__image-wrapper">
                        <ImageBundle
                            srcMobile={props.data?.images?.mobile.src}
                            srcDesktop={props.data?.images?.desktop.src}
                            alt={props.data?.images?.alt}
                            className="cta-9__image"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
