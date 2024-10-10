import {Metadata} from "next";
import {idFromParamsSlug, slugFromParamsSlug} from "@/app/utils/slugify";
import {getTranslations} from "next-intl/server";
import {getBlogPost} from "@/app/utils/xhr/api-calls/mocks/getBlogPost";
import PageHeader4 from "@/app/layout/subheader/PageHeader4";
import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {ArrowBack} from "@/app/components/Icons";
import ArticleList1 from "@/app/sections/ArticleList1";
import {getBlogTags} from "@/app/utils/xhr/api-calls/mocks/getBlogTags";
import CategoryList1 from "@/app/sections/CategoryList1";
import {getBlogContent, getPostById, getTags} from "@/app/utils/xhr/api-calls/getBlogData";
import {autop} from "@wordpress/autop";
import {slug} from "@/app/utils/locationSlug"
import {notFound} from "next/navigation";
import {headers} from "next/headers";

type Props = {
    "params": {
        "locale": string,
        "slug": string[]
    },
    "searchParams": {}
};


export default async function BlogArticlePage(props: Props) {

    const articleId = idFromParamsSlug({slug: props?.params.slug});
    const [
        blogPost,
        blogTags
    ] = await Promise.all([
        getPostById(props?.params.locale, articleId),
        getTags(props?.params.locale)
    ]);
    const t = await getTranslations('Blog');

    if (props.params.hasOwnProperty('slug')) {
        const articleSlug = slugFromParamsSlug(props.params);

        if (slug(blogPost.title) !== articleSlug) {
            return notFound();
        }
    }

    return (
        <>
            <div className="single-journal-1">
                <PageHeader4/>
                <div className="single-journal-1__header">
                    <div className="single-journal-1__header-container fl-container">
                        <div className="single-journal-1__time-estimate-wrapper">
                            {t.rich('reading_time', {value: blogPost.reading_time})}
                        </div>

                        <h1 className="single-journal-1__header-title display--54">
                            {blogPost.title}
                        </h1>
                    </div>
                </div>
                <div className="single-journal-1__content" dangerouslySetInnerHTML={{__html: blogPost.body}} />
                <div className="single-journal-1__footer">
                    <div className="single-journal-1__footer-container fl-container">
                        <LinkWithIcon
                            icon={<ArrowBack />}
                            tagName="link"
                            href="/blog"
                            outline="true"
                        >
                            {t('back_to_blog_home')}
                        </LinkWithIcon>

                    </div>
                </div>
            </div>
            <ArticleList1 data={blogPost.related_posts} title={t('related_articles')}/>
            <CategoryList1 data={blogTags} />
        </>

    )
}


export async function generateMetadata(props: Props): Promise<Metadata> {
    const articleId = idFromParamsSlug({slug: props?.params.slug});
    const blogPost = await getPostById(props?.params.locale, articleId);
    const url = headers().get('x-url');

    return {
        title: blogPost._meta?.title,
        description: blogPost._meta?.description,
        openGraph: {
            title: blogPost._meta?.title,
            // images: ['/some-specific-page-image.jpg', ...previousImages],
        },
        alternates: {
            canonical: url
        },
    }
}