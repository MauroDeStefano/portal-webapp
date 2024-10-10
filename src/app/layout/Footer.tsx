import React from "react";
import {Link} from "@i18n/config";
import {autop} from "@wordpress/autop";
import {getTranslations} from "next-intl/server";

import {FooterLanguagePicker} from "@/app/components/LanguagePickers";
import FooterNewsletterBox from "@/app/layout/FooterNewsletterBox";
import FrilandLogo from "@/assets/icons/friland-round-logo.svg";
import Social__Facebook from "@/assets/icons/logo-facebook.svg";
import Social__Instagram from "@/assets/icons/logo-instagram.svg";
import Social__LinkedIn from "@/assets/icons/logo-linkedin.svg";
import ConsentAwareComponent from "@/app/components/Iubenda/ConsentAwareComponent";
import {IubendaProvider} from "@mep-agency/next-iubenda";
import {iubendaBannerConfig} from "@/app/config/iubenda";

const SOCIAL_NETWORKS = {
    instagram: 'https://www.instagram.com/friland.wild/',
    facebook: 'https://www.facebook.com/frilandwild',
    linkedin: 'https://www.linkedin.com/company/fri-land/',
};


type Props = {};
export default async function Footer(props: Props) {
    const t = await getTranslations('Footer');
    const t_nav = await getTranslations('Navigation');

    return (
        <section className="footer">
            <div className="footer__container fl-container">
                <div className="footer__units-wrapper">

                    <div className="footer__unit-one">
                        <div className="footer__branding">
                            <FrilandLogo className="footer__logo"/>

                            <div className="footer__language--mobile">
                                <FooterLanguagePicker/>
                            </div>
                        </div>

                        <div className="footer__nav">
                            <div className="footer__nav-unit">
                                <h4 className="footer__nav-title text--13">{t('titles.nav1')}</h4>
                                <ul className="footer__nav-list">
                                    <li className="footer__nav-item">
                                        <Link className="footer__nav-link text--13"
                                              href="/about">{t_nav('project')}</Link>
                                    </li>
                                    <li className="footer__nav-item">
                                        <Link className="footer__nav-link text--13"
                                              href="/partners">{t_nav('become_partner')}</Link>
                                    </li>
                                    <li className="footer__nav-item">
                                        <Link className="footer__nav-link text--13"
                                              href="/companies-services">{t_nav('services')}</Link>
                                    </li>
                                </ul>
                            </div>


                            <div className="footer__nav-unit">
                                <h4 className="footer__nav-title text--13">{t('titles.nav2')} </h4>
                                <ul className="footer__nav-list">
                                    <li className="footer__nav-item">
                                        <Link className="footer__nav-link text--13"
                                              href="/contact">{t_nav('contact')}</Link>
                                    </li>
                                    <li className="footer__nav-item">
                                        <Link href='/faq' className="footer__nav-link text--13">{t_nav('faq')}</Link>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="footer__company-info text--12 mcb-0"
                             dangerouslySetInnerHTML={{__html: autop(t('company_info'))}}/>

                        <div className="footer__legal">
                            <div className="footer__language--desktop">
                                <FooterLanguagePicker/>
                            </div>

                            <ul className="footer__legal-list">
                                <li className="footer__legal-item">
                                    <Link
                                        className="footer__legal-link text--12" rel="noopener" target="_blank"
                                        href="/privacy">{t_nav('privacy')}</Link>
                                </li>

                                <ConsentAwareComponent />

                                <li className="footer__legal-item">
                                    <Link
                                        className="footer__legal-link text--12" rel="noopener"  target="_blank"
                                        href="/terms-of-use">{t_nav('terms')}</Link>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className="footer__unit-two">
                        <div className="footer__newsletter">
                            <FooterNewsletterBox/>
                        </div>

                        <div className="footer__social">
                            <ul className="footer__social-list">
                                <li className="footer__social-item">
                                    <a className="button-2 footer__social-button"
                                       href={SOCIAL_NETWORKS.instagram} rel="noopener" target="_blank" role="button">
                                        <div className="button-2__icon">
                                            <Social__Instagram/>
                                        </div>
                                    </a>
                                </li>

                                <li className="footer__social-item">
                                    <a className="button-2 footer__social-button"
                                       href={SOCIAL_NETWORKS.facebook} rel="noopener" target="_blank" role="button">
                                        <div className="button-2__icon">
                                            <Social__Facebook/>
                                        </div>
                                    </a>
                                </li>

                                <li className="footer__social-item">
                                    <a className="button-2 footer__social-button" rel="noopener" target="_blank"
                                       href={SOCIAL_NETWORKS.linkedin}
                                       role="button">
                                        <div className="button-2__icon">
                                            <Social__LinkedIn/>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </section>

    );
};