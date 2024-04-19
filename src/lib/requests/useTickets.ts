import { type TicketType } from "@/models/schemas/ticketSchema";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const fetchTickets = (): Promise<TicketType[]> =>
  axiosInstance.get("/tickets").then((response) => {
    return response.data;
  });

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });
}

export function useTicketById(id: string) {
  return useQuery<TicketType>({
    queryKey: ["ticket", id],
    queryFn: () => {
      return axiosInstance.get(`/tickets/${id}`).then((response) => {
        return response.data;
      });
    },
  });
}
