type Props = {};

import LoadingIcon from "@/assets/icons/loading.svg";

export default function LoadingSpinner({size = 'medium'}: {
    size?: 'small' | 'medium' | 'large' | 'x-large'
}) {
    const sizeClass = {
        small: 'w-6 h-6',
        medium: 'w-8 h-8',
        large: 'w-12 h-12',
        'x-large': 'w-16 h-16',
    }
    return (
        <span className={`inline-block loading-spinner ${sizeClass[size]}`}>
            <LoadingIcon/>
        </span>
    );
};