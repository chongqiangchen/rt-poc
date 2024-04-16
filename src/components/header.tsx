"use client";
import useSessionStore from "@/store/sessionStore";
import React from "react";
import { Button } from "./ui/button";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import { toast } from "sonner";

export default function Header() {
  const { email, resetSession, sessionId } = useSessionStore();
  const { mutate: updateSession } = useUpdateSession();
  return (
    <div className="w-full flex justify-between items-center px-4 py-4 bg-gray-300">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Ticket Assist - TRIAL POC V0.1
      </h3>
      {sessionId && (
        <div className="space-x-2">
          <span>{email}</span>
          <Button
            onClick={() => {
              updateSession(
                {
                  sessionId,
                  updateField: { endTime: new Date() },
                },
                {
                  onSuccess: () => {
                    resetSession();
                  },
                  onError: () => {
                    toast.error("Log out failed, please try again");
                  },
                }
              );
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
