import type {MetadataRoute} from 'next'

const host = process.env.SITE_DOMAIN
const disallowIndexing = process.env.DISALLOW_INDEXING
export default function robots(): MetadataRoute.Robots {

    let robotsConfig: MetadataRoute.Robots = { rules: [] };

    if (disallowIndexing == 'true') {
        robotsConfig = {
            rules: [
                {
                    userAgent: '*',
                    disallow: ['/']
                }
            ]
        }
    } else {
        robotsConfig = {
            rules: [
                {
                    userAgent: '*',
                    allow: ['/'],
                    disallow: ['/*/account/','/*/destinations/', '/*/regions/*/']
                },
            ],
            sitemap: `${host}/sitemap.xml`
        }
    }
    return robotsConfig
}