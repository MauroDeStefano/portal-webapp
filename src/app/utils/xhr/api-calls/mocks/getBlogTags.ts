import {TBlogTag} from "@/types/blog";

export const getBlogTags = async (locale: string):Promise<TBlogTag[]> => {
    return [
        {
            _meta: {
                title: '',
                description: ''
            },
            id: 0,
            title: 'News',
        },
        {
            _meta: {
                title: '',
                description: ''
            },
            id: 1,
            title: 'Territorio',
        },
        {
            _meta: {
                title: '',
                description: ''
            },
            id: 2,
            title: 'I frilander raccontano',
        },
        {
            _meta: {
                title: '',
                description: ''
            },
            id: 3,
            title: 'Impatto',
        },
        {
            _meta: {
                title: '',
                description: ''
            },
            id: 4,
            title: 'Prospettive',
        },
        {
            _meta: {
                title: '',
                description: ''
            },
            id: 5,
            title: 'Foto del mese',
        }
    ]

}