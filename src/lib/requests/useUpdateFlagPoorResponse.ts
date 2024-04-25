import {useMutation} from "@tanstack/react-query";
import {TicketFlagType} from "@/models/schemas/sessionSchema";
import axiosInstance from "@/lib/axiosInstance";


const updateFlagPoorResponse = (
    {
        sessionId,
        updateField,
    }: {
        sessionId: string;
        updateField: TicketFlagType & {related_ticket_id: string}
    }
) => {
    return axiosInstance.post(`/sessions/${sessionId}/flag-poor-response`, updateField);
}

export default function useUpdateFlagPoorResponse() {
    return useMutation({
        mutationKey: ["flag_poor_response"],
        mutationFn: updateFlagPoorResponse,
    });
}