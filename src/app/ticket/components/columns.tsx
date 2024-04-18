"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ModifiedTicketType } from "@/models/schemas/ticketSchema";

export const columns: ColumnDef<ModifiedTicketType>[] = [
  {
    accessorKey: "ticket_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("ticket_id")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "ticket_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("ticket_title")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("group")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      console.log(row, id, value, row.getValue(id), "in filter fun");

      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
];
