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
    dbSourceId: string;
}

export type TSourceShowMoreEventParams = {
    dbSourceId: string; // source db source id
    rank: number;
}

export type TSourceThumbsClickEventParams = {
    dbSourceId: string;
    rank: number;
    type: 'up' | 'down';
}

export type TResponseSwitchEventParams = {
    currentResponseId: string;
    targetResponseId: string;
    dbTargetId: string;
    dbCurrentId: string;
    type: 'prev' | 'next';
}

export type TResponseCopyEventParams = {
    currentResponseId: string;
    dbCurrentId: string;
}
