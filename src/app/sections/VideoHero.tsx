import React from "react";

import {ImageBundleProps} from "@/app/components/ImageBundle";
import JumpToContent from "@/app/components/JumpToContent";
import VideoEmbed from "@/app/components/VideoEmbed";
import FrilandLogo from "@/assets/icons/friland-round-logo.svg";

type Props = {
    src?: string,
    placeholder?: ImageBundleProps
    title?: any
};
export default function VideoHero(props: Props) {
    return (
        <JumpToContent buttonClassName='hero-2__button'>
            <div className="hero-2">
                <VideoEmbed placeholder={props.placeholder}
                            source={[{
                                src: props.src ? props.src : "/videos/placeholder-video-7.mp4",
                                type: "video/mp4"
                            }]}/>

                <div className="hero-2__overlay"></div>

                <div className="hero-2__container fl-container">
                    <div className="hero-2__wrapper">
                        <div className="hero-2__header">
                            <FrilandLogo className='hero-2__logo'/>
                        </div>

                        <h1 className="hero-2__title display--54">
                            {props.title}
                        </h1>
                    </div>
                </div>
            </div>
        </JumpToContent>
    );
};