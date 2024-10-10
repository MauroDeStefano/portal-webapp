'use client';

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react'

import {NextButton, PrevButton} from "@/app/components/buttons/PrevNextButtons";
import {usePrevNextButtons} from "@/app/components/carousel/ArrowButtons";
import {DotButton, useDotButton} from "@/app/components/carousel/DotButtons";
import {Image} from "@/types";


export interface Carousel2Props {
    items: Carousel2ItemProps[]
    showDots?: boolean
    showButtons?: boolean
}

export interface Carousel2ItemProps {
    image: Image
}

function Carousel2Item({image}: Carousel2ItemProps) {
    return (
        <div className="gallery-2__carousel-slide embla__slide">
            <img className="gallery-2__carousel-image"
                 src={image.src}
                 width={image.width}
                 height={image.height}
                 alt={image?.alt}
            />
        </div>
    );
}

export default function Carousel2({items, showDots = false, showButtons = false}: Carousel2Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
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
        <div className="gallery-2">
            <div className="gallery-2__carousel-viewport embla" ref={emblaRef}>
                <div className="gallery-2__carousel-container embla__container">
                    {items.map((item, index) => <Carousel2Item
                        key={index}
                        {...item}/>
                    )}
                </div>
            </div>

            {showDots && (
                <div className="gallery-2__carousel-dots-wrapper">
                    <div className="gallery-2__carousel-dots embla__dots">
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
            )}

            {showButtons && (
                <>
                    <div className="gallery-2__carousel-button gallery-2__carousel-button--prev">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                    </div>

                    <div className="gallery-2__carousel-button gallery-2__carousel-button--next">
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                    </div>
                </>
            )}
        </div>
    );
};