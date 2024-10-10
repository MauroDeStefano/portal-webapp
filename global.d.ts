type Messages = typeof import('./locales/en.json');

declare interface IntlMessages extends Messages {
}

declare module 'csstype' {
    interface Properties {
        [index: `--${string}`]: any;
    }
}
