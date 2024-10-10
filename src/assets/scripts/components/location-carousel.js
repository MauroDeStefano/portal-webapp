import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import {
    addPrevNextBtnsClickHandlers,
    addDotBtnsAndClickHandlers,
    addKeyboardNavigation
} from '../modules/embla-utils.js';

document.addEventListener("DOMContentLoaded", function () {
    const instances = document.querySelectorAll('.location-carousel');

    for (const instance of instances) {
        const emblaNode = instance.querySelector('.location-carousel__carousel-viewport');
        const dotsNode = instance.querySelector('.location-carousel__carousel-dots');
        const prevBtn = instance.querySelector('.location-carousel__carousel-button--prev');
        const nextBtn = instance.querySelector('.location-carousel__carousel-button--next');

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
