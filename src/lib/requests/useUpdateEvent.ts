import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import {TicketEventType} from "@/models/schemas/sessionSchema";

const updateEvent = (
    {
        sessionId,
        relatedTicketId,
        updateField,
    }: {
        sessionId: string;
        relatedTicketId: string;
        updateField: TicketEventType;
    }
) => {
    return axiosInstance.post(`/event/ticket`, {
        session_id: sessionId,
        related_ticket_id: relatedTicketId,
        ...updateField
    });
}

export default function useUpdateEvent() {
    return useMutation({
        mutationKey: ["event", "ticket"],
        mutationFn: updateEvent,
    });
}
