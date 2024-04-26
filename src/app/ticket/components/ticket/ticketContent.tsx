import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import {TicketType} from "@/models/schemas/ticketSchema";
import useSessionStore from "@/store/sessionStore";
import {Separator} from "@radix-ui/react-dropdown-menu";
import {useRouter} from "next/navigation";
import React from "react";
import Link from "next/link";
import useTicketTrack from "@/lib/track/useTicketTrack";
import {ETicketEventName, TTicketLinkClickEventParams} from "@/lib/track/track";
import dayjs from "dayjs";

export default function TicketContent({ticket}: { ticket: TicketType }) {
    const router = useRouter();
    const {track} = useTicketTrack();

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center min-h-12">
                <h3>Ticket content</h3>
                <Button
                    size="sm"
                    onClick={() => {
                        router.push("/ticket");
                    }}
                >
                    Back
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Link
                            href={ticket.ticket_content.ticket_link || ""}
                            target="_blank"
                            className="underline decoration-dotted underline-offset-3 hover:decoration-solid cursor-pointer"
                            onClick={() => track<TTicketLinkClickEventParams>({
                                eventName: ETicketEventName.TICKET_LINK_CLICK,
                                data: {url: ticket.ticket_content.ticket_link || ""}
                            })}
                        >
                            Ticket: {ticket.ticket_content.ticket_title}
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        {/*TODO*/}
                        <i>Group: {ticket.group}, Category: {ticket.topic}, </i>
                        <i>Date: {dayjs(ticket.date).format("YYYY/MM/DD")}</i>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{ticket.ticket_content.ticket_description}</p>
                    <Separator className="my-4"/>
                </CardContent>
            </Card>
        </div>
    );
}
