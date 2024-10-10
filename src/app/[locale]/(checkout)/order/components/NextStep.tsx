import {useOrderContext} from "@/app/[locale]/(checkout)/order/OrderContext";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {ArrowForwardIcon} from "@/app/components/Icons";

type TAdvanceToNextStepProps = {
    nextStep: () => void;
    label: string;
}

export default function NextStep({
                                     nextStep,
                                     label,
                                 }: TAdvanceToNextStepProps) {
    const {
        error,
        isBusy,
        canChangeStep
    } = useOrderContext((state) => state);

    return (
        <>
            <div
                className="payment-summary__button-wrapper">
                <OneButtonToRuleThemAll
                    background={'icon'}
                    icon={<ArrowForwardIcon/>}
                    disabled={!canChangeStep || !!error || isBusy}
                    isBusy={isBusy}
                    onClick={nextStep}
                >{label}</OneButtonToRuleThemAll>
            </div>
        </>
    );
}