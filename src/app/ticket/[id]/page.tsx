"use client";
import {useTicketById} from "@/lib/requests/useTickets";

import TicketContent from "../components/ticket/ticketContent";
import Response from "../components/ticket/response";
import Knowledges from "../components/ticket/knowledges";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import {useEffect, useRef} from "react";
import useSessionStore from "@/store/sessionStore";

export default function Page({params}: { params: { id: string } }) {
    const {
        data: ticket,
        isPending: isLoadingTicket,
        isError: isGettingTicketError,
    } = useTicketById(params.id);
    const {sessionId, currentRelatedTicketId} = useSessionStore();
    const {mutate: updateSession} = useUpdateSession();

    const firstRenderRef = useRef<boolean>(true);

    useEffect(() => {
        return () => {
            console.log('unmount', firstRenderRef.current)
            if (!firstRenderRef.current) {

                updateSession({
                    sessionId,
                    updateField: {
                        currentTicket: {
                            ticket_id: currentRelatedTicketId,
                            end_time: new Date(),
                        },
                    },
                });
            }

            firstRenderRef.current = false;
        }
    }, []);

    return (
        <div className="bg-secondary min-h-screen h-auto p-6">
            {isLoadingTicket ? (
                <span>Loading...</span>
            ) : isGettingTicketError ? (
                <span>getting ticket error</span>
            ) : (
                <div className="flex gap-4 justify-between">
                    <TicketContent ticket={ticket}/>
                    <Knowledges ticket={ticket}/>

                    <div style={{width: "clamp(20rem, 30vw, 38rem)"}}>
                        <div className="min-h-12 flex items-center">
                            <h3>Suggested responses</h3>
                        </div>
                        <Response ticket={ticket}/>
                    </div>
                </div>
            )}
        </div>
    );
}
