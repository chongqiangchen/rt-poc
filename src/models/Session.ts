import mongoose, { Schema } from "mongoose";

const flagSchema = new Schema({
  reason: [String],
  additional_comments: String,
});

const actionSchema = new Schema({
  response_id: { type: Schema.Types.ObjectId, ref: "Ticket.responses" },
  copy: Boolean,
  try_again: Boolean,
  flag_poor_response: flagSchema,
});

const ticketSchema = new Schema({
  ticket_id: { type: String, ref: "Ticket", required: true },
  start_time: Number,
  end_time: Number,
  actions: [actionSchema],
  jump_to_source: Boolean,
  knowledge_base_rate: [
    {
      knowledge_id: {
        type: Schema.Types.ObjectId,
        ref: "Ticket.related_knowledges",
      },
      evaluation: String,
      read_more: Boolean,
      jump_to_source: Boolean,
    },
  ],
});

const surveySchema = new Schema({
  easy: Number,
  useful: Number,
  enjoyable: Number,
  additional: String,
});

const sessionSchema = new Schema({
  email: { type: String, required: true },
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date },
  survey: surveySchema,
  related_tickets: [ticketSchema],
});

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
