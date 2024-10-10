import type {Meta, StoryObj} from '@storybook/react';

import OneButtonToRuleThemAll from "@/app/components/buttons/OneButtonToRuleThemAll";

const meta: Meta<typeof OneButtonToRuleThemAll> = {
    component: OneButtonToRuleThemAll,
};

export default meta;

type Story = StoryObj<typeof OneButtonToRuleThemAll>;

export const SimpleButtonWithIcon: Story = {
    args: {
        tagName: 'button',
        icon: '×'
    },
    parameters: {}
};

export const ButtonWithIconAndLabel: Story = {
    args: {
        tagName: 'button',
        icon: '×',
        children: 'Close',
    },
    parameters: {}
};


export const ButtonWithIconAndLabelNoHover: Story = {
    args: {
        tagName: 'button',
        icon: '×',
        children: 'Close',
        hoverEffect: 'background',
    },
    parameters: {}
};
