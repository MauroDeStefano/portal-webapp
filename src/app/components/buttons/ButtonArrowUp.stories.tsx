import type {Meta, StoryObj} from '@storybook/react';

import ButtonArrowUp from "@/app/components/buttons/ButtonArrowUp";

const meta: Meta<typeof ButtonArrowUp> = {
    component: ButtonArrowUp,
};

export default meta;

type Story = StoryObj<typeof ButtonArrowUp>;

export const DefaultButton: Story = {
    args: {
        icon: '×'
    },
    parameters: {}
};

export const PlainButton: Story = {
    args: {
        tagName: 'button',
        icon: '×'
    },
    parameters: {}
};

export const SubmitButton: Story = {
    args: {
        tagName: 'button',
        type: 'submit',
        icon: '×'
    },
    parameters: {}
};

export const Anchor: Story = {
    args: {
        icon: '×',
        tagName: 'a',
        href: 'https://www.google.com',
        target: '_blank'
    },
};
