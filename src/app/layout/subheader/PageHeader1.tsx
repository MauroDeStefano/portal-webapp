import {Link, pathnames} from "@i18n/config";

type Props = {
    classes?: string,
    title?: any,
    label?: string,
    href?: keyof typeof pathnames
}

export default function PageHeader1(props: Props) {
    let classes = props.classes;
    if (props.label !== 'undefined' || props.href !== null) {
        classes = classes + ' page-header-1--with-action';
    }
    return (
        <div className={`page-header-1 ${classes}`}>
            <h1 className="page-header-1__title">
                {props.title}
            </h1>
            <PageHeader1Action label={props.label} href={props?.href || '/'}/>
        </div>
    )
}

type ActionProps = {
    href: any,
    label?: string
}

function PageHeader1Action(props: ActionProps) {
    if (props.label !== 'undefined') {
        return (
            <div className="page-header-1__action">
                <Link href={props.href} className='page-header-1__action-link'>
                    {props.label}
                </Link>
            </div>
        )

    }
}