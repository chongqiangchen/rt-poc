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
    <div>
      {isLoadingTickets ? (
        <span>loading</span>
      ) : isTicketsError ? (
        <span>ticket error</span>
      ) : (
        tickets?.map((ticket) => <div key={ticket.id}>{ticket.title}</div>)
      )}
    </div>
  );
}
