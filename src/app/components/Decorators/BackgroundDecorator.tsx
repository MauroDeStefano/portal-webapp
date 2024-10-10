import Image from "next/image";

type Props = {
    img?: string,
    children?: any
}

export default function BackgroundDecorator(props: Props) {
    return (
        <div className="background-decorator-1">
            <Image alt="" width="1165" height="535" className="background-decorator-1__background-image"
                   src={props?.img || '/images/topography-background-horizontal.svg'}/>
            {props.children}
        </div>
    )
}