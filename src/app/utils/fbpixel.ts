export const getPixelId = ():string|undefined => {
    return process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
}
export const pageView = () => {
    if (typeof window.fbq !== 'undefined') {
        window.fbq("track", "PageView");
    }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name:string, options = {}) => {
    if (typeof window.fbq !== 'undefined') {
        window.fbq("track", name, options);
    }
};

