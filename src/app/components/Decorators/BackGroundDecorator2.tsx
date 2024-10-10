import {ReactNode} from "react";
import Image from "next/image";

type Props = {
    children?: ReactNode,
    hasImage?: boolean,
    img?: string,
    classes?: string
}

export default function BackGroundDecorator2(props: Props) {
    return (
        <div className="background-decorator-2">
            {props?.hasImage && <Image alt="" width="1165" height="535" className="background-decorator-2__background-image"
                   src={props?.img || '/images/topography-background-horizontal.svg'}/>}
            {props?.children}
        </div>
    )
}