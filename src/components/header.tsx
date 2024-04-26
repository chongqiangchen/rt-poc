"use client";
import useSessionStore from "@/store/sessionStore";
import React, { useState } from "react";
import { Button } from "./ui/button";
import useUpdateSession from "@/lib/requests/useUpdateSession";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Headset } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FlagForm from "@/app/ticket/components/ticket/flagForm";
import SurveyForm from "./surveyForm";
import Link from "next/link";

export default function Header() {
  const { email, sessionId } = useSessionStore();
  const [isSurveyFormOpen, setIsSurveyFormOpen] = useState(false);
  return (
    <div className="w-full flex justify-between items-center px-8 py-2 bg-gray-300 min-h-16">
      <Link href="/" className="flex justify-center items-center space-x-2">
        <Headset className="w-8 h-8" />
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Ticket Assist - TRIAL POC V0.1
        </h3>
      </Link>
      {sessionId && (
        <div className="space-x-2">
          <span>{email}</span>

          <Dialog open={isSurveyFormOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setIsSurveyFormOpen(true);
                }}
              >
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <SurveyForm
                closeDialog={() => {
                  setIsSurveyFormOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
