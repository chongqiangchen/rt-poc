"use client";

import Header from "@/components/header";
import { InputForm } from "@/components/startSessionForm";
import TicketLists from "@/components/ticketLists";
import useSessionStore from "@/store/sessionStore";

export default function Home() {
  const { sessionId } = useSessionStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <div className="grid w-full flex-1">
        {!!sessionId ? <TicketLists /> : <InputForm />}
      </div>
    </div>
  );
}
