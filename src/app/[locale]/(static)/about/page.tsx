import React from "react";
import {autop} from "@wordpress/autop";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import {DropIcon, EnergyIcon, MarmeladeIcon, RoadIcon, StumpIcon, TempIcon} from "@/app/components/Icons";
import {Header4} from "@/app/components/SubHeader";
import Content2, {Content2Item} from "@/app/sections/Content2";
import Content3, {Content3Item} from "@/app/sections/Content3";
import Content4, {Content4Item} from "@/app/sections/Content4";
import Cta4, {Cta4BackgroundUnit} from "@/app/sections/CTA4";
import Features8, {Features8Item} from "@/app/sections/Features8";
import {getLocaleLongContentWithMeta} from "@/app/utils/getLocaleLongContent";
import HeartIcon from "@/assets/icons/heart.svg";
import MeterIcon from "@/assets/icons/meter.svg";
import TreesIcon from "@/assets/icons/trees.svg";
import {headers} from "next/headers";


interface Props {
    params: {
        locale: string
    }
}

interface ContentBlock1 {
    attributes: {
        title: string
        auto_paragraphs?: boolean
        other_meta?: string,
        image_desktop?: string,
        image_mobile?: string
    },
    body: string
}

function ContentItemFile(path: string) {
}

export default async function AboutPage(props: Props) {
    const blocks_1 = [
        getLocaleLongContentWithMeta(`${props.params.locale}/about/block1.md`),
        getLocaleLongContentWithMeta(`${props.params.locale}/about/block2.md`),
        getLocaleLongContentWithMeta(`${props.params.locale}/about/block3.md`),
        getLocaleLongContentWithMeta(`${props.params.locale}/about/block4.md`),
    ] as ContentBlock1[];

    const t = await getTranslations("AboutUs");
    const advTranslator = await getTranslations('AdvBoxes');

    return (
        <>
            <Header4/>
            <Content2>
                <>
                    <Content2Item isNotAos={true}>
                        {t.rich('quotes.items.item1.content', {
                            important: (chunks) => <span className='underline'>{chunks}</span>
                        })}
                    </Content2Item>
                    <Content2Item
                        icon={<TreesIcon fill="#38695b"/>}>
                        {t.rich('quotes.items.item2.content', {
                            important: (chunks) => <span className='underline'>{chunks}</span>
                        })}
                    </Content2Item>
                    <Content2Item
                        iconReverse={true}
                        icon={<MeterIcon fill="#7ca365" stroke="#7ca365"/>}
                        highlight={true}>
                        {t.rich('quotes.items.item3.content', {
                            important: (chunks) => <span className='underline'>{chunks}</span>
                        })}
                    </Content2Item>
                    <Content2Item
                        icon={<HeartIcon fill="#38695b" stroke="#38695b"/>}>
                        {t.rich('quotes.items.item4.content', {
                            important: (chunks) => <span className='underline'>{chunks}</span>
                        })}
                    </Content2Item>
                    <Content2Item
                        highlight={true}>
                        {t.rich('quotes.items.item5.content', {
                            important: (chunks) => <span className='underline'>{chunks}</span>
                        })}
                    </Content2Item>
                </>
            </Content2>

            <Content3>
                <>
                    {blocks_1.map((block, i) =>
                        <Content3Item imageMobile={block.attributes.image_mobile}
                                      imageDesktop={block.attributes.image_desktop} title={block.attributes.title}
                                      key={i} reverse={i % 2 == 0}>
                            {
                                block.attributes.auto_paragraphs ?
                                    <div dangerouslySetInnerHTML={{__html: autop(block.body)}}/> :
                                    <div dangerouslySetInnerHTML={{__html: block.body}}/>
                            }
                        </Content3Item>
                    )}
                </>
            </Content3>


            <Content4 subtitle={t('ourCommitment.subtitle')} title={t.rich('ourCommitment.title', {
                important: (chunks) => <span className='underline'>{chunks}</span>
            })}>
                <>
                    <Content4Item alt={t('ourCommitment.items.item1.title')}
                                  imageMobile="https://contenuti.s3.amazonaws.com/about/mobile/offgrid.jpeg"
                                  imageDesktop="https://contenuti.s3.amazonaws.com/about/desktop/offgrid.jpeg"
                                  title={t(`ourCommitment.items.item1.title`)}>
                        {t(`ourCommitment.items.item1.content`)}
                    </Content4Item>
                    <Content4Item alt={t('ourCommitment.items.item2.title')}
                                  imageMobile="https://contenuti.s3.amazonaws.com/about/mobile/pannelli.jpeg"
                                  imageDesktop="https://contenuti.s3.amazonaws.com/about/desktop/pannelli.jpeg"
                                  title={t(`ourCommitment.items.item2.title`)}>
                        {t(`ourCommitment.items.item2.content`)}
                    </Content4Item>
                    <Content4Item alt={t('ourCommitment.items.item3.title')}
                                  imageMobile="https://contenuti.s3.amazonaws.com/about/mobile/quantum.jpeg"
                                  imageDesktop="https://contenuti.s3.amazonaws.com/about/desktop/quantum.jpeg"
                                  title={t(`ourCommitment.items.item3.title`)}>
                        {t(`ourCommitment.items.item3.content`)}
                    </Content4Item>
                </>
            </Content4>
            <Features8 isPt0={true} title={t.rich(`features.title`, {
                important: (chunks) => <span
                    className="underline">{chunks}</span>
            })} subtitle={t(`features.subtitle`)} tip={t(`features.tip`)}>
                <>
                    <Features8Item image={<TempIcon fill="#ffffff"/>} title={t(`features.items.1.title`)}
                                   value="-30%"></Features8Item>
                    <Features8Item image={<DropIcon fill="#ffffff"/>} title={t(`features.items.2.title`)}
                                   value="-45%"></Features8Item>
                    <Features8Item image={<EnergyIcon fill="#ffffff"/>} title={t(`features.items.3.title`)}
                                   value="100%"></Features8Item>
                    <Features8Item image={<StumpIcon fill="#ffffff"/>} title={t(`features.items.4.title`)}
                                   value="96%"></Features8Item>
                    <Features8Item image={<MarmeladeIcon fill="#ffffff"/>} title={t(`features.items.5.title`)}
                                   value="100%"></Features8Item>
                    <Features8Item image={<RoadIcon fill="#ffffff" width="20"/>} title={t(`features.items.6.title`)}
                                   value="0%"></Features8Item>
                </>
            </Features8>
            <Cta4>
                <>
                    <Cta4BackgroundUnit link='/contact' image="/images/collabora-con-friland.jpg"
                                        buttonLabel={advTranslator('collaborate.label')}
                                        text={advTranslator('collaborate.title')}/>
                    <Cta4BackgroundUnit link='/partners' image="/images/diventa-nostro-partner.jpg"
                                        buttonLabel={advTranslator('partners.label')}
                                        text={advTranslator('partners.title')}/>
                </>
            </Cta4>
        </>
    );
};

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AboutUs');
    const url = headers().get('x-url');

    return {
        title: t('_meta.title'),
        description: t('_meta.description'),
        openGraph: {
            title: t('_meta.title'),
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }
}

