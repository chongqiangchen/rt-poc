// models/Session.ts
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  startTime: { type: Date, required: true, default: Date.now },
});

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
