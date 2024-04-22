import { TicketType } from "@/models/schemas/ticketSchema";

import Knowledge from "./knowledge";
import { SourceFilter } from "@/components/sourceFilter";
import { useState } from "react";
import { sources } from "../../data/data";

export default function Knowledges({ ticket }: { ticket: TicketType }) {
  const [knowledges, setKnowledges] = useState(ticket.related_knowledge);

  return (
    <div style={{ width: "clamp(20rem, 40vw, 38rem)" }}>
      <div className="flex gap-4 items-center min-h-12">
        <h3>Related knowledge</h3>
        <SourceFilter
          knowledges={ticket.related_knowledge}
          title="Source"
          options={sources}
          setKnowledges={setKnowledges}
        />
      </div>

      <ul className="space-y-2">
        {knowledges.map((knowledge) => {
          return <Knowledge knowledge={knowledge} key={knowledge._id} />;
        })}
      </ul>
    </div>
  );
}
