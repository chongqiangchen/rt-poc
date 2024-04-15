import { type TicketType } from "@/models/schemas/ticketSchema";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const fetchTickets = (): Promise<TicketType[]> =>
  axiosInstance.get("/tickets").then((response) => {
    return response.data;
  });

export default function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });
}
