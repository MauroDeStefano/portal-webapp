export type FBEventPayload = {
    content_ids?: number[],
    contents?: FBEventPayloadItem[],
    content_type?: string
    currency?: string
    value?: number,
    order_id?: string
}

export type GAEventPayload = {
    transaction_id?: string,
    currency?: string,
    value?: number,
    items?: GAEventPayloadItem[]

}

export type FBEventPayloadItem = {
    id: number,
    quantity: number,
    item_price: number
}

export type GAEventPayloadItem = {
    item_id: number,
    item_name: string,
    discount?: number,
    price: number,
    quantity: number
}