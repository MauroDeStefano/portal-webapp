import {MetadataRoute} from 'next';

import {defaultLocale, getPathname, locales, pathnames} from '@/../locales/config';
import {locationSlug} from "@/app/utils/locationSlug";
import {getHousesInRegion, getRegions} from "@/app/utils/xhr/api";
import {Region, THouse} from "@/types";
import {getRegionsForSitemap} from "@/app/utils/xhr/api-calls/getRegions";
import {getPostsByTag} from "@/app/utils/xhr/api-calls/getBlogData";
import {TBlogPost, TBlogPostReduced} from "@/types/blog";

// Adapt this as necessary
const host = process.env.NEXT_PUBLIC_SITE_DOMAIN

const EXCLUDED_PATH = ['/login', '/account/my-bookings', '/account/my-gift-cards', '/account/my-profile','/privacy', '/cookie', '/terms-of-use', '/refund', '/create-password', '/order', '/order/confirmation', ];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const keys = Object.keys
    (pathnames) as Array<keyof typeof pathnames>;
    const allDestinations = await getHousesInRegion({region: 0, locale: 'en'});
    const allRegions = await getRegionsForSitemap();
    const allArticles: any[string] = [];
    allArticles['en'] = await getPostsByTag('en', 0);
    allArticles['de'] = await getPostsByTag('de', 0);
    allArticles['it'] = await getPostsByTag('it', 0);


    function getUrl(key: keyof typeof pathnames, locale: typeof locales[number], slug?: string | string[]) {
        // @ts-ignore
        const pathname = getPathname({href: {pathname: key, params: {slug: slug}}, locale});
        return `${host}/${locale}${pathname === '/' ? '' : pathname}`;
    }

    const destinationKeys = allDestinations.houses.map((destination: THouse) => (
        {
            url: getUrl('/destination/[slug]', defaultLocale, locationSlug(destination.id, destination.title)),
            lastModified: new Date(),
            alternates: {
                languages: Object.fromEntries(
                    locales.map((locale) => [locale, getUrl('/destination/[slug]', locale, locationSlug(destination.id, destination.title))])
                )
            }
        }))

    const regionKeys = allRegions.map((region: Region) => (
        {
            url: getUrl('/regions/[...slug]', defaultLocale, [locationSlug(region?.value || 0, region.label)]),
            lastModified: new Date(),
            alternates: {
                languages: Object.fromEntries(
                    locales.map((locale) => [locale, getUrl('/regions/[...slug]', locale, [locationSlug(region?.value || 0, region.label)])])
                )
            }
        }))

    const blogKeys = allArticles['it'].map((blogPost: TBlogPostReduced) => (
        {
            url: getUrl('/blog/article/[slug]', defaultLocale, locationSlug(blogPost?.id || 0, blogPost.title)),
            lastModified: new Date(),
            alternates: {
                languages: Object.fromEntries(
                    locales.map((locale) => {
                        const localizedArticle = allArticles[locale].filter((article:TBlogPostReduced) => {
                            if (article.id === blogPost.id) return true;
                            return false;
                        });
                        if (localizedArticle.length == 0) return ([locale, ''])
                        return (
                            [locale, getUrl('/blog/article/[slug]', locale, locationSlug(localizedArticle[0]?.id || 0, localizedArticle[0].title))]
                            )
                        }
                    )
                )
            }
        }))


    keys.splice(keys.indexOf('/destinations/[...slug]'), 1);
    keys.splice(keys.indexOf('/destination/[slug]'), 1);
    keys.splice(keys.indexOf('/regions/[...slug]'), 1);
    keys.splice(keys.indexOf('/blog/[slug]'), 1);
    keys.splice(keys.indexOf('/blog/article/[slug]'), 1);



    const staticKeys = keys.filter((key) => {
        if (EXCLUDED_PATH.includes(key)) {
            return false;
        }
        else return true;
    }).map((key) => (
        {
            url: getUrl(key, defaultLocale),
            lastModified: new Date(),
            alternates: {
                languages: Object.fromEntries(
                    locales.map((locale) => [locale, getUrl(key, locale)])
                )
            }
        }
    ));

    return staticKeys.concat(destinationKeys).concat(regionKeys).concat(blogKeys);
}