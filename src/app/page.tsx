"use client";

import Header from "@/components/header";
import { InputForm } from "@/components/startSessionForm";
import TicketLists from "@/components/ticketLists";
import useSessionStore from "@/store/sessionStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { sessionId } = useSessionStore();
  const router = useRouter();
  if (sessionId) {
    router.push("/ticket");
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="grid w-full flex-1">
        {!!sessionId ? <TicketLists /> : <InputForm />}
      </div>
    </div>
  );
}
