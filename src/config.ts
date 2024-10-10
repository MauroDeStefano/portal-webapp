const DAY_IN_SECONDS = 60 * 60 * 24;

export const SHORT_SESSION_IN_SECONDS = 60 * 60;
export const LONG_SESSION_IN_SECONDS = DAY_IN_SECONDS * 30;


export const SESSION_COOKIE_NAME: string = 'user-session';
export const GIFT_CARD_COOKIE_NAME: string = 'gift-card-id';

export const ORDER_COOKIE_NAME: string = 'order-session';
export const ORDER_COOKIE_DURATION_IN_SECONDS = LONG_SESSION_IN_SECONDS;

export const ORDER_INTENT_COOKIE_NAME: string = 'order-session-intent';
export const ORDER_INTENT_COOKIE_DURATION_IN_SECONDS = 60 * 5;
