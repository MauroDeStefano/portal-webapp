type Props = {
    children?: React.ReactNode
}


export default function DescriptionList1(props: Props) {
    return (
        <dl className="description-list-1">
            {props.children}
        </dl>
    )
}

type ItemProps = {
    title?: string,
    children?: React.ReactNode
}

export function DescriptionList1Item(props: ItemProps) {
    return (
        <div className="description-list-1__item">
            <dt className="description-list-1__title">{props.title}</dt>
            <dd className="description-list-1__text">{props.children}</dd>
        </div>
    )
}
