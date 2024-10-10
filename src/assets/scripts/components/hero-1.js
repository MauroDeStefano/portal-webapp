document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.hero-1');

    for (const element of elements) {
        const button = element.querySelector('.hero-1__button');

        button.addEventListener('click', function () {
            window.scrollTo({
                top: element.offsetTop + element.offsetHeight,
                behavior: 'smooth'
            });
        })
    }
});
