import Header from "@/components/header";
import { InputForm } from "@/components/startSessionForm";
import TicketLists from "@/components/ticketLists";

export default function Home() {
  return (
    <div>
      <Header />
      <InputForm />
      <TicketLists />
    </div>
  );
}
