import type {Meta, StoryObj} from '@storybook/react';

import ButtonLabelIcon from "@/app/components/buttons/ButtonLabelIcon";

const meta: Meta<typeof ButtonLabelIcon> = {
    component: ButtonLabelIcon,
};

export default meta;
type Story = StoryObj<typeof ButtonLabelIcon>;

export const DefaultButton: Story = {
    args: {
        children: 'Default Button',
        icon: '×'
    },
    parameters: {}
};

export const PlainButton: Story = {
    args: {
        children: 'Plain Button',
        tagName: 'button',
        icon: '×'
    },
    parameters: {}
};

export const SubmitButton: Story = {
    args: {
        children: 'Submit Button',
        tagName: 'button',
        type: 'submit',
        icon: '×'
    },
    parameters: {}
};

export const Anchor: Story = {
    args: {
        children: 'Simple A tag',
        icon: '×',
        tagName: 'a',
        href: 'https://www.google.com',
        target: '_blank'
    },
};

export const NextJsLink: Story = {
        args: {
            children: 'Link intl',
            icon: '×',
            tagName: 'link',
            href: '/contact'
        }
    }
;