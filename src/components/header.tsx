"use client";
import useSessionStore from "@/store/sessionStore";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
  const { email, resetSession } = useSessionStore();
  return (
    <div>
      {email}
      <Button onClick={() => resetSession()}>End session</Button>
    </div>
  );
}
