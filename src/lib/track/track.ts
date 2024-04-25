export enum EEventAction {
    CLICK = "CLICK"
}

export enum ETicketEventName {
    TICKET_LINK_CLICK = 'TICKET_LINK_CLICK',
    SOURCE_LINK_CLICK = 'SOURCE_LINK_CLICK',
    SOURCE_SHOW_MORE = 'SOURCE_SHOW_MORE',
    SOURCE_THUMBS_CLICK = 'SOURCE_THUMBS_CLICK',
    RESPONSE_SWITCH = 'RESPONSE_SWITCH',
    RESPONSE_COPY = 'RESPONSE_COPY'
}

export type TTicketEventData =
    TTicketLinkClickEventParams |
    TSourceLinkClickEventParams |
    TSourceShowMoreEventParams |
    TSourceThumbsClickEventParams |
    TResponseSwitchEventParams |
    TResponseCopyEventParams

export type TTicketLinkClickEventParams = {
    url: string;
}

export type TSourceLinkClickEventParams = {
    url: string;
    rank: number;
    _id: string;
}

export type TSourceShowMoreEventParams = {
    _id: string; // db source id
    rank: number;
}

export type TSourceThumbsClickEventParams = {
    _id: string;
    rank: number;
    type: 'up' | 'down';
}

export type TResponseSwitchEventParams = {
    targetResponseId: string;
    targetId: string;
    type: 'prev' | 'next';
}

export type TResponseCopyEventParams = {
    targetResponseId: string;
    targetId: string;
}
