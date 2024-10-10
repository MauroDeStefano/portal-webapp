type Props = {
    children?: React.ReactNode
}


export default function DescriptionList2(props: Props) {
    return (
        <dl className="description-list-2">
            {props.children}
        </dl>
    )
}

type ItemProps = {
    title?: string,
    children?: React.ReactNode
}

export function DescriptionList2Item(props: ItemProps) {
    return (
        <div className="description-list-2__item">
            <dt className="description-list-2__title">{props.title}</dt>
            <DescriptionList2Text>{props.children}</DescriptionList2Text>
        </div>
    )
}

type TextProps = {
    children?: React.ReactNode
}


function DescriptionList2Text(props: TextProps) {
    if (props.children) {
        return (
            <dd className="description-list-2__text">
                {props.children}
            </dd>
        )
    } else {
        return (
            <dd className="description-list-2__text  description-list-2__text--gray">
                "No data available"
            </dd>
        )
    }
}