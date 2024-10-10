'use client';
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react'

import {NextButton, PrevButton} from "@/app/components/buttons/PrevNextButtons";
import {usePrevNextButtons} from "@/app/components/carousel/ArrowButtons";
import {DotButton, useDotButton} from "@/app/components/carousel/DotButtons";
import ImageBundle from "@/app/components/ImageBundle";

interface SlideProps {
    url: string,
    urlMobile: string,
    alt: string,
    name: string,
}

type Props = {
    slides: SlideProps[]
};

function Slide(props: SlideProps) {
    return (
        <div className="gallery-1__carousel-slide embla__slide">
            <ImageBundle className="gallery-1__carousel-image" srcDesktop={props.url} srcMobile={props.urlMobile}
                         alt={props.alt}/>
        </div>
    );
}

export default function SlideshowHero({slides}: Props) {
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
        <div className="gallery-1">
            <div className="gallery-1__carousel-viewport embla" ref={emblaRef}>
                <div className="gallery-1__carousel-container embla__container">
                    {slides.map((slide: SlideProps) => <Slide key={slide.url} {...slide}/>)}
                </div>
            </div>

            <div className="gallery-1__carousel-dots-wrapper">
                <div className="gallery-1__carousel-dots embla__dots">
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

            <div className="gallery-1__carousel-button gallery-1__carousel-button--prev">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
            </div>

            <div className="gallery-1__carousel-button gallery-1__carousel-button--next">
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
            </div>
        </div>

    );
};