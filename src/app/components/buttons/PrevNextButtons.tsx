import React, {ComponentProps} from "react";

import ChevronLeft from "@/assets/icons/chevron-back.svg";
import ChevronRight from "@/assets/icons/chevron-forward.svg";

interface Props extends ComponentProps<'button'> {
}

export function NextButton(props: Props) {
    return (
        <button className="icon-button-vertical" {...props}>
            <div className="icon-button-vertical__icon">
                <div className="icon-button-vertical__circle"></div>
                <ChevronRight/>
            </div>
        </button>
    );
}

export function PrevButton(props: Props) {
    return (
        <button className="icon-button-vertical" {...props}>
            <div className="icon-button-vertical__icon">
                <div className="icon-button-vertical__circle"></div>
                <ChevronLeft/>
            </div>
        </button>
    );
}