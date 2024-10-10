import {Link} from "@i18n/config";

import {FrilandRoundLogoIcon} from "@/app/components/Icons";
import classNames from "classnames";

type Props = {
    title?: any,
    isLight?: boolean
}

export default function PageHeader4(props: Props) {
    return (
        <header className={classNames({
            'page-header-4': true,
            'page-header-4--light': props.isLight
        })}>
            <div className="page-header-4__container fl-container">
                <div className="page-header-4__wrapper">
                    <div className="page-header-4__logo">
                        <Link href="/">
                            <FrilandRoundLogoIcon/>
                        </Link>
                    </div>
                    <h1 className="page-header-4__title display--34">
                        {props.title}
                    </h1>
                </div>
            </div>
        </header>
    )
}