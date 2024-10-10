'use client';
import React from "react";

import CheckAvailabilityMobileFormButton from "@/app/components/Forms/AvailabilityForm/CheckAvailabilityMobileForm";
import {MobileLanguagePicker} from "@/app/components/LanguagePickers";
import {MobileNavPrimary, MobileNavSecondary, MobileUserCP} from "@/app/layout/header/MobileNav";

export default function MobileHeader() {

    return (
        <>
            <CheckAvailabilityMobileFormButton/>

            <div className="header-mobile__drawer lg:hidden">
                <nav className="header-mobile__nav">
                    <MobileNavPrimary/>
                    <MobileNavSecondary/>
                </nav>

                <div className="header-mobile__content">
                    <MobileUserCP/>
                    <MobileLanguagePicker/>
                </div>
            </div>
        </>
    );
};