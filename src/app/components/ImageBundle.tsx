import {ComponentProps} from "react";


export interface ImageBundleProps extends ComponentProps<'img'> {
    srcMobile?: string,
    srcDesktop?: string,
    alt?: string,
    name?: string
}


export default function ImageBundle({srcMobile, srcDesktop, ...props}: ImageBundleProps) {
    return (
        <img alt={props?.alt || ''}
             srcSet={`${srcMobile} 720w, ${srcDesktop} 2560w`}
             src={srcMobile}
             sizes='(max-width: 720px) 320px, 2560px'
             {...props}
        />
    )
}