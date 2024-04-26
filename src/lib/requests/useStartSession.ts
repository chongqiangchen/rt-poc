import {useMutation, useQuery} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import {SessionType} from "@/models/schemas/sessionSchema";

const createSession = (
    {
        email,
    }: SessionType
): Promise<{ sessionId: string }> =>
    axiosInstance.post("/sessions", {email}).then((response) => {
        return response.data;
    });

const getSession = (
    {
        sessionId
    }: { sessionId: string }): Promise<SessionType & { _id: string }> =>
    axiosInstance.get(`/sessions/${sessionId}`).then((response) => {
        return response.data;
    });

export default function useStartSession() {
    return useMutation({
        mutationKey: ["session"],
        mutationFn: createSession,
    });
}

export function useGetSession(sessionId: string) {
    return useQuery({
        queryKey: ["session", sessionId],
        queryFn: () => getSession({sessionId}),
        enabled: !!sessionId,
    })
}
