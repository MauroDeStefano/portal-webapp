'use client';

import React, {useEffect, useState} from "react";
import Script from "next/script";

const MAX_SCREEN_SIZE_TO_HIDE_CHAT = 1024;

const maybeHide = () => {
    const zE = (window as any)?.zE;

    if (!zE) {
        console.debug('no zE');
        return;
    }

    if (window.innerWidth < MAX_SCREEN_SIZE_TO_HIDE_CHAT) {
        zE?.('messenger', 'hide');
    } else {
        zE?.('messenger', 'show');
    }
};

const maybeOpen = () => {
    const zE = (window as any)?.zE;
    console.debug('opening chat', !!zE);

    zE?.('messenger', 'show'); // we need to show the button first, because may behave weirdly on tablets
    zE?.('messenger', 'open');
}

export function ZenDeskScriptEnqueue({locale}: {
    locale: string
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.addEventListener('resize', maybeHide);
        return () => window.removeEventListener('resize', maybeHide);
    }, []);

    if (!isLoaded) {
        return;
    }

    return <Script
        defer={true}
        src='https://static.zdassets.com/ekr/snippet.js?key=10f7b255-cbbb-442a-a9c9-0a1c3fb8e0fc'
        id='ze-snippet'
        type="text/javascript"
        onLoad={() => {
            const zE = (window as any)?.zE;
            maybeHide();

            zE?.("messenger:set", "locale", locale)

            zE?.('messenger:on', 'close', function () {
                console.debug('Closing chat');
                maybeHide();
            });
        }}
    />
}

export function ZenDeskButton({...props}) {
    return <button
        type='button'
        onClick={maybeOpen}
        {...props}/>
}