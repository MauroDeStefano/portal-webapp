const ROUTES_WITH_CONTRAST = [
    '/create-password',
    '/account/my-profile',
    '/account/my-bookings',
    '/account/my-gift-cards',
    '/blog',
    '/blog/[slug]',
    '/blog/article/[slug]'

]

const ROUTES_WITHOUT_HERO = [
    '/destinations',
    '/destinations/[...slug]',
    '/destination/[slug]',
    '/contact',
    '/about',
    '/faq',
    '/gift-card'
];

const ROUTES_WITHOUT_HEADER_LOGO = [
    ...ROUTES_WITHOUT_HERO
]

const ROUTES_WITHOUT_HEADER_SEARCH = [
    '/destination/[slug]',
    '/contact',
    '/about',
    '/faq',
    '/gift-card',
    '/partners',
    '/companies-services',
    '/account',
    '/account/my-bookings',
    '/account/my-gift-cards',
    '/account/my-profile',
    '/blog',
    '/blog/[slug]',
    '/blog/article/[slug]',
    '/create-password',
    '/order',
    '/order/confirmation'
];

export {
    ROUTES_WITHOUT_HERO,
    ROUTES_WITHOUT_HEADER_LOGO,
    ROUTES_WITHOUT_HEADER_SEARCH,
    ROUTES_WITH_CONTRAST
}