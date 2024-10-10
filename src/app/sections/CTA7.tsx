import {pathnames} from "@i18n/config";

import LinkWithIcon from "@/app/components/buttons/LinkWithIcon";
import {ArrowForwardIcon} from "@/app/components/Icons";

type Props = {
    title?: string,
    href?: keyof typeof pathnames,
    label?: string
}

export default function CTA7(props: Props) {
    return (
        <div className="cta-7">
            {props?.title &&
                <h3 className="cta-7__title">
                    {props?.title}
                </h3>
            }
            {props?.label &&
                <div className="cta-7__links">
                    <LinkWithIcon icon={<ArrowForwardIcon/>} tagName='link' href={props?.href || '/'}>
                        {props?.label}
                    </LinkWithIcon>
                </div>
            }
        </div>
    )
}