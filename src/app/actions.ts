"use server";

import connectDb from "@/lib/conncetDb";
import Ticket from "@/models/Ticket";

export async function startSession(userEmail: string) {
  console.log(userEmail);
}
export async function getTickets() {
  await connectDb();

  try {
    const tickets = await Ticket.find({});
    return JSON.stringify(tickets);
  } catch (error) {
    return [];
  }
}
