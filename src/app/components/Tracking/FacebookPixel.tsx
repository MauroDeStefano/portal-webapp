"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { pageView, event, getPixelId } from "@/app/utils/fbpixel";

export default function FacebookPixel() {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!loaded) return;

        pageView();
    }, [pathname, loaded]);

    return (
        <div>
            <Script
                id="fb-pixel"
                src="/assets/scripts/pixel.js"
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
                data-pixel-id={getPixelId()}
            />
        </div>
    );
};

