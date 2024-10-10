import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TFaq} from "@/types/faq";

export const getFaqBlock = async (id: number, locale: string): Promise<TFaq[]> => {
    return await _get(Endpoints.faqBlock(id, locale));
}

