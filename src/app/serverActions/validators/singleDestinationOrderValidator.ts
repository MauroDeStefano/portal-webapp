import {z} from "zod";

import {DatePickerValue, DropdownOption} from "@/app/components/Forms/AvailabilityForm/types";

export function singleDestinationOrderValidator() {
    return z.object({
        guests: z.custom<DropdownOption>(),
        dateRange: z.custom<DatePickerValue>(),
        houseID: z.number(),
    })
        .refine(data => !!data.guests?.value)
        .refine(data => !!data.dateRange?.start && !!data.dateRange?.end)
}

export type TSingleDestinationOrderFormSchema = z.infer<ReturnType<typeof singleDestinationOrderValidator>>