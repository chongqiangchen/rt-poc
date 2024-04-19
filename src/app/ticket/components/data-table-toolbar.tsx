"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { groups, topics } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="flex justify-center items-center">
          <div>Ticket reference</div>
          <Input
            placeholder="Start typing a ticket number to lookup a ticket"
            value={
              (table.getColumn("ticket_title")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("ticket_title")
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[350px]"
          />
        </div>
        {table.getColumn("group") && (
          <DataTableFacetedFilter
            column={table.getColumn("group")}
            title="Group"
            options={groups}
          />
        )}
        {table.getColumn("topic") && (
          <DataTableFacetedFilter
            column={table.getColumn("topic")}
            title="Topic"
            options={topics}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
