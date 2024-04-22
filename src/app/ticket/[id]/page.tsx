"use client";
import { useTicketById } from "@/lib/requests/useTickets";

import TicketContent from "../components/ticket/ticketContent";
import Response from "../components/ticket/response";
import Knowledges from "../components/ticket/knowledges";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: ticket,
    isPending: isLoadingTicket,
    isError: isGettingTicketError,
  } = useTicketById(params.id);

  return (
    <div className="bg-secondary min-h-screen h-auto p-6">
      {isLoadingTicket ? (
        <span>Loading...</span>
      ) : isGettingTicketError ? (
        <span>getting ticket error</span>
      ) : (
        <div className="flex gap-4 justify-between">
          <TicketContent ticket={ticket} />
          <Knowledges ticket={ticket} />

          <div style={{ width: "clamp(20rem, 40vw, 38rem)" }}>
            <div className="min-h-12 flex items-center">
              <h3>Suggested responses</h3>
            </div>
            <Response ticket={ticket} />
          </div>
        </div>
      )}
    </div>
  );
}
