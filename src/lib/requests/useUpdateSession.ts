import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const updateSession = ({
  sessionId,
  updateField,
}: {
  sessionId: string;
  updateField: Record<string, any>;
}) => axiosInstance.patch(`/sessions/${sessionId}`, updateField);

export default function useUpdateSession() {
  return useMutation({
    mutationKey: ["session"],
    mutationFn: updateSession,
  });
}
