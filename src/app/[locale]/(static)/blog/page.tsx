import { Metadata } from "next";
import BackGroundDecorator2 from "@/app/components/Decorators/BackGroundDecorator2";
import PageHeader4 from "@/app/layout/subheader/PageHeader4";
import Cta9 from "@/app/sections/CTA9";
import { getBlogTags } from "@/app/utils/xhr/api-calls/mocks/getBlogTags";
import CategoryList1 from "@/app/sections/CategoryList1";
import { getBlogPosts } from "@/app/utils/xhr/api-calls/mocks/getBlogPosts";
import ArticleList1 from "@/app/sections/ArticleList1";
import { getBestLocations } from "@/app/utils/xhr/api-calls/getBestLocations";
import DestinationList1 from "@/app/sections/DestinationList1";
import { getBlogContent, getPostsByTag } from "@/app/utils/xhr/api-calls/getBlogData";
import { getTags } from "@/app/utils/xhr/api-calls/getBlogData";

import Cta10 from "@/app/sections/CTA10";
import { getTranslations } from "next-intl/server";
import { usePathname } from "@i18n/config";
import { headers } from "next/headers";
import { getMostClickedLocations } from "@/app/utils/xhr/api-calls/getMostClickedLocations";

type Props = {
    "params": {
        "locale": string,
        "slug": string[]
    },
    "searchParams": {}
};


export default async function BlogPage(props: Props) {
    const [
        blogPage,
        blogTags,
        blogPosts,
        mostClickedDestinations
    ] = await Promise.all([
        getBlogContent(props.params.locale),
        getTags(props.params.locale),
        getPostsByTag(props.params.locale, 0),
        getMostClickedLocations()
    ]);
    return (
        <>
            <BackGroundDecorator2 hasImage={true}>
                <PageHeader4></PageHeader4>
                <Cta9 data={blogPage.post_highlight} />
            </BackGroundDecorator2>
            <CategoryList1 isBt0={true} data={blogTags} />
            <ArticleList1 data={blogPosts} pagination={false} />
            <DestinationList1 data={mostClickedDestinations} />
            {/* <Cta10 data={blogPage.picture_of_the_month} /> */}
        </>
    )
}



export async function generateMetadata(props: Props): Promise<Metadata> {
    const blogPage = await getBlogContent(props.params.locale);
    const url = headers().get('x-url');

    return {
        title: blogPage._meta?.title,
        description: blogPage._meta?.title,
        openGraph: {
            title: blogPage._meta?.description,
        },
        alternates: {
            canonical: url
        },

    }
}