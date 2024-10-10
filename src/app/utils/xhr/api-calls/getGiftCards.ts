import {giftCardsPageContent} from "@/app/api-integration/normalizer/giftCards";
import {_get} from "@/app/utils/xhr/_get";
import {Endpoints} from "@/endpoints";
import {TGiftCardContent} from "@/types/giftcard";

export const getGiftCards = async (locale: string): Promise<TGiftCardContent> => {
    return giftCardsPageContent(await _get(Endpoints.giftCards(locale)));
}