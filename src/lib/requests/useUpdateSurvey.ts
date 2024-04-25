import {useMutation} from "@tanstack/react-query";
import {SurveyType, TicketFlagType} from "@/models/schemas/sessionSchema";
import axiosInstance from "@/lib/axiosInstance";

const updateSurvey = (
    {
        sessionId,
        updateField,
    }: {
        sessionId: string;
        updateField: SurveyType
    }
) => {
    return axiosInstance.post(`/sessions/${sessionId}/survey`, updateField);
}

export default function useUpdateSurvey() {
    return useMutation({
        mutationKey: ["survey"],
        mutationFn: updateSurvey,
    });
}