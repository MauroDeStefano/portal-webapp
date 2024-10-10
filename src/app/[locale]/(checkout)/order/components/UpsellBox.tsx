import {ChevronDownIcon} from "@storybook/icons";
import {getTranslations} from "next-intl/server";

interface UpsellBoxProps {
}

export default function UpsellBox(props: UpsellBoxProps) {
    return (
        <div className="additional-services-1__item">
            <img
                className="additional-services-1__item-image"
                src="/images/placeholder-2.jpg"
            />

            <div className="additional-services-1__item-details">
                <div className="additional-services-1__item-content">
                    <h3 className="additional-services-1__item-title">Kit pranzo e cena</h3>
                    <div className="additional-services-1__item-text mcy-0">
                        <p>Una selezione di prodotti locali e ingredienti di qualità da comporre
                            e cucinare nella cucina dell’alloggio. Ogni kit è fornito con le
                            istruzioni per la preparazione.</p>
                    </div>
                    <a className="additional-services-1__item-link" href="#">Cosa è incluso nel
                        kit?</a>
                </div>

                <div className="additional-services-1__item-options">
                    <div className="additional-services-1__item-select">

                        <div className="form__select">
                            <div className="form__select-wrapper">
                                <div className="form__select-label">
                                    Pranzo e cena per 2 per 2 giorni
                                </div>

                                <div className="form__select-icon">
                                    <ChevronDownIcon/>
                                </div>
                            </div>

                            <div className="form__select-options">
                                <div className="form__select-option">
                                    Pranzo e cena per 2 per 2 giorni
                                </div>
                                <div className="form__select-option">
                                    Pranzo e cena per 3 per 3 giorni
                                </div>
                                <div className="form__select-option">
                                    Pranzo e cena per 4 per 4 giorni
                                </div>
                                <div className="form__select-option">
                                    Pranzo e cena per 5 per 5 giorni
                                </div>
                            </div>
                        </div>

                    </div>

                    <div>

                        <div
                            role="button"
                            className="
            button-4
                    "
                        >
                            <div className="button-4__label text--13">
                                Aggiungi
                            </div>

                            <div className="button-4__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13.999"
                                     height="14" viewBox="0 0 13.999 14">
                                    <path d="M-12783,17810.5v-6h-6v-2h6v-6h2v6h6v2h-6v6Z"
                                          transform="translate(12789.001 -17796.5)"
                                          fill="currentColor"/>
                                </svg>
                            </div>
                        </div>

                    </div>

                    <div className="additional-services-1__item-price">€ 120,00</div>
                </div>
            </div>
        </div>

    );
};

export async function UpsellWrapper() {
    const t = await getTranslations('Checkout');

    return (
        <div className="card-1">
            <div className="card-1__header">
                <h2 className="card-1__title">{t('upsell_heading')}</h2>
            </div>

            <div className="additional-services-1">
                <UpsellBox/>
                <UpsellBox/>
            </div>
        </div>
    );
}