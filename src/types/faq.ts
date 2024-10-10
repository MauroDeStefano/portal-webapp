import {TMeta} from "@/types/meta";


export type TFaqContent= {
    tags: TFaqTag[];
    faq: {
        faqs: TFaq[];
        _meta: TMeta;
    },
    _meta: TMeta;
}

export type TFaqTag = {
    tag: string;
    title: string;
    icon: string;
    altText: string;
}

export type TFaq = {
    question: string;
    answer: string;
    tag?: string;
}