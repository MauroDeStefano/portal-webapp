import type {Preview} from "@storybook/react";
import 'normalize.css'
import '@/assets/styles/styles.scss'
import '@/assets/styles/tailwind.css';
import {NextIntlClientProvider} from "next-intl";

const preview: Preview = {
    decorators: [
        (Story) => {
            return (
                <NextIntlClientProvider locale='en' messages={{
                    messages: {}
                }}>
                    <Story/>
                </NextIntlClientProvider>
            );
        },
    ],

};

export default preview;
