import React from "react";
import {createPortal} from "react-dom";
import {useClickAway} from "react-use";
import classNames from "classnames";

import {
    DropdownPickerContextProvider,
    useDropdownPickerContext
} from "@/app/components/Forms/AvailabilityForm/DropdownPicker/DropdownPickerContext";
import OptionItem from "@/app/components/Forms/AvailabilityForm/DropdownPicker/OptionItem";
import OptionPicked from "@/app/components/Forms/AvailabilityForm/DropdownPicker/OptionPicked";
import {DropdownPickerProps} from "@/app/components/Forms/AvailabilityForm/types";

import css from '../availability-form.module.css';


function DropdownPickerPopover() {
    const {
        options,
        fixedPosition,
        parentRef,
        expanded,
        setExpanded
    } = useDropdownPickerContext();

    const popoverRef = React.useRef(null);

    useClickAway(popoverRef, () => {
        setExpanded(false);
    });

    if (!expanded) {
        return null;
    }

    const rect = parentRef.current!.getBoundingClientRect();

    const parentPosition = {
        relative_bottom: window.innerHeight - rect.top,
        top: window.scrollY + rect.top + rect.height,
        left: window.scrollX + rect.left
    }

    return (
        <div
            ref={popoverRef}
            style={{
                '--popup-wrapper-left': `${parentPosition.left}px`,
                '--popup-wrapper-bottom': `${parentPosition.relative_bottom}px`,
                '--popup-wrapper-top': `${parentPosition.top}px`,
            }}
            className={classNames([
                css.popupWrapper,
                fixedPosition ? css.popupWrapperFixed : '',
            ])}
        >

            <div className={css.dropdownItems} role="listbox">
                {options.map((option, i) => <OptionItem
                    key={`${i}-${option.value}`}
                    option={option}/>)}
            </div>
        </div>
    )
}

export default function DropdownPicker({value, ...props}: DropdownPickerProps) {
    const parentRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <DropdownPickerContextProvider
                defaultValue={value}
                parentRef={parentRef}
                {...props}>

                <OptionPicked/>

                {typeof document !== 'undefined' &&
                    createPortal(<DropdownPickerPopover/>, document.body)}
            </DropdownPickerContextProvider>

        </>
    );
}