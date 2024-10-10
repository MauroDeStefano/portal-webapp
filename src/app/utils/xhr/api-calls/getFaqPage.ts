import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TFaqContent} from "@/types/faq";

export const getFaqPage = async (locale: string): Promise<TFaqContent> => {
    return await _get(Endpoints.faq(locale));
}

