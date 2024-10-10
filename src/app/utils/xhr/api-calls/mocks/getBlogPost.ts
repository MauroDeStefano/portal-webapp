import {TBlogPost, TBlogTag} from "@/types/blog";

export const getBlogPost = async (locale: string, id:number):Promise<TBlogPost> => {
    return {
        _meta: {
            title: '',
            description: ''
        },
        id: 0,
        date: '2024-23-12T00:33:22Z',
        reading_time: '5 minutes',
        title: 'A sample Post',
        tags: [
            {
                _meta: {
                    title: '',
                    description: ''
                },
                id: 0,
                title: 'Territorio'
            },
            {
                _meta: {
                    title: '',
                    description: ''
                },
                id: 1,
                title: 'I frilander raccontano'
            }
        ],
        body: '<p>Test string with <a href="http://www.google.com">link </a>, <b>bold</b>  and other tags</p>',
        related_posts: [],
        images: {
            alt: 'Test image',
            mobile: { src: '/images/placeholder.jpg' },
            desktop: { src: '/images/placeholder.jpg'  }
        }
    }
}