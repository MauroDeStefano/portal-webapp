'use client';

import {HTMLProps, lazy, Suspense, useMemo} from 'react';

export {default as BedIcon} from '@/assets/icons/features/bed.svg'
export {default as CheckinIcon} from '@/assets/icons/features/checkin.svg'
export {default as CheckoutIcon} from '@/assets/icons/features/checkout.svg'
export {default as CrossroadsIcon} from '@/assets/icons/features/crossroads.svg'
export {default as CrossIcon} from '@/assets/icons/features/cross.svg'
export {default as CupIcon} from '@/assets/icons/features/cup.svg'
export {default as DropIcon} from '@/assets/icons/features/drop.svg'
export {default as GlassIcon} from '@/assets/icons/features/glass.svg'
export {default as HouseIcon} from '@/assets/icons/features/house.svg'
export {default as KitchenIcon} from '@/assets/icons/features/kitchen.svg'
export {default as ParkingIcon} from '@/assets/icons/features/parking.svg'
export {default as ShowerIcon} from '@/assets/icons/features/shower.svg'
export {default as TempIcon} from '@/assets/icons/features/temp.svg'
export {default as ToiletIcon} from '@/assets/icons/features/toilet.svg'
export {default as TreesIcon} from '@/assets/icons/features/trees.svg'
export {default as StumpIcon} from '@/assets/icons/features/stump.svg'
export {default as RoadIcon} from '@/assets/icons/features/road.svg'
export {default as MarmeladeIcon} from '@/assets/icons/features/marmelade.svg'
export {default as EnergyIcon} from '@/assets/icons/features/energy-green.svg'
export {default as MoneyIcon} from '@/assets/icons/money.svg'
export {default as MountainIcon} from '@/assets/icons/features/mountain.svg'
export {default as SettingsIcon} from '@/assets/icons/settings.svg'
export {default as ShackingHandsIcon} from '@/assets/icons/shacking-hands.svg'
export {default as ShoutIcon} from '@/assets/icons/shout.svg'
export {default as CheckMarkCircleIcon} from '@/assets/icons/checkmark-circle.svg'
export {default as CheckMarkIcon} from '@/assets/icons/checkmark.svg'
export {default as SoundIcon} from '@/assets/icons/features/sound.svg'
export {default as KeyIcon} from '@/assets/icons/features/key.svg'
export {default as ArrowBack} from '@/assets/icons/arrow-back.svg'
export {default as ArrowUpIcon} from '@/assets/icons/arrow-up.svg'
export {default as ArrowForwardIcon} from '@/assets/icons/arrow-forward.svg'
export {default as CloseIcon} from '@/assets/icons/close.svg'
export {default as HamburgerIcon} from '@/assets/icons/hamburger.svg'
export {default as FrilandRoundLogoIcon} from "@/assets/icons/friland-round-logo.svg";
export {default as MinusIcon} from '@/assets/icons/minus.svg'
export {default as AddIcon} from '@/assets/icons/add.svg'
export {default as DeleteCircled} from '@/assets/icons/x-circled.svg'
export {default as LocationIcon} from '@/assets/icons/features/location.svg'
export {default as ParkIcon} from '@/assets/icons/features/parking.svg'
export {default as PetIcon} from '@/assets/icons/features/pet-friendly.svg'

interface LazyIconProps extends HTMLProps<HTMLElement> {
    icon: string,
}

export function LazyIcon({icon, ...props}: LazyIconProps) {
    const IconComponent = useMemo(() =>
            lazy(() => import(`@/../public/icons/${icon}`)),
        []);

    return (
        <Suspense>
            <IconComponent {...props}/>
        </Suspense>
    );
}