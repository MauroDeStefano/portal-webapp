import React from "react";
import classNames from "classnames";

type Props = {
    children?: React.ReactNode
    title?: any,
    subtitle?: string,
    tip?: string,
    isPt0?: boolean
}

export default function Features8(props: Props) {
    return (

        <div className={classNames({
            "feature-section-8": true,
            "pt-0": props.isPt0 || false
        })}>
            <div className="feature-section-8__header">
                <div className="feature-section-8__header-container fl-container">
                    <div className="feature-section-8__header-wrapper">
                        <h3 className="feature-section-8__header-subtitle">{props.subtitle}</h3>
                        <h4 className="feature-section-8__header-title display--54">{props.title}</h4>
                        <p className="feature-section-8__header-text text--13">{props.tip}</p>
                    </div>
                </div>
            </div>

            <div className="feature-section-8__body">
                <div className="feature-section-8__body-container fl-container">
                    <div className="feature-section-8__body-wrapper">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>

    );
}

type ItemProps = {
    title?: string,
    value?: string,
    image?: React.ReactNode
}

export function Features8Item(props: ItemProps) {
    return (
        <div className="feature-section-8__item">
            <div className="feature-section-8__item-icon-wrapper">
                {props.image}
            </div>
            <div className="feature-section-8__item-content">
                <h5 className="feature-section-8__item-title">{props.value}</h5>
                <p className="feature-section-8__item-text text--13">{props.title}</p>
            </div>
        </div>
    )
}