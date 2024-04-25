import { Schema, model, models } from "mongoose";

const responseSchema = new Schema({
  answer: { type: String, required: true },
});

const knowledgeSchema = new Schema({
  rank: { type: Number, required: true },
  source: { type: String, required: true },
  content: { type: String, required: true },
  metadata: {
    title: String,
    category: String,
    link: String,
  },
});

const ticketSchema = new Schema({
  _id: { type: String, required: true },
  ticket_id: { type: String, required: true },
  group: { type: String, required: true },
  topic: { type: String, required: true },
  ticket_content: {
    ticket_title: { type: String, required: true },
    ticket_description: { type: String, required: true },
    ticket_link: String,
    previous_response: String,
  },
  response: [responseSchema],
  related_knowledge: [knowledgeSchema],
});

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
