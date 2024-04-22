"use client";

import { InputForm } from "@/components/startSessionForm";
import useSessionStore from "@/store/sessionStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { sessionId } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      router.push("/ticket");
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="grid w-full flex-1">
        <InputForm />
      </div>
    </div>
  );
}
