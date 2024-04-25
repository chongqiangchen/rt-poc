import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import {TicketType} from "@/models/schemas/ticketSchema";
import useSessionStore from "@/store/sessionStore";
import {Separator} from "@radix-ui/react-dropdown-menu";
import {useRouter} from "next/navigation";
import React from "react";
import Link from "next/link";

export default function TicketContent({ticket}: { ticket: TicketType }) {
    const router = useRouter();
    const {sessionId, currentRelatedTicketId} = useSessionStore();
    const {mutate: updateSession} = useUpdateSession();
    return (
        <div className="flex-1">
            <div className="flex justify-between items-center min-h-12">
                <h3>Ticket content</h3>
                <Button
                    size="sm"
                    onClick={() => {
                        updateSession({
                            sessionId,
                            updateField: {
                                currentTicket: {
                                    ticket_id: currentRelatedTicketId,
                                    end_time: new Date(),
                                },
                            },
                        }, {
                            onSuccess: () => {
                                router.push("/ticket");
                            }
                        });
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
                        >
                            Ticket: {ticket.ticket_content.ticket_title}
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        {/*TODO*/}
                        <i>Group: {ticket.group}, Category: {ticket.topic}, </i>
                        <i>Date: 2024/04/08</i>
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
