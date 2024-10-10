import React from "react";

import css from "@/app/components/Forms/AvailabilityForm/availability-form.module.css";
import {DropdownOption} from "@/app/components/Forms/AvailabilityForm/types";

type TMobileDropdownListProps = {
    items: DropdownOption[],
    selectedItem: DropdownOption | null,
    onChange: (item: DropdownOption) => void
}

export default function MobileDropdownList({
                                               items,
                                               selectedItem,
                                               onChange
                                           }: TMobileDropdownListProps) {
    return (
        <>
            <ul className={css.regionList}>
                {items.map((item) => <li
                    className={item.value === selectedItem?.value ? css.regionListIsActive : ''}
                    key={item.value}>
                    <button
                        type={'button'}
                        onClick={() => onChange(item)}>{item.label}</button>

                    {item.value === selectedItem?.value &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="15.225" height="10.867"
                             viewBox="0 0 15.225 10.867">
                            <path id="Path_627" data-name="Path 627" d="M-1.242,7.709,6.772,0l5.135,4.9"
                                  transform="translate(12.943 8.79) rotate(180)" fill="none" stroke="currentColor"
                                  strokeWidth="3"/>
                        </svg>
                    }
                </li>)}
            </ul>
        </>
    );
}