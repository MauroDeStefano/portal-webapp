document.addEventListener("DOMContentLoaded", function () {
    const accordionElements = document.querySelectorAll('.faq-1__accordion');

    for (const accordion of accordionElements) {
        const button = accordion.querySelector('.faq-1__accordion-button');
        const content = accordion.querySelector('.faq-1__accordion-content-container');

        button.addEventListener('click', function () {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
            content.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
        })
    }
});
