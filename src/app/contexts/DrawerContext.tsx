'use client';

import {ReactNode} from "react";

import {useFrilandContext as useDrawerContext} from "@/app/contexts/FrilandContext";

export {useDrawerContext};

export type Drawer = {
    title: string;
    children: ReactNode
    key?: string;
    itemRef?: any;
    className?: string;
};

type DrawerContext = {
    drawers: Drawer[];
    addDrawer: (drawer: Drawer, single?: boolean) => void;
    closeLastDrawer: () => void;
    closeDrawer: () => void;
}