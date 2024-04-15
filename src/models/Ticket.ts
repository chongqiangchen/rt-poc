import mongoose from "mongoose";

const relatedKnowledgeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  link: String,
  content: String,
  source: String,
});

const generatedResponseSchema = new mongoose.Schema({
  id: Number,
  content: String,
});

const ticketSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  relatedKnowledge: [relatedKnowledgeSchema],
  generatedResponses: [generatedResponseSchema],
});

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
