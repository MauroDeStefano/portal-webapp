import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import {
    addPrevNextBtnsClickHandlers,
    addDotBtnsAndClickHandlers,
    addKeyboardNavigation
} from '../modules/embla-utils.js';

document.addEventListener("DOMContentLoaded", function () {
    const instances = document.querySelectorAll('.testimonials-1');

    for (const instance of instances) {
        const emblaNode = instance.querySelector('.testimonials-1__carousel-viewport');
        const dotsNode = instance.querySelector('.testimonials-1__carousel-dots');
        const prevBtn = instance.querySelector('.testimonials-1__carousel-button--prev');
        const nextBtn = instance.querySelector('.testimonials-1__carousel-button--next');

        const options = { loop: true };
        const plugins = [Autoplay({ delay: 4000 })];
        const emblaApi = EmblaCarousel(emblaNode, options, plugins);

        emblaApi.on('select', () => emblaApi.plugins().autoplay.reset());

        const removeKeyboardNavigation = addKeyboardNavigation(emblaApi);
        const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);
        const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn);

        emblaApi
            .on('destroy', removeDotBtnsAndClickHandlers)
            .on('destroy', removeKeyboardNavigation)
            .on('destroy', removePrevNextBtnsClickHandlers);
    }
});
