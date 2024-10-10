import {TBlogPost, TBlogPostReduced, TBlogTag} from "@/types/blog";

export const getBlogPosts = async (locale: string):Promise<TBlogPostReduced[]> => {
    return [
        {
            id: 0,
            reading_time: '5 minutes',
            title: 'A sample Post',
            tags: [
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 0,
                    title: 'Territorio',
                },
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 1,
                    title: 'I frilander raccontano',
                }
            ],
            images: {
                alt: 'Test image',
                mobile: { src: '/images/placeholder.jpg' },
                desktop: { src: '/images/placeholder.jpg'  }
            }
        },
        {
            id: 1,
            reading_time: '5 minutes',
            title: 'A sample Post',
            tags: [
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 0,
                    title: 'Territorio',
                },
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 1,
                    title: 'I frilander raccontano',
                }
            ],
            images: {
                alt: 'Test image',
                mobile: { src: '/images/placeholder.jpg' },
                desktop: { src: '/images/placeholder.jpg'  }
            }
        },
        {
            id: 2,
            reading_time: '5 minutes',
            title: 'A sample Post',
            tags: [
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 0,
                    title: 'Territorio',
                },
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 1,
                    title: 'I frilander raccontano',
                }
            ],
            images: {
                alt: 'Test image',
                mobile: { src: '/images/placeholder.jpg' },
                desktop: { src: '/images/placeholder.jpg'  }
            }
        },
        {
            id: 3,
            reading_time: '5 minutes',
            title: 'A sample Post',
            tags: [
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 0,
                    title: 'Territorio',
                },
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 1,
                    title: 'I frilander raccontano',
                }
            ],
            images: {
                alt: 'Test image',
                mobile: { src: '/images/placeholder.jpg' },
                desktop: { src: '/images/placeholder.jpg'  }
            }
        },
        {
            id: 4,
            reading_time: '5 minutes',
            title: 'A sample Post',
            tags: [
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 0,
                    title: 'Territorio',
                },
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 1,
                    title: 'I frilander raccontano',
                }
            ],
            images: {
                alt: 'Test image',
                mobile: { src: '/images/placeholder.jpg' },
                desktop: { src: '/images/placeholder.jpg'  }
            }
        },
        {
            id: 5,
            reading_time: '5 minutes',
            title: 'A sample Post',
            tags: [
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 0,
                    title: 'Territorio',
                },
                {
                    _meta: {
                        title: '',
                        description: ''
                    },
                    id: 1,
                    title: 'I frilander raccontano',
                }
            ],
            images: {
                alt: 'Test image',
                mobile: { src: '/images/placeholder.jpg' },
                desktop: { src: '/images/placeholder.jpg'  }
            }
        },


    ]

}