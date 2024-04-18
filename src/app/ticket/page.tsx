import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import useTickets from "@/lib/requests/useTickets";
import {
  ModifiedTicketType,
  ticketSchema,
} from "@/models/schemas/ticketSchema";

async function getTickets() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/ticket/data/tickets_v1.json")
  );

  const tickets = JSON.parse(data.toString());
  const parsedTickets = z.array(ticketSchema).parse(tickets);

  return parsedTickets.map((ticket) => {
    return {
      ticket_id: ticket.ticket_id,
      group: ticket.group,
      ticket_title: ticket.ticket_content.ticket_title,
    } satisfies ModifiedTicketType;
  });
}

export default async function TaskPage() {
  // const {
  //   data: tickets,
  //   isLoading: isLoadingTickets,
  //   isError: isTicketsError,
  // } = useTickets();

  const tickets = await getTickets();

  return (
    <div className="h-full flex-1 flex-col p-8 flex">
      <DataTable data={tickets} columns={columns} />
    </div>
  );
}
