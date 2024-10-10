'use client';

import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {usePathname} from "@i18n/config";
import {useParams} from "next/navigation";

import {CloseIcon, HamburgerIcon} from "@/app/components/Icons";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import {removeBodyClass, toggleBodyClass} from "@/app/utils/useBodyClass";

export function MobileNavHamburger() {
    const [isClient, setIsClient] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const {
        closeDrawer,
        drawers
    } = useFrilandContext((state) => state);

    const pathname = usePathname()
    const params = useParams()

    function closeMobileNav() {
        removeBodyClass('mobile-nav-is-open')
    }

    function toggleMobileNav() {
        if (drawers.length > 0) {
            closeDrawer();
            return;
        }

        toggleBodyClass('mobile-nav-is-open');
    }

    useEffect(() => {
        setIsClient(true)
    }, []);

    useEffect(() => {
        setIsOpened(false);
        closeMobileNav();
    }, [pathname, params]);

    useEffect(() => {
        if (!isOpened) {
            closeDrawer();
        }
    }, [isOpened]);

    useEffect(() => {
        document.body.classList.toggle('mobile-nav-has-drawers', drawers.length > 0);
    }, [drawers]);

    if (!isClient) {
        return <></>;
    }

    return (
        createPortal(
            <button role="button"
                    className="header-mobile__drawer-toggle lg:hidden"
                    onClick={() => {
                        toggleMobileNav();
                        setIsOpened(document.body.classList.contains('mobile-nav-is-open'));
                    }}>
                {isOpened || drawers.length ? <CloseIcon/> : <HamburgerIcon/>}
            </button>
            , document.body)
    );
}