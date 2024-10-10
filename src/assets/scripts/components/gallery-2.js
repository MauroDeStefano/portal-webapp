import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import {
    addDotBtnsAndClickHandlers,
    addKeyboardNavigation
} from '../modules/embla-utils.js';

document.addEventListener("DOMContentLoaded", init);

function init() {
    const carousels = document.querySelectorAll('.gallery-2');
    carousels.forEach(initInstance);
}

function initInstance(element) {
    let carousel = null;

    const handleResponsive = () => {
        const shouldDisplayCarousel = shouldShowCarousel(element);

        if (shouldDisplayCarousel && !carousel) {
            carousel = initCarousel(element);
        } else if (!shouldDisplayCarousel && carousel) {
            carousel.destroy();
            carousel = null;
        }
    };

    handleResponsive();
    window.addEventListener('resize', handleResponsive);
}

function shouldShowCarousel(element) {
    return window.getComputedStyle(element).getPropertyValue('content') !== '"embla-destroy"';
}

function initCarousel(element) {
    const emblaNode = element.querySelector('.gallery-2__carousel-viewport');
    const dotsNode = element.querySelector('.gallery-2__carousel-dots');

    const options = { loop: true };
    const plugins = [Autoplay({ delay: 4000 })];
    const emblaApi = EmblaCarousel(emblaNode, options, plugins);

    emblaApi.on('select', () => emblaApi.plugins().autoplay.reset());

    const removeKeyboardNavigation = addKeyboardNavigation(emblaApi);
    const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);

    emblaApi
        .on('destroy', removeDotBtnsAndClickHandlers)
        .on('destroy', removeKeyboardNavigation);

    return emblaApi;
}
