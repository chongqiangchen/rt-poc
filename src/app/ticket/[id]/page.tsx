"use client";
import { useTicketById } from "@/lib/requests/useTickets";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Knowledge from "../components/ticket/knowledge";
import TicketContent from "../components/ticket/ticketContent";
import Response from "../components/ticket/response";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: ticket,
    isPending: isLoadingTicket,
    isError: isGettingTicketError,
  } = useTicketById(params.id);
  const router = useRouter();
  return (
    <div className="bg-secondary min-h-screen h-auto p-6">
      {isLoadingTicket ? (
        <span>Loading...</span>
      ) : isGettingTicketError ? (
        <span>getting ticket error</span>
      ) : (
        <div className="flex gap-4 justify-between">
          <TicketContent ticket={ticket} />
          <div style={{ width: "clamp(20rem, 40vw, 38rem)" }}>
            <h6 className="min-h-12">Related knowledge</h6>
            <ul className="space-y-2">
              {ticket.related_knowledge.map((knowledge) => {
                return <Knowledge knowledge={knowledge} key={knowledge._id} />;
              })}
            </ul>
          </div>
          <div style={{ width: "clamp(20rem, 40vw, 38rem)" }}>
            <h6 className="min-h-12">Suggested responses</h6>
            <Response ticket={ticket} />
          </div>
        </div>
      )}
    </div>
  );
}
