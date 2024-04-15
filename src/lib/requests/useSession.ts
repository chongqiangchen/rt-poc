import { type TicketType } from "@/models/schemas/ticketSchema";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { SessionType } from "@/models/schemas/sessionSchema";

const createSession = ({
  email,
}: SessionType): Promise<{ sessionId: string }> =>
  axiosInstance.post("/sessions", { email }).then((response) => {
    return response.data;
  });

export default function useSession() {
  return useMutation({
    mutationKey: ["session"],
    mutationFn: createSession,
  });
}
