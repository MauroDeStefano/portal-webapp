'use client';

import React from "react";
import {Link} from "@i18n/config";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react'
import {useTranslations} from "next-intl";

import {NextButton, PrevButton} from "@/app/components/buttons/PrevNextButtons";
import {usePrevNextButtons} from "@/app/components/carousel/ArrowButtons";
import {DotButton, useDotButton} from "@/app/components/carousel/DotButtons";
import ImageBundle from "@/app/components/ImageBundle";
import {locationSlug} from "@/app/utils/locationSlug";
import {TBestLocation} from "@/types/bestLocation";


type Props = {
    slides: TBestLocation[]
};

function Slide(props: TBestLocation) {

    return (
        <article className="location-carousel__carousel-slide embla__slide">
            <Link className="location-carousel__carousel-slide-link" href={{
                pathname: '/destination/[slug]',
                params: {slug: locationSlug(props.id, props.title)}
            }}/>
            <ImageBundle className="location-carousel__carousel-image" srcDesktop={props.imgDesktop}
                         srcMobile={props.imgMobile} alt={props.label}/>

            <div className="location-carousel__carousel-copy">
                <h3 className="location-carousel__carousel-location-name text--13">{props.label}</h3>
                <h4 className="location-carousel__carousel-title display--36">{props.description}</h4>
            </div>
        </article>
    )
}

export default function SectionWithCarousel({slides}: Props) {

    const t = useTranslations('BestDestinations');

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
    }, [
        Autoplay({delay: 4000})
    ])

    const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    if (emblaApi) {
        // @ts-ignore
        emblaApi.on('select', () => emblaApi.plugins().autoplay.reset());
    }

    return (
        <section className="location-carousel">
            <img
                className="location-carousel__background-image"
                src="/images/topography-background-vertical.svg"
            />

            <div className="location-carousel__copy-unit">
                <div className="location-carousel__copy-unit-container fl-container">
                    <div className="location-carousel__copy-wrapper">
                        <h2 className="location-carousel__copy-subtitle text--13">{t('title')}</h2>
                        <h3 className="location-carousel__copy-title display--54">
                            {t.rich('subtitle', {important: (chunks) => <span className="underline">{chunks}</span>})}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="location-carousel__carousel-unit">
                <div className="location-carousel__carousel-unit-container fl-container">
                    <div className="location-carousel__carousel">
                        <div className="location-carousel__carousel-viewport embla" ref={emblaRef}>
                            <div className="location-carousel__carousel-container embla__container">
                                {slides.map((slide: TBestLocation) => <Slide key={slide.id} {...slide}/>)}
                            </div>
                        </div>

                        <div className="location-carousel__carousel-dots-wrapper">
                            <div className="location-carousel__carousel-dots embla__dots">
                                {scrollSnaps.map((_, index) => (
                                    <DotButton
                                        key={index}
                                        onClick={() => onDotButtonClick(index)}
                                        className={'embla__dot'.concat(
                                            index === selectedIndex ? ' embla__dot--selected' : ''
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <div
                            className="location-carousel__carousel-button location-carousel__carousel-button--prev">
                            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                        </div>

                        <div
                            className="location-carousel__carousel-button location-carousel__carousel-button--next">
                            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}