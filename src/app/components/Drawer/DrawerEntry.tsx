import React from "react";
import {useTranslations} from "next-intl";

import {Drawer} from "@/app/contexts/DrawerContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import ChevronBack from '@/assets/icons/chevron-back.svg';

const GoBack = () => {
    const {
        closeLastDrawer,
    } = useFrilandContext((state) => state);

    const t = useTranslations('Drawers');

    return (
        <div
            className="drawer-1__back-button"
            role="button"
            onClick={closeLastDrawer}>
            <div className="drawer-1__back-button-icon">
                <ChevronBack/>
            </div>

            <h2 className="drawer-1__back-button-title">{t('go_back')}</h2>
        </div>
    );
}

const CloseButton = () => {
    const {
        closeDrawer,
    } = useFrilandContext((state) => state)

    return (
        <div
            className="drawer-1__close-button"
            role="button" onClick={closeDrawer}>&times;</div>
    );
}

export default function DrawerEntry({children, title, itemRef, className = ''}: Drawer) {
    const {
        drawers,
    } = useFrilandContext((state) => state);

    return (
        <div
            ref={itemRef}
            className={`drawer-1__drawer ${className}`}>

            <div className="drawer-1__header leading-none">
                <div className="login__header-desktop header-desktop__account-header">
                    {drawers.length > 1 && <GoBack/>}
                    <h2 className="drawer-1__title drawer-1__title--uppercase">{title}</h2>
                    <CloseButton/>
                </div>

                <div className="login__header-mobile">
                    {drawers.length > 1 && <GoBack/>}
                </div>
            </div>

            <div className="drawer-1__body ">
                {children}
            </div>
        </div>
    );
};