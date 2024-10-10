
import {Metadata} from "next";
import {idFromParamsSlug, slugFromParamsSlug, slugify} from "@/app/utils/slugify";
import {getTranslations} from "next-intl/server";
import BackGroundDecorator2 from "@/app/components/Decorators/BackGroundDecorator2";
import {SubHeader2} from "@/app/components/SubHeader";
import CategoryList1 from "@/app/sections/CategoryList1";
import {getBlogPosts} from "@/app/utils/xhr/api-calls/mocks/getBlogPosts";
import ArticleList1 from "@/app/sections/ArticleList1";
import {getBestLocations} from "@/app/utils/xhr/api-calls/getBestLocations";
import {getBlogPage} from "@/app/utils/xhr/api-calls/mocks/getBlogPage";
import DestinationList1 from "@/app/sections/DestinationList1";
import Cta10 from "@/app/sections/CTA10";
import {TBlogTag} from "@/types/blog";
import {getBlogContent, getPostsByTag, getTags} from "@/app/utils/xhr/api-calls/getBlogData";
import {getMostClickedLocations} from "@/app/utils/xhr/api-calls/getMostClickedLocations";
import {slug} from "@/app/utils/locationSlug";
import {notFound} from "next/navigation";
import {headers} from "next/headers";

type Props = {
    params: {
        locale: string,
        slug?: string[]
    },
    searchParams: {}
}
export default async function BlogPageTag (props: Props) {

    const currentTagId = idFromParamsSlug({slug: props?.params.slug});

    const [
        blogPage,
        blogTags,
        mostClickedDestinations
    ] = await Promise.all([
        getBlogContent(props.params.locale),
        getTags(props.params.locale),
        getMostClickedLocations(),
    ]);

    const getCurrentTag = (item:TBlogTag) => {
        return item.id == currentTagId;
    }
    const currentTag = blogTags.filter(getCurrentTag)[0];

    if (props.params.hasOwnProperty('slug')) {
        const tagSlug = slugFromParamsSlug(props.params);

        if (blogTags.filter(({title}) => slug(title) === tagSlug).length === 0) {
            return notFound();
        }
    }

    const blogPosts = await getPostsByTag(props.params.locale, currentTag.id);

    return (
        <>
            <BackGroundDecorator2 hasImage={false}>
                <SubHeader2 goBack="/blog"><span style={{textTransform:'uppercase'}}>{currentTag.title}</span></SubHeader2>
            </BackGroundDecorator2>
            <CategoryList1 isBt0={true} data={blogTags} />
            <ArticleList1 data={blogPosts} pagination={false}/>
            <DestinationList1 data={mostClickedDestinations} />
            {/* <Cta10 data={blogPage.picture_of_the_month} /> */}
        </>
    )
}


export async function generateMetadata(props: Props): Promise<Metadata> {
    const blogContent = await getBlogContent(props.params.locale);
    const url = headers().get('x-url');

    return {
        title: blogContent._meta?.title,
        description: blogContent._meta?.description,
        openGraph: {
            title: blogContent._meta?.title,
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }
}