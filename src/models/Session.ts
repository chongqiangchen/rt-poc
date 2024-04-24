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
  start_time: { type: Date, required: true },
  end_time: { type: Date, default: undefined },
  actions: {
    type: [
      {
        response_id: {
          type: Schema.Types.ObjectId,
          ref: "Ticket.responses",
          default: undefined,
        },
        copy: { type: Boolean, default: false },
        try_again: { type: Boolean, default: false },
        flag_poor_response: {
          reason: { type: [String], default: [] },
          additional_comments: { type: String, default: "" },
        },
      },
    ],
    default: [],
  },
  jump_to_source: { type: Boolean, default: false },
  knowledge_base_rate: {
    type: [
      {
        knowledge_id: {
          type: Schema.Types.ObjectId,
          ref: "Ticket.related_knowledges",
          default: undefined,
        },
        evaluation: { type: String, default: "" },
        read_more: { type: Boolean, default: false },
        jump_to_source: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
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
