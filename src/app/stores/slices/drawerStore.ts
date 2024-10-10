import {createRef} from "react";
import {StateCreator} from "zustand";

import {Drawer} from "@/app/contexts/DrawerContext";

export type TDrawerStoreSlice = {
    drawers: Drawer[];
    addDrawer: (drawer: Drawer, single?: boolean) => void;
    closeLastDrawer: () => void;
    closeDrawer: () => void;
}

export const drawerStore: StateCreator<TDrawerStoreSlice> = (set) => ({
    drawers: [],


    closeLastDrawer: () => set((state) => {
        if (state.drawers.length === 0) {
            return {};
        }

        return {
            drawers: state.drawers.slice(0, -1)
        };
    }),

    closeDrawer: () => set((state) => {
        return {
            drawers: []
        };
    }),

    addDrawer: (drawer: Drawer, single = false) => set((state) => {
        const newDrawer = {
            ...drawer,
            key: `drawer-${Math.random().toString(36).substring(7)}-${Math.random().toString(36).substring(7)}`,
            itemRef: createRef()
        };

        if (single) {
            return {drawers: [newDrawer]};
        }

        return {
            drawers: [...state.drawers, newDrawer]
        };
    }),
})