import {createLocalizedPathnamesNavigation, Pathnames} from 'next-intl/navigation';

export const localePrefix = 'always';

const localesWithLabels = {
    it: {
        label: 'Italiano',
        short: 'It',
        key: 'it',
    },
    en: {
        label: 'English',
        short: 'En',
        key: 'en',
    },
    de: {
        label: 'Deutsch',
        short: 'De',
        key: 'de'
    }


};

const locales = Object.keys(localesWithLabels);
const defaultLocale = locales[0];

// https://next-intl-docs.vercel.app/docs/routing/middleware#localizing-pathnames
const pathnames = {
    '/': {
        it: '/',
        en: '/',
        de: '/'
    },
    '/destinations': {
        it: '/destinazioni',
        en: '/destinations',
        de: '/reiseziele'
    },

    '/regions/[...slug]': {
        it: '/regioni/[...slug]',
        en: '/regions/[...slug]',
        de: '/regionen/[...slug]'
    },
    '/regions': {
        it: '/regioni',
        en: '/regioni',
        de: '/regionen'
    },

    '/destinations/[...slug]': {
        it: '/destinazioni/[...slug]',
        en: '/destinations/[...slug]',
        de: '/reiseziele/[...slug]'
    },

    '/destination/[slug]': {
        it: '/destinazione/[slug]',
        en: '/destination/[slug]',
        de: '/reiseziel/[slug]'
    },

    '/gift-card': {
        it: '/carte-regalo',
        en: '/gift-cards',
        de: '/geschenkkarte'
    },

    '/blog': {
        it: '/giornale',
        en: '/blog',
        de: '/zeitung'
    },

    '/blog/[slug]': {
        it: '/giornale/[slug]',
        en: '/blog/[slug]',
        de: '/zeitung/[slug]'
    },

    '/blog/article/[slug]': {
        it: '/giornale/articolo/[slug]',
        en: '/blog/article/[slug]',
        de: '/zeitung/artikel/[slug]'
    },

    '/login': {
        it: '/login',
        en: '/login',
        de: '/anmeldung'
    },

    // '/account': {
    //     it: '/account',
    //     en: '/account',
    //     de: ''
    // },

    '/account/my-bookings': {
        it: '/account/le-mie-prenotazioni',
        en: '/account/my-bookings',
        de: '/konto/meine-buchungen'
    },

    '/account/my-gift-cards': {
        it: '/account/le-mie-gift-cards',
        en: '/account/my-gift-cards',
        de: '/konto/meine-geschenkkarten'
    },

    '/account/my-profile': {
        it: '/account/il-mio-profilo',
        en: '/account/my-profile',
        de: '/konto/mein-profil'
    },

    '/faq': {
        it: '/faq',
        en: '/faq',
        de: '/faq'
    },

    '/contact': {
        it: '/contatto',
        en: '/contact',
        de: '/kontakt'
    },

    '/about': {
        it: '/chi-siamo',
        en: '/about',
        de: '/uber-uns'
    },

    '/partners': {
        it: '/partner',
        en: '/partners',
        de: '/partner'
    },


    '/companies-services': {
        it: '/servizi-per-aziende',
        en: '/companies-services',
        de: '/dienstleistungen-fur-unternehmen'
    },

    '/privacy': { // if you need localized & local paths, edit next.config.js and set the redirect rules there
        it: 'https://www.iubenda.com/privacy-policy/36998847',
        en: 'https://www.iubenda.com/privacy-policy/36998847',
        de: 'https://www.iubenda.com/privacy-policy/36998847'
    },

    '/cookie': {
        it: 'https://www.iubenda.com/privacy-policy/38320557cookie-policy',
        en: 'https://www.iubenda.com/privacy-policy/38320557cookie-policy',
        de: 'https://www.iubenda.com/privacy-policy/38320557cookie-policy'
    },

    '/terms-of-use': {
        it: 'https://www.iubenda.com/privacy-policy/36998847',
        en: 'https://www.iubenda.com/privacy-policy/36998847',
        de: 'https://www.iubenda.com/privacy-policy/36998847'
    },

    '/refund': {
        it: '/rimborso',
        en: '/refund',
        de: '/ruckerstattung'
    },

    '/create-password': {
        it: '/crea-nuova-password',
        en: '/create-password',
        de: '/neues-passwort-erstellen'
    },

    '/order': {
        it: '/order',
        en: '/order',
        de: '/order'
    },

    '/order/confirmation': {
        it: '/order/confirmation',
        en: '/order/confirmation',
        de: '/order/confirmation'
    }
} satisfies Pathnames<typeof locales>;

export type VALID_INNER_ROUTES = keyof typeof pathnames;

export const {
    Link,
    redirect,
    usePathname,
    useRouter,
    getPathname
} = createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});


/**
 * this is used ONLY for forms or other API calls. For links, use the Link component
 *
 * @param href
 * @param locale
 */
export const getPathNameWithPrefix = ({href, locale}: {
    href: string,
    locale: string
}) => {
    // @ts-ignore
    const path = getPathname({href, locale});
    return `/${locale}${path}`;
}

export {defaultLocale, pathnames, locales, localesWithLabels}

