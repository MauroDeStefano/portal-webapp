import {Link} from "@i18n/config";
import {getTranslations} from "next-intl/server";

interface FooterProps {
}

export default async function Footer(props: FooterProps) {
    const t_nav = await getTranslations('Navigation');

    return (
        <footer className="iterative-screens__footer">
            <div className="iterative-screens__footer-container fl-container">
                <div className="iterative-screens__footer-wrapper">
                    <ul className="iterative-screens__footer-nav">
                        <li className="iterative-screens__footer-nav-item">
                            <Link
                                href="/privacy"
                                className="iterative-screens__footer-nav-link"
                            >{t_nav('privacy')}</Link>
                        </li>

                        <li className="iterative-screens__footer-nav-item">
                            <Link
                                href="/terms-of-use"
                                className="iterative-screens__footer-nav-link"
                            >{t_nav('terms')}</Link>
                        </li>

                        <li className="iterative-screens__footer-nav-item">
                            <Link
                                href="/refund"
                                className="iterative-screens__footer-nav-link"
                            >{t_nav('refund')}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>

    );
};