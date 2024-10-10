document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.location-booking__book');
    const title = document.querySelector('.location-booking__title');

    if (!button) {
        return;
    }

    function updateButtonPosition() {
        const titleRect = title.getBoundingClientRect();
        const breakpoint = titleRect.top + window.scrollY + title.offsetHeight - button.offsetHeight - 45;

        console.log(breakpoint);

        if (window.scrollY >= breakpoint) {
            button.style.position = 'fixed';
            button.style.top = '45px';
        } else {
            button.style.position = '';
            button.style.top = '';
        }
    }

    updateButtonPosition();
    window.addEventListener('scroll', updateButtonPosition);
});
