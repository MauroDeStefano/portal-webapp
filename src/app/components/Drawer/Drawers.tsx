'use client';
import {useRef} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import classNames from "classnames";

import DrawerEntry from "@/app/components/Drawer/DrawerEntry";
import {useFrilandContext} from "@/app/contexts/FrilandContext";

export default function Drawers() {
    const {drawers, closeDrawer} = useFrilandContext((state) => state);
    const overlayRef = useRef(null);
    const transitionDuration = 300;

    return (
        <>
            <section className={classNames({
                "drawer-1 z-[9999] relative": true,
                "is-visible": drawers.length > 0
            })}>
                <CSSTransition
                    in={drawers.length > 0}
                    nodeRef={overlayRef}
                    timeout={transitionDuration}
                    classNames="fade-in-out"
                    unmountOnExit
                >
                    <div className="drawer-1__overlay" ref={overlayRef} onClick={closeDrawer}></div>
                </CSSTransition>

                <TransitionGroup>
                    {
                        drawers.map(({key, ...drawer}) => {
                            return (
                                <CSSTransition
                                    key={key}
                                    classNames="slide-left-in-out"
                                    timeout={300}
                                    nodeRef={drawer.itemRef}
                                >
                                    <DrawerEntry {...drawer}>{drawer.children}</DrawerEntry>
                                </CSSTransition>
                            )
                        })}
                </TransitionGroup>
            </section>
        </>
    );
};