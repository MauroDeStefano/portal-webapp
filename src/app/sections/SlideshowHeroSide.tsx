'use client';
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react'

import {usePrevNextButtons} from "@/app/components/carousel/ArrowButtons";
import {DotButton, useDotButton} from "@/app/components/carousel/DotButtons";
import ImageBundle from "@/app/components/ImageBundle";

export interface SlideProps {
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
        <div className="composite-1__hero-slide embla__slide">
            <ImageBundle className="composite-1__hero-image" srcMobile={props?.urlMobile}
                         srcDesktop={props?.url} alt={props.alt} />
        </div>
    )
}

export default function SlideshowHeroSide({slides}: Props) {
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
        <div className="composite-1__hero-carousel">
            <div className="composite-1__hero-viewport embla" ref={emblaRef} tabIndex={0}>
                <div className="composite-1__hero-container embla__container">
                    {slides.map((slide: SlideProps) => <Slide key={slide.url} {...slide}/>)}
                </div>
            </div>

            <div className="composite-1__hero-dots-wrapper">
                <div className="composite-1__hero-dots embla__dots">
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
        </div>

    );
};