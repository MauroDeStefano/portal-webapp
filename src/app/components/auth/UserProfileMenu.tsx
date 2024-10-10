import {useState} from "react";
import {useRouter} from "@i18n/config";
import {getCookie} from "cookies-next";
import {useTranslations} from "next-intl";

import {useLogout} from "@/app/api-integration/user-session";
import LinkWithPreloader from "@/app/components/buttons/LinkWithPreloader";
import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import ExitIcon from "@/assets/icons/exit.svg";
import {ORDER_COOKIE_NAME} from "@/config";


function FinishCheckout() {
    const _checkout = getCookie(ORDER_COOKIE_NAME);
    const t = useTranslations('UserProfile');

    if (!_checkout) {
        return null;
    }

    const checkout = JSON.parse(_checkout);

    return (
        <li className="header-desktop__user-nav-item">
            <LinkWithPreloader
                href="/order"
                className="header-desktop__user-nav-link font-bold">{t('profile_links.pending_checkout')}
            </LinkWithPreloader>
        </li>
    );
}

export default function UserProfileMenu() {
    const t = useTranslations('UserProfile');
    const {closeDrawer} = useFrilandContext((state) => state);
    const router = useRouter();

    const {user} = useFrilandContext((state) => state);
    const logout = useLogout();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    return (
        <nav className="header-desktop__user-nav">
            <ul className="header-desktop__user-nav-list">
                <FinishCheckout/>
                <li className="header-desktop__user-nav-item">
                    <LinkWithPreloader
                        href="/account/my-profile"
                        className="header-desktop__user-nav-link">{t('profile_links.my_profile')}
                    </LinkWithPreloader>
                </li>

                <li className="header-desktop__user-nav-item">
                    <LinkWithPreloader
                        href="/account/my-bookings"
                        className="header-desktop__user-nav-link">{t('profile_links.my_reservations')}
                    </LinkWithPreloader>
                </li>

                <li className="header-desktop__user-nav-item">
                    <LinkWithPreloader
                        href="/account/my-gift-cards"
                        className="header-desktop__user-nav-link">

                        {t('profile_links.my_gift_cards')}
                        {user?.gift_cards && user?.gift_cards.length > 0 &&
                            <span className="header-desktop__user-nav-badge">{user?.gift_cards.length}</span>
                        }
                    </LinkWithPreloader>
                </li>

                <li className="header-desktop__user-nav-item">
                    <OneButtonToRuleThemAll
                        type="button"
                        iconAlign="right"
                        icon={<ExitIcon/>}
                        background={'none'}
                        isBusy={isLoggingOut}
                        noPadding={true}
                        style={{
                            '--button-icon-size': '1em'
                        }}
                        onClick={() => {
                            setIsLoggingOut(true)
                            logout();
                            router.push('/');
                            closeDrawer();
                        }}
                        className="header-desktop__user-nav-link flex justify-between w-full">
                        {t('profile_links.logout')}
                    </OneButtonToRuleThemAll>
                </li>
            </ul>
        </nav>
    );
};