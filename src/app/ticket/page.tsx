import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

import {
  ModifiedTicketType,
  TicketType,
} from "@/models/schemas/ticketSchema";
import connectDb from "@/lib/conncetDb";
import Ticket from "@/models/Ticket";

export const dynamic = 'force-dynamic'
async function getTickets() {
  await connectDb();
  const tickets = (await Ticket.find({})) as TicketType[];
  // const parsedTickets = z.array(ticketSchema).parse(tickets);

  return tickets.map((ticket) => {
    return {
      ticket_id: ticket.ticket_id,
      group: ticket.group,
      topic: ticket.topic,
      ticket_title: ticket.ticket_content.ticket_title,
    } satisfies ModifiedTicketType;
  });
}

export default async function TaskPage() {
  const tickets = await getTickets();

  return (
    <div className="h-full flex-1 flex-col p-8 flex">
      <DataTable data={tickets} columns={columns} />
    </div>
  );
}
