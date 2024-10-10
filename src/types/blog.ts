import {TMeta} from "@/types/meta";


export type TBlogTag = {
    _meta?: TMeta,
    priority?: number,
    id: number,
    title: string
}

export type TBlogPost = {
    id: number,
    _meta?: TMeta,
    date: string,
    reading_time: string,
    title: string,
    tags: TBlogTag[],
    images?: {
        alt: string;
        mobile: { src: string }
        desktop: { src: string }
    };
    body: string,
    related_posts?: TBlogPostReduced[]
}

export type TBlogPostReduced = {
    id: number,
    title: string,
    images?: {
        alt: string;
        mobile: { src: string }
        desktop: { src: string }
    };
    tags: TBlogTag[],
    reading_time: string,
}

export type TBlogPictureOfTheMonth = {
    id: number,
    title: string,
    subtile: string,
    quote: string,
    images?: {
        alt: string,
        mobile: { src: string },
        desktop: { src: string },
    },
    destination?: {
        id: number,
        title: string
    }
}

export type TBlogPage = {
    _meta?: TMeta,
    post_highlight?: TBlogPost,
    // picture_of_the_month?: TBlogPictureOfTheMonth
}
