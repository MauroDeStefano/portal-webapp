import {TBlogPost, TBlogPostReduced} from "@/types/blog";
import ImageBundle from "@/app/components/ImageBundle";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import ArrowDown from "@spectrum-icons/workflow/ArrowDown";
import {PlusIcon} from "@storybook/icons";
import {Link} from "@i18n/config";
import {locationSlug} from "@/app/utils/locationSlug";
import {ArrowForwardIcon} from "@/app/components/Icons";
import React from "react";
import {getTranslations} from "next-intl/server";

type Props = {
    title?: string,
    pagination?: boolean,
    data?: TBlogPostReduced[]
}
export default function ArticleList1(props: Props) {
    return (
        <div className="article-list-1">
            {props?.title &&
                <div className="article-list-1__header">
                    <div className="article-list-1__header-container fl-container">
                        <div className="article-list-1__header-wrapper">
                            <h3 className="article-list-1__header-title">{props.title}</h3>
                        </div>
                    </div>
                </div>
            }

            <div className="article-list-1__body">
                <div className="article-list-1__body-container fl-container">
                    <div className="article-list-1__body-wrapper">
                        {props?.data && props.data.map((item) =>
                            <ArticleListItem key={item.id} item={item} />
                        )}
                    </div>
                </div>
            </div>

            {props?.pagination &&
            <div className="article-list-1__footer">
                <div className="article-list-1__footer-container fl-container">
                    <div className="article-list-1__footer-wrapper">
                        <div className="article-list-1__pagination">
                            <LinkWithIcon icon={<PlusIcon />} reverseIcon="true">
                                Carica più contenuti
                            </LinkWithIcon>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

type ItemProps = {
    item?: TBlogPostReduced
}

export async function ArticleListItem(props: ItemProps) {

    const t = await getTranslations('Blog');

    return (
        <div className="article-list-1__item">
            <Link href={{
                pathname: '/blog/article/[slug]',
                params: {slug: locationSlug(props?.item?.id? props?.item.id: 0, props?.item?.title? props?.item.title: '' )}
            }}
                  className="article-list-1__item-unit-link">

            </Link>
            <div className="article-list-1__item-image-wrapper">
                <ImageBundle srcDesktop={props.item?.images?.desktop.src}
                             srcMobile={props.item?.images?.mobile.src}
                             alt={props.item?.images?.alt}
                             className="article-list-1__item-image"
                />
            </div>
            <h3 className="article-list-1__item-title">{props.item?.title}</h3>
            <div className="article-list-1__item-time-estimate">
                <p className="time-estimate-2"><span className="time-estimate-2__time">{t.rich('reading_time', {value: props.item?.reading_time})} - </span>
                    {props.item?.tags.map((item, key, row) =>
                        <span key={item.id}>
                            <a href="#">{item.title}</a>
                            {((key + 1) < row.length) && ',' }&nbsp;
                        </span>
                    )}
                </p>

            </div>
        </div>
    )
}