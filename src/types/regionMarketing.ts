import {TImage} from "@/types/image";

export type TRegionMarketing = {
    "_meta": {
        "description": string,
        "title": string,
    },
    region_id: number,
    region: string,
    title: string,
    text1?: string,
    text2?: string,
    images: TImage
}