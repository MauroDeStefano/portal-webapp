import React from "react";

import {CheckMarkIcon} from "@/app/components/Icons";

type Props = {
    children?: React.ReactNode
}

export default function RadioList(props: Props) {
    return (
        <div
            className="form__radio-list"
            role="listbox"
        >
            {props.children}
        </div>

    )
}

type ItemProps = {
    children?: React.ReactNode
    selected?: boolean,
    disabled?: boolean
}


export function RadioListItem(props: ItemProps) {
    return (
        <div
            className="form__radio-list-item"
            role="option"
            aria-selected={props.selected}
            aria-disabled={props.disabled}>
            {props.children}
            <div className="form__radio-list-item-icon">
                <CheckMarkIcon/>
            </div>
        </div>

    )
}