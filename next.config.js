const {join} = require("node:path");

const createNextIntlPlugin = require('next-intl/plugin');

const cspHeader = `
    default-src 'self'  https://*.iubenda.com https://*.hcaptcha.com https://*.facebook.net https://*.facebook.com https://*.apple.com https://*.google.com https://stats.g.doubleclick.net https://region1.analytics.google.com https://*.stripe.com https://*.friland.it https://*.zdassets.com https://*.zendesk.com wss://*.zendesk.com https://*.google-analytics.com https://*.hotjar.com;
    script-src 'self' https://*.iubenda.com https://*.stripe.com https://*.hcaptcha.com https://*.zdassets.com https://*.zendesk.com https://www.googletagmanager.com https://*.facebook.net 'unsafe-eval' 'unsafe-inline' https://*.hotjar.com;
    style-src 'self' https://*.googleapis.com 'unsafe-inline';
    img-src * data:;
    font-src 'self' https://*.googleapis.com https://*.gstatic.com;
    upgrade-insecure-requests;
`

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mep-agency/next-iubenda'],
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // exclude if *.svg?url
                // use: ['@svgr/webpack'],

                use: {
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            // disable a default plugin
                                            removeViewBox: false,
                                            mergePaths: false,
                                            cleanupAttrs: true,
                                            removeDoctype: true,
                                            removeComments: true,
                                            removeEditorsNSData: true,

                                            // customize the params of a default plugin
                                            inlineStyles: {
                                                onlyMatchedOnce: false,
                                            },
                                        },
                                    },
                                },
                            ]
                        }
                    }
                }
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },

    compiler: {
        styledComponents: true,
        removeConsole: process.env.NODE_ENV === "production" ? {exclude: ["error"]} : false,
    },

    sassOptions: {
        includePaths: [join(__dirname, 'src/assets/styles')],
    },

    output: "standalone",

    headers: async () => {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    }
                ],
            },
        ]

    },

    redirects: async () => {
        return [
            {
                source: '/en/legal/privacy',
                destination: 'https://www.iubenda.com/privacy-policy/36998847',
                permanent: false,
                basePath: false,
            },

            {
                source: '/it/legal/termini',
                destination: 'https://www.iubenda.com/privacy-policy/36998847',
                permanent: false,
                basePath: false,
            },
            {
                source: '/contatti',
                destination: 'https://fri.land/it/contatto',
                permanent: true,
            },
            {
                source: '/domande-frequenti',
                destination: 'https://fri.land/it/faq',
                permanent: true,
            },
            {
                source: '/le-destinazioni',
                destination: 'https://fri.land/it/destinazioni',
                permanent: true,
            },
            {
                source: '/come-funziona',
                destination: 'https://fri.land/it/chi-siamo',
                permanent: true,
            },
            {
                source: '/le-destinazioni',
                destination: 'https://fri.land/it/destinazioni',
                permanent: true,
            },
            {
                source: '/le-destinazioni/molina',
                destination: 'https://fri.land/it/destinazione/39-molina',
                permanent: true,
            },
            {
                source: '/come-funziona',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/le-destinazioni/val-saisera2',
                destination: 'https://fri.land/it/destinazione/32-saisera',
                permanent: true,
            },
            {
                source: '/le-destinazioni/saisera',
                destination: 'https://fri.land/it/destinazione/32-saisera',
                permanent: true,
            },
            {
                source: '/la-stanza',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/diventa-partner',
                destination: 'https://fri.land/it/partner',
                permanent: true,
            },
            {
                source: '/le-destinazioni/arta-terme',
                destination: 'https://fri.land/it/destinazione/13-plan-di-coces',
                permanent: true,
            },
            {
                source: '/le-destinazioni/tribil',
                destination: 'https://fri.land/it/destinazione/16-tribil',
                permanent: true,
            },
            {
                source: '/le-destinazioni/porpetto',
                destination: 'https://fri.land/it/destinazione/1-porpetto',
                permanent: true,
            },
            {
                source: '/guida/porpetto',
                destination: 'https://fri.land/it/giornale/articolo/11-le-risorgive-di-porpetto-guida-alle-escursioni-e-agli-itinerari',
                permanent: true,
            },
            {
                source: '/le-destinazioni/gosaldo',
                destination: 'https://fri.land/it/destinazione/36-gosaldo',
                permanent: true,
            },
            {
                source: '/le-destinazioni/liona',
                destination: 'https://fri.land/it/destinazione/29-liona',
                permanent: true,
            },
            {
                source: '/il-progetto',
                destination: 'https://fri.land/it/chi-siamo',
                permanent: true,
            },
            {
                source: '/le-destinazioni/joanaz',
                destination: 'https://fri.land/it/destinazione/35-joanaz',
                permanent: true,
            },
            {
                source: '/le-destinazioni/sauris',
                destination: 'https://fri.land/it/destinazione/33-sauris',
                permanent: true,
            },
            {
                source: '/le-destinazioni/cuel',
                destination: 'https://fri.land/it/destinazione/41-cuel',
                permanent: true,
            },
            {
                source: '/le-destinazioni/faldo',
                destination: 'https://fri.land/it/destinazione/40-faldo',
                permanent: true,
            },
            {
                source: '/le-destinazioni/altopiano-di-monte-prat',
                destination: 'https://fri.land/it/destinazione/24-mont-di-prat',
                permanent: true,
            },
            {
                source: '/gift-card',
                destination: 'https://fri.land/it/carte-regalo',
                permanent: true,
            },
            {
                source: '/le-destinazioni/arzino',
                destination: 'https://fri.land/it/destinazione/14-val-darzino',
                permanent: true,
            },
            {
                source: '/le-destinazioni/oltrepo',
                destination: 'https://fri.land/it/destinazione/38-oltrepo',
                permanent: true,
            },
            {
                source: '/le-destinazioni/faldo',
                destination: 'https://fri.land/it/destinazione/40-faldo',
                permanent: true,
            },
            {
                source: '/le-destinazioni/bonis',
                destination: 'https://fri.land/it/destinazione/34-bonis',
                permanent: true,
            },
            {
                source: '/guida/in-costruzione',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/guida/zoncolan',
                destination: 'https://fri.land/it/giornale/articolo/3-zoncolan-avventure-outdoor-e-panorami-incredibili-nella-natura',
                permanent: true,
            },
            {
                source: '/guida/sile',
                destination: 'https://fri.land/it/giornale/articolo/7-scopri-il-parco-regionale-del-fiume-sile',
                permanent: true,
            },
            {
                source: '/guida/joanaz',
                destination: 'https://fri.land/it/giornale/articolo/19-monte-joanaz-scopri-la-bellezza-delle-prealpi-giulie',
                permanent: true,
            },
            {
                source: '/guida/campodibonis',
                destination: 'https://12255481326884321-content-friland.s3.eu-north-1.amazonaws.com/guida_destinazione/CampoDIBonis.pdf',
                permanent: true,
            },
            {
                source: '/guida/porzus',
                destination: 'https://fri.land/it/giornale/articolo/10-esplora-porzus-guida-completa-alle-attrazioni-storiche-e-naturali',
                permanent: true,
            },
            {
                source: '/guida/marano-lagunare',
                destination: 'https://fri.land/it/giornale/articolo/17-marano-lagunare-itinerari-e-percorsi-nella-laguna-friulana',
                permanent: true,
            },
            {
                source: '/le-destinazioni/barcis',
                destination: 'https://fri.land/it/destinazione/6-barcis',
                permanent: true,
            },
            {
                source: '/guida/sauris',
                destination: 'https://fri.land/it/giornale/articolo/9-sauris-nelle-alpi-carniche-percorsi-nella-natura',
                permanent: true,
            },
            {
                source: '/guida/piandispagna',
                destination: 'https://fri.land/it/giornale/articolo/13-pian-di-spagna-escursioni-e-biodiversita-nella-natura-lombarda',
                permanent: true,
            },
            {
                source: '/guida/savorgnano',
                destination: 'https://fri.land/it/giornale/articolo/8-savorgnano-un-viaggio-tra-storia-e-natura',
                permanent: true,
            },
            {
                source: '/guida/oltrepo',
                destination: 'https://fri.land/it/giornale/articolo/14-cosa-puoi-fare-a-oltrepo',
                permanent: true,
            },
            {
                source: '/guida/fusine',
                destination: 'https://fri.land/it/giornale/articolo/21-fusine-un-viaggio-tra-laghi-incantati-e-montagne-maestose',
                permanent: true,
            },
            {
                source: '/guida/cuar-guida',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/guida/monteprat',
                destination: 'https://fri.land/it/giornale/articolo/15-cosa-puoi-fare-sull%E2%80%99altopiano-di-mont-prat',
                permanent: true,
            },
            {
                source: '/prenota',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/guida/val-saisera',
                destination: 'https://fri.land/it/giornale/articolo/4-scopri-la-val-saisera-percorsi-escursioni-e-cultura-gastronomica-benvenuti-nella-val-saisera-un-gioiello-nascosto-incastonato-tra-le-maestose-vette-delle-alpi-giulie-dove-il-tempo-si-dilata-e-la-natura-regna-sovrana',
                permanent: true,
            },
            {
                source: '/guida/gosaldo',
                destination: 'https://fri.land/it/giornale/articolo/20-alla-scoperta-di-gosaldo-e-delle-dolomiti-bellunesi',
                permanent: true,
            },
            {
                source: '/guida/liona-2',
                destination: 'https://fri.land/it/giornale/articolo/18-scopri-la-val-liona-nei-colli-berici',
                permanent: true,
            },
            {
                source: '/guide',
                destination: 'https://fri.land/it/giornale/2-territorio',
                permanent: true,
            },
            {
                source: '/guida/arzino',
                destination: 'https://fri.land/it/giornale/articolo/5-guida-alla-val-d%E2%80%99arzino-natura-escursioni-e-relax',
                permanent: true,
            },
            {
                source: '/homepage-2',
                destination: 'https://fri.land/it',
                permanent: true,
            },
            {
                source: '/guida/saisera',
                destination: 'https://fri.land/it/giornale/articolo/4-scopri-la-val-saisera-percorsi-escursioni-e-cultura-gastronomica-benvenuti-nella-val-saisera-un-gioiello-nascosto-incastonato-tra-le-maestose-vette-delle-alpi-giulie-dove-il-tempo-si-dilata-e-la-natura-regna-sovrana',
                permanent: true,
            },
            {
                source: '/prova-widget-generico',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/thank-you-page',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/prova-del-nuovo-chat-box',
                destination: 'https://fri.land/it/404',
                permanent: true,
            },
            {
                source: '/guida/barcis',
                destination: 'https://fri.land/it/giornale/articolo/25-barcis-e-le-dolomiti-friulane-scopri-il-territorio-e-le-escursioni',
                permanent: true,
            },
            {
                source: '/le-destinazioni/pura',
                destination: 'https://fri.land/it/destinazione/42-pura',
                permanent: true,
            },
            {
                source: '/guida/plandicoces',
                destination: 'https://fri.land/it/giornale/articolo/12-plan-di-coces-natura-terme-e-sapori-locali',
                permanent: true,
            },
            {
                source: '/guida/tribil',
                destination: 'https://fri.land/it/giornale/articolo/6-valli-del-natisone-tribil-cascate-kot-e-villaggio-di-topolo',
                permanent: true,
            },
            {
                source: '/le-destinazioni/sauris-e-la-fabbrica-di-mirtilli',
                destination: 'https://fri.land/it/destinazione/33-sauris',
                permanent: true,
            },
            {
                source: '/le-destinazioni/piana-di-campo-di-bonis',
                destination: 'https://fri.land/it/destinazione/34-bonis',
                permanent: true,
            },
        ];
    },

    async rewrites() {
        return [
            {
                source: '/api/v1/startup-integration/:path*',
                destination: `https://app.friland.it/v1/startup-integration/:path*`,
            },
        ]
    },
};

module.exports = createNextIntlPlugin()(nextConfig);
