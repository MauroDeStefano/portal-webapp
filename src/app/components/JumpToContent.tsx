import React from "react";

import ButtonRoundIcon from "@/app/components/buttons/ButtonRoundIcon";
import ArrowDown from "@/assets/icons/arrow-down.svg";

interface JumpToContentProps {
    children?: React.ReactNode
    buttonClassName?: string,
    noJump?: boolean
}

export default function JumpToContent({children, buttonClassName, noJump}: JumpToContentProps) {
    return (
        <>
            <div className="relative">
                {children}

                {!noJump && <div className={`${buttonClassName} absolute z-10 bottom-12 left-0 w-full text-center text-white`}>
                    <ButtonRoundIcon icon={<ArrowDown/>} tagName='a' href='#the-content'/>
                </div>}
            </div>

            <div id='the-content'/>
        </>
    );
};