"use client";
import useSessionStore from "@/store/sessionStore";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
  const { email, resetSession, sessionId } = useSessionStore();
  return (
    <div className="w-full flex justify-between items-center px-4 py-4 bg-gray-300">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Ticket Assist - TRIAL POC V0.1
      </h3>
      {sessionId && (
        <div className="space-x-2">
          <span>{email}</span>
          <Button onClick={() => resetSession()}>End session</Button>
        </div>
      )}
    </div>
  );
}
