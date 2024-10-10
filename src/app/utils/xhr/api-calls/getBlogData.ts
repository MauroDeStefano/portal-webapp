import {TBlogPage, TBlogPost, TBlogPostReduced, TBlogTag} from "@/types/blog";
import {giftCardsPageContent} from "@/app/api-integration/normalizer/giftCards";
import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";

export const getPostById = async (locale: string, id:  number | string):Promise<TBlogPost> => {
    if (!id) {
        return <TBlogPost>{};
    }
    return await _get(Endpoints.blog.post_by_id(locale, id));
}

export const getPostsByTag = async (locale: string, id?: number | string | undefined):Promise<TBlogPostReduced[]> => {

    return await _get(Endpoints.blog.posts_by_tag(locale, id));
}

export const getTags = async (locale: string):Promise<TBlogTag[]> => {

    return await _get(Endpoints.blog.tags(locale));
}

export const getBlogContent = async (locale: string):Promise<TBlogPage> => {

    return await _get(Endpoints.blog.content(locale));
}