document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.hero-2');

    for (const element of elements) {
        // Scroll button
        const button = element.querySelector('.hero-2__button');

        button.addEventListener('click', function () {
            window.scrollTo({
                top: element.offsetTop + element.offsetHeight,
                behavior: 'smooth'
            });
        })

        // Book button
        const book = element.querySelector('.hero-2__book');

        window.addEventListener('scroll', function () {
            if (window.scrollY >= 135) {
                book.style.position = 'fixed';
                book.style.top = '45px';
            } else {
                book.style.position = '';
                book.style.top = '';
            }
        });
    }
});
