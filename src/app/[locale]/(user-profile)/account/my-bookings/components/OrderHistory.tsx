'use client'

import {useTranslations} from "next-intl";

import StayOverview3 from "@/app/[locale]/(user-profile)/account/my-bookings/components/StayOverview3";
import Card, {CardAccordion} from "@/app/components/Card";
import {useAuthContext} from "@/app/contexts/AuthContext";
import {useFrilandContext} from "@/app/contexts/FrilandContext";
import CTA7 from "@/app/sections/CTA7";

type Props = {}

export default function OrderHistory(props: Props) {
    const t = useTranslations('Reservation');
    const {user} = useFrilandContext((state) => state);


    if (!user?.orders || user?.orders?.length === 0) {
        return (
            <Card>
                <CTA7 href="/destinations" title={t('no_reservation')} label={t('no_reservation_cta_label')}/>
            </Card>
        );
    }

    return (
        <>
            {user.orders.map((item, index) =>
                <Card key={item.id}>
                    <CardAccordion title={item?.destination.title}>
                        <StayOverview3 order={item}/>
                    </CardAccordion>
                </Card>
            )
            }
        </>
    )
}