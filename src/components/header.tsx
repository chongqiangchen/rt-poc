"use client";
import useSessionStore from "@/store/sessionStore";
import React from "react";
import { Button } from "./ui/button";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Headset } from "lucide-react";

export default function Header() {
  const { email, resetSession, sessionId } = useSessionStore();
  const { mutate: updateSession } = useUpdateSession();
  const router = useRouter();
  return (
    <div className="w-full flex justify-between items-center px-8 py-2 bg-gray-300 min-h-16">
      <section className="flex justify-center items-center space-x-2">
        <Headset className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Ticket Assist - TRIAL POC V0.1
        </h3>
      </section>
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
                    router.push("/");
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
