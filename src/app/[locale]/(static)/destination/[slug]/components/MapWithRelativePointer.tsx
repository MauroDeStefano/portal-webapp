'use client';

import React, {SyntheticEvent, useState} from "react";

import {ClientOnlyContextProvider} from "@/app/contexts/ClientOnlyContext";
import MapPin from "@/assets/icons/map-pin.svg";

interface MapWithRelativePointerProps {
    mapImage: string
    mapCoords: {
        top: number
        left: number
    }
}

export default function MapWithRelativePointer({mapImage, mapCoords}: MapWithRelativePointerProps) {
    const [coords, setCoords] = useState<{
        top: string | number
        left: string | number
    }>({
        top: 0,
        left: 0
    })

    const convertAbsoluteToRelative = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const {naturalHeight, naturalWidth} = e.target as HTMLImageElement;
        setCoords({
            top: mapCoords.top / naturalHeight * 100 + '%',
            left: mapCoords.left / naturalWidth * 100 + '%'
        })
    }

    return (
        <ClientOnlyContextProvider>
            <div className="feature-section-2__map-wrapper">
                <img src={mapImage} alt='' className='w-full' onLoad={convertAbsoluteToRelative}/>
                <MapPin
                    style={coords}
                    className="feature-section-2__map-pin"/>
            </div>
        </ClientOnlyContextProvider>
    );
};