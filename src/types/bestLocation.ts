export type TBestLocation = {
    id: number,
    title: string,
    label?: string,
    description: string
    imgDesktop: string,
    imgMobile: string
}

export type TBestLocations = {
    item: TBestLocation[]
}