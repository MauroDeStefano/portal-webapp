import {useTranslations} from "next-intl";

import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import {useHouseSummaryContext} from "@/app/[locale]/(checkout)/order/steps/houseSummary/HouseSummaryContext";
import Checkbox from "@/app/components/Forms/Checkbox";
import {useCurrencyFormatter} from "@/app/hooks/useCurrencyFormatter";

export default function PetCheckbox() {
    const t = useTranslations('Checkout');
    const currency = useCurrencyFormatter()

    const {
        isBusy
    } = useOrderContext((state) => state);

    const {
        house: {
            has_pet,
            pet_price,
        },
        togglePet
    } = useHouseSummaryContext();

    return (
        <div className="stay-overview-1__option">
            <div className="stay-overview-1__option-name">
                <Checkbox
                    checked={has_pet}
                    disabled={isBusy}
                    isBusy={isBusy}
                    onChange={(e) => togglePet(e.target.checked)}
                > {t('with_pet')}</Checkbox>
            </div>

            {has_pet &&
                <div className="stay-overview-1__option-price">
                    <p className="stay-overview-1__price">{currency(pet_price)}</p>
                </div>
            }

            {has_pet &&
                <p className="stay-overview-1__option-description">{t('with_pet_disclaimer')}</p>
            }
        </div>
    );
};