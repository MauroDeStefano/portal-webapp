import {Metadata, Viewport} from "next";

export const metadata: Metadata = {
    applicationName: 'Fri.Land',
    referrer: 'origin-when-cross-origin',

    title: {
        template: '%s',
        default: 'Friland',
    },

    openGraph: {
        title: 'Friland',
    },


    //icons: {
    //    apple: [
    //        {url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
    //        {url: '/apple-touch-icon-152x152', sizes: '152x152', type: 'image/png'},
    //        {url: '/apple-touch-icon-120x120', sizes: '120x120', type: 'image/png'},
    //        {url: '/apple-touch-icon-76x76', sizes: '76x76', type: 'image/png'},
    //        {url: '/apple-touch-icon-60x60', sizes: '60x60', type: 'image/png'},
    //    ],
    // },

    // verification: {
    //     google: 'google',
    // },
}

export const viewport: Viewport = {
    themeColor: 'white',
    width: 'device-width',
    initialScale: 1,
}