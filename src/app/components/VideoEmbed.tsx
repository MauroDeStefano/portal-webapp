import React from "react";

import ImageBundle, {ImageBundleProps} from "@/app/components/ImageBundle";

type VideoSource = {
    src: string;
    type: string;
};
type Props = {
    placeholder?: ImageBundleProps
    source: VideoSource[];
};
export default function VideoEmbed({placeholder, source}: Props) {
    return (
        <>
            <ImageBundle className="hero-2__video-placeholder" srcMobile={placeholder?.srcMobile}
                         srcDesktop={placeholder?.srcDesktop}></ImageBundle>
            <video autoPlay className="hero-2__video" disablePictureInPicture loop muted playsInline>
                {source.map(src => {
                    return (
                        <source
                            key={src.src}
                            src={src.src}
                            type={src.type}
                        />
                    );
                })}
            </video>
        </>
    );
};