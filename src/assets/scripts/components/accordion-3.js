document.addEventListener("DOMContentLoaded", function () {
    const accordionElements = document.querySelectorAll('.accordion-3__item');
    for (const accordion of accordionElements) {
        const trigger = accordion.querySelector('[data-js="accordion-trigger"]');
        const content = accordion.querySelector('[data-js="accordion-content"]');

        trigger.addEventListener('click', function () {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            content.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
        })
    }
});
