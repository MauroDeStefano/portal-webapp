'use client'

import React from "react";
import {autop} from "@wordpress/autop";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react'

import {NextButton, PrevButton} from "@/app/components/buttons/PrevNextButtons";
import {usePrevNextButtons} from "@/app/components/carousel/ArrowButtons";
import {DotButton, useDotButton} from "@/app/components/carousel/DotButtons";

function Testimonial(props: TestimonialProp) {
    return (
        <article className="testimonial-1__carousel-slide embla__slide">
            <blockquote className="testimonials-1__review-quote">
                <div className="testimonials-1__review-text">
                    <p>
                        {props.content}
                    </p>
                </div>

                <cite className="testimonials-1__review-author text--18">
                    {props.author}
                </cite>
            </blockquote>
        </article>
    )
}

type Props = {
    img?: string,
    title?: any,
    subtitle?: string
};

type TestimonialProp = {
    content?: React.ReactNode,
    author?: string
}

type TestimonialProps = {
    slides?: TestimonialProp[],
    title?: string
    subtitle?: string,
    backgroundImg?: string
};


export default function Testimonials({slides, ...props}: TestimonialProps) {
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
        <section className="testimonials-1" data-aos="fade-up">
            <img
                className="testimonials-1__background-image"
                src={props?.backgroundImg || '/images/topography-background-horizontal.svg'}
            />

            <div className="testimonials-1__copy-unit">
                <div className="testimonials-1__copy-container fl-container">
                    <div className="testimonials-1__copy-wrapper">
                        <h2 className="testimonials-1__copy-title display--34"
                            dangerouslySetInnerHTML={{__html: autop(props?.title || '')}}/>

                        <h3 className="testimonials-1__copy-subtitle text--18">
                            {props.subtitle}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="testimonials-1__reviews-unit">
                <div className="testimonials-1__reviews-container">
                    <div className="testimonials-1__carousel">
                        <div className="testimonials-1__carousel-viewport embla" ref={emblaRef}>
                            <div className="testimonial-1__carousel-container embla__container">
                                {slides?.map((slide: TestimonialProp, index) => <Testimonial key={index} {...slide}/>)}
                            </div>
                        </div>

                        <div className="testimonials-1__carousel-dots embla__dots">
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

                    <div className="testimonials-1__carousel-button testimonials-1__carousel-button--prev">
                        <div className="icon-button-vertical">
                            <div className="icon-button-vertical__icon">
                                <div className="icon-button-vertical__circle"></div>
                                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                            </div>
                        </div>
                    </div>

                    <div className="testimonials-1__carousel-button testimonials-1__carousel-button--next">
                        <div className="icon-button-vertical">
                            <div className="icon-button-vertical__icon">
                                <div className="icon-button-vertical__circle"></div>
                                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};