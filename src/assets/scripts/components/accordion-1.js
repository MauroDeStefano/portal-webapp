document.addEventListener("DOMContentLoaded", function () {
    const accordionElements = document.querySelectorAll('.accordion-1');

    for (const accordion of accordionElements) {
        const button = accordion.querySelector('.accordion-1__button');
        const content = accordion.querySelector('.accordion-1__content-wrapper');

        button.addEventListener('click', function () {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            content.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
        })
    }
});
