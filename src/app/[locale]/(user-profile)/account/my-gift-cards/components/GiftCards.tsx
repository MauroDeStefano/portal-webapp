'use client';

import {useState} from "react";
import {useRouter} from "@i18n/config";
import {useTranslations} from "next-intl";

import GiftCardAccordion from "@/app/[locale]/(user-profile)/account/my-gift-cards/components/GiftCardAccordion";
import GiftCardGiveForm from "@/app/[locale]/(user-profile)/account/my-gift-cards/components/GiftCardGiveForm";
import GiftCardOverview from "@/app/[locale]/(user-profile)/account/my-gift-cards/components/GiftCardOverview";
import GiftCardOverviewAction
    from "@/app/[locale]/(user-profile)/account/my-gift-cards/components/GiftCardOverviewAction";
import Card from "@/app/components/Card";
import {ArrowForwardIcon} from "@/app/components/Icons";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {applyGiftCard} from "@/app/serverActions/apply-gift-card";


export default function GiftCards() {
    const {user} = useFrilandContext((state) => state);
    const t = useTranslations('MyGiftCards');
    const [showForm, setShowForm] = useState<false | 'send' | 'confirm'>(false);
    const router = useRouter();

    const [isRedirecting, setIsRedirecting] = useState(false);

    return user?.gift_cards.map((item) =>
        <Card key={item.id}>
            <GiftCardAccordion status={item.status} title={item.title} expiration_date={item.expiration}>
                <GiftCardOverview price={item.value} expiration={item.expiration} nights={item.nights}>
                    {item.can_use &&
                        <GiftCardOverviewAction
                            label={t('cta_use')}
                            onClick={async () => {
                                if (isRedirecting) {
                                    return;
                                }
                                setIsRedirecting(true);
                                await applyGiftCard(item.id);
                                console.debug('Gift card applied, redirecting');
                                router.push({
                                    pathname: '/destinations',
                                });
                            }}
                            icon={isRedirecting ? <LoadingSpinner/> : <ArrowForwardIcon/>}>
                            {t('cta_use_description')}
                        </GiftCardOverviewAction>
                    }

                    {item.can_give && !showForm &&
                        <GiftCardOverviewAction
                            label={t('cta_send')}
                            onClick={() => setShowForm('send')}
                            icon={<ArrowForwardIcon/>}>
                            {t('cta_send_description')}
                        </GiftCardOverviewAction>
                    }

                    {showForm === 'send' &&
                        <GiftCardGiveForm
                            onCancel={() => setShowForm(false)}
                            onSend={() => setShowForm('confirm')}
                            giftCardId={item.id}/>
                    }

                    {showForm === 'confirm' &&

                        <div className="gift-card-overview-1__actions">
                            <div className="gift-card-form__form-field-wrapper">
                                <div className="" onClick={() => setShowForm(false)}>{t('sent')}</div>
                            </div>
                        </div>
                    }

                    {!item.attachments.length &&
                        <GiftCardOverviewAction onClick={() => {
                        }} href='/' icon={<ArrowForwardIcon/>}>
                            Facendo click sul bottone il sistema applicherà lo sconto pari alla cifra della Gift Card
                            direttamente nel
                            Carrello al momento del check-out
                        </GiftCardOverviewAction>
                    }
                </GiftCardOverview>
            </GiftCardAccordion>
        </Card>
    )
};