import {useTranslations} from "next-intl";

import Card from "@/app/components/Card";
import CTA6, {CTA6Link} from "@/app/sections/CTA6";

export default function HelpBox() {
    const t = useTranslations('Reservation');

    return (
        <Card variant='card-1--green'>
            <div style={{maxWidth: '57rem'}}>
                <CTA6 title={t('help_box.title')} text={t('help_box.text')}>
                    <CTA6Link href='/faq' label={t('help_box.cta.1.label')}/>
                    <CTA6Link href='/contact' label={t('help_box.cta.2.label')}/>
                </CTA6>
            </div>
        </Card>
    )
}