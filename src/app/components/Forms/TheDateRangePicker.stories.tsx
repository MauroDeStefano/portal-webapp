import type {Meta, StoryObj} from '@storybook/react';
import {addDays, formatISO, startOfToday} from "date-fns";
import {toZonedTime,} from "date-fns-tz";

import TheDateRangePicker from "@/app/components/Forms/TheDateRangePicker";
import {AvailabilityDate} from "@/types";

import '@/assets/styles/react-datepicker.css'


const meta: Meta<typeof TheDateRangePicker> = {
    component: TheDateRangePicker,
};

export default meta;

type Story = StoryObj<typeof TheDateRangePicker>;

export const Basic: Story = {
    decorators: [
        (Story) => {
            return (
                <div style={{width: '100%', maxWidth: '800px'}}>
                    <Story/>
                </div>
            )
        }
    ],
    args: {},
    parameters: {}
};

function JsonToString({json}: { json: any }) {
    return json.map((item: any, i: number) => {
        item.date = formatISO(item.date);
        return <pre key={i}>{JSON.stringify(item, null, 4)}</pre>;
    })
}


const today = toZonedTime(startOfToday(), Intl.DateTimeFormat().resolvedOptions().timeZone);
let availableDates: AvailabilityDate[] = [];

availableDates = [
    {
        id: '',
        date: addDays(today, 1),
        vacancy: false,
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
    },

    {
        id: '',
        date: addDays(today, 3),
        vacancy: false,
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
    },

    {
        id: '',
        date: addDays(today, 10),
        vacancy: true,
        no_check_in: true,
        no_check_out: false,
        no_gift_card: false,
    },

    {
        id: '',
        date: addDays(today, 13),
        vacancy: true,
        no_check_in: true,
        no_check_out: false,
        no_gift_card: false,
    },

    {
        id: '',
        date: addDays(today, 15),
        vacancy: true,
        no_check_in: false,
        no_check_out: true,
        no_gift_card: false,
    },

    {
        id: '',
        date: addDays(today, 18),
        vacancy: true,
        no_check_in: false,
        no_check_out: true,
        no_gift_card: false,
    },

    {
        id: '',
        date: addDays(today, 20),
        vacancy: true,
        no_check_in: true,
        no_check_out: true,
        no_gift_card: false,
    },

    {
        id: '',
        date: addDays(today, 25),
        vacancy: true,
        no_check_in: true,
        no_check_out: true,
        no_gift_card: false,
    },
];
export const DateAvailability: Story = {
    decorators: [
        (Story) => {
            return (
                <div style={{width: '100%', maxWidth: '800px'}}>
                    <Story/>
                    <hr/>
                    <JsonToString json={availableDates}/>
                </div>
            )
        }
    ],
    args: {
        availableDates
    },
    parameters: {}
};

availableDates = [
    {
        id: 'TODAY',
        date: addDays(today, 5),
        vacancy: false,
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
    },

    {
        id: 'TODAY - 1',
        date: addDays(today, 4),
        vacancy: true,
        no_check_in: true,
        no_check_out: false,
        no_gift_card: false,
    },


    /// consecutive disabled days shouldn't be enable
    {
        id: 'TODAY',
        date: addDays(today, 10),
        vacancy: false,
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
    },

    {
        id: 'TODAY+1',
        date: addDays(today, 11),
        vacancy: false,
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
    },

    {
        id: 'TODAY+2',
        date: addDays(today, 12),
        vacancy: false,
        no_check_in: true,
        no_check_out: false,
        no_gift_card: false,
    },


    {
        id: '',
        date: addDays(today, 27),
        vacancy: true,
        no_check_in: true,
        no_check_out: false,
        no_gift_card: false,
    }
];

export const DateAvailabilityExtraConditionals: Story = {
    decorators: [
        (Story) => {
            return (
                <div style={{width: '100%', maxWidth: '800px'}}>
                    <Story/>
                    <hr/>
                    <JsonToString json={availableDates}/>
                </div>
            )
        }
    ],
    args: {
        availableDates
    },
    parameters: {}
};


availableDates = [
    {
        id: 'TODAY',
        date: addDays(today, 1),
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
        vacancy: false,
    },

    {
        id: 'TODAY + 1',
        date: addDays(today, 2),
        vacancy: true,
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
    },
    {
        id: 'TODAY +3',
        date: addDays(today, 3),
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
        vacancy: false,
    },
    {
        id: 'TODAY +4',
        date: addDays(today, 4),
        no_check_in: false,
        no_check_out: false,
        no_gift_card: false,
        vacancy: true,
    },
];

export const DateAvailabilityExtraWronglyDisabled: Story = {
    decorators: [
        (Story) => {
            return (
                <div style={{width: '100%', maxWidth: '800px'}}>
                    <Story/>
                    <hr/>
                    <JsonToString json={availableDates}/>
                </div>
            )
        }
    ],
    args: {
        availableDates
    },
    parameters: {}
};
