'use client';

import {createContext, ReactNode, useEffect} from "react";

import {useGetUserDetails} from "@/app/api-integration/user-preferences";
import {useFrilandContext} from "@/app/contexts/FrilandContext";

type SessionContext = {}
const SessionContext = createContext<SessionContext | null>(null);


export const SessionContextProvider = ({children, userSession}: {
    children: ReactNode,
    userSession?: string,
}) => {
    const {session, updateUserProfileData, setSession, ...etc} = useFrilandContext((state) => state);
    const getUserDetails = useGetUserDetails();

    useEffect(() => {
        if (userSession) {
            setSession(userSession);
        }
    }, []);

    useEffect(() => {
        if (!session?.token || session?.user) {
            return;
        }

        console.debug('⌛Fri.land user session Init');

        getUserDetails().then((userProfileData) => {
            updateUserProfileData(userProfileData);
        })
    }, [session]);

    const contextValue = {};
    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};