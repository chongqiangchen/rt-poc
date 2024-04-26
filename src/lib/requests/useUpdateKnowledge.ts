import {useMutation} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import {KnowledgeType} from "@/models/schemas/sessionSchema";

const updateKnowledge = (
    {
        sessionId,
        updateField,
    }: {
        sessionId: string;
        updateField: KnowledgeType & { related_ticket_id: string}
    }) => axiosInstance.post(`/sessions/${sessionId}/knowledge`, updateField);

export default function useUpdateKnowledge() {
    return useMutation({
        mutationKey: ["session", "knowledge"],
        mutationFn: updateKnowledge,
    });
}
