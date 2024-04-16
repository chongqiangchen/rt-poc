"use client";
import useTickets from "@/lib/requests/useTickets";
import React from "react";

export default function TicketLists() {
  const {
    data: tickets,
    isLoading: isLoadingTickets,
    isError: isTicketsError,
  } = useTickets();
  return (
    <div className="flex-1 place-self-center">
      {isLoadingTickets ? (
        <span>loading</span>
      ) : isTicketsError ? (
        <span>ticket error</span>
      ) : (
        tickets?.map((ticket) => (
          <div key={ticket.ticket_id}>{ticket.ticket_content.ticket_title}</div>
        ))
      )}
    </div>
  );
}
