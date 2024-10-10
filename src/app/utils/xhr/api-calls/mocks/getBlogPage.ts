import {TBlogPage} from "@/types/blog";
import {TMeta} from "@/types/meta";

export const getBlogPage = async (locale: string):Promise<TBlogPage> => {
    return {
        _meta: {
            title: '',
            description: ''
        },
        post_highlight: {
            _meta: {
                title: '',
                description: ''
            },
            id: 0,
            date: '2024-23-12T00:33:22Z',
            reading_time: '5 minutes',
            title: 'Friland e WWF: insieme per un’esperienza indimenticabile nelle Oasi protette',
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
        },
        // picture_of_the_month: {
        //     id: 0,
        //     title: "La foto del mese",
        //     subtile: "Dicembre 2024",
        //     quote: "Un insolito amico",
        //     images: {
        //         alt: 'Test image',
        //         mobile: { src: '/images/placeholder.jpg' },
        //         desktop: { src: '/images/placeholder.jpg'  }
        //     },
        //     destination: {
        //         id: 16,
        //         title: "Tribil"
        //     }
        // }

    }
}


