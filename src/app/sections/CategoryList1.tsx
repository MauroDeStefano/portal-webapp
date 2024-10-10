import {TBlogTag} from "@/types/blog";
import classNames from "classnames";
import {locationSlug} from "@/app/utils/locationSlug";
import {Link} from "@i18n/config";


type Props = {
    data?: TBlogTag[],
    isBt0?: boolean
}
export default function CategoryList1(props: Props) {
    return (
        <div className={classNames({
            'category-list-1': true,
            'bt-0': props?.isBt0
        })}>
            <div className="category-list-1__container fl-container">
                <div className="category-list-1__wrapper">
                    {props?.data && props.data.map((item) =>
                        <CategoryItem key={item.id} item={item} />
                    )}
                </div>
            </div>
        </div>
    )
}

type ItemProps = {
    item?: TBlogTag
}

export function CategoryItem(props: ItemProps) {
    return (
        <Link href={{
            pathname: '/blog/[slug]',
            params: {slug: locationSlug(props?.item? props?.item.id: 0, props?.item? props?.item.title: '' )}
        }}
              className="category-list-1__button"
        >{props?.item && props.item.title}
        </Link>

    )
}