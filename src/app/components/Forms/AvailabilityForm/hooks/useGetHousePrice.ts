import {useEffect, useState} from "react"
import {useWatch} from "react-hook-form";

import {useGetHousePriceInDateRange} from "@/app/api-integration/house-price";
import {THousePriceInDateRange} from "@/app/api-integration/normalizer/housePriceInDateRange";
import {TSingleDestinationOrderFormSchema} from "@/app/serverActions/validators/singleDestinationOrderValidator";


export function useGetHousePrice({control}: {
    control: any
}): [boolean, THousePriceInDateRange] {
    const has_pet = false;

    const fetchPrice = useGetHousePriceInDateRange();
    const formWatch = useWatch<TSingleDestinationOrderFormSchema>({control})
    const [isBusy, setBusy] = useState(false);
    const [price, setPrice] = useState({} as THousePriceInDateRange);

    useEffect(() => {
        if (!formWatch.guests || !formWatch.dateRange?.start || !formWatch.houseID) {
            return;
        }

        setBusy(true);

        fetchPrice(
            formWatch.houseID,
            formWatch.dateRange,
            has_pet
        )
            .then((price) => {
                setPrice(price);
            }).finally(() => {
            setBusy(false)
        })
    }, [formWatch]);

    return [
        isBusy,
        price,
    ];
}