import mongoose, {Schema} from "mongoose";

const flagSchema = new Schema({
    response_id: {
        type: Schema.Types.ObjectId,
        ref: "Ticket.responses",
        default: undefined,
    },
    reasons: [String],
    additional_comments: String,
    otherReason: String,
});

const eventSchema = new Schema({
    name: {type: String, required: true},
    action: {type: String, required: true},
    time: {type: Date, default: new Date()},
    data: {
        type: Schema.Types.Mixed
    }
});

const ticketSchema = new Schema({
    ticket_id: {type: String, ref: "Ticket", required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, default: undefined},
    flag_poor_responses: [flagSchema],
    knowledge: {
        type: [{
            rank: Number,
            related_knowledge_id: {
                type: Schema.Types.ObjectId,
                ref: "Ticket.knowledge",
                default: undefined,
            },
            thumbs_type: {type: String, default: undefined},
        }]
    },
    events: [eventSchema]
});

const surveySchema = new Schema({
    effectiveness: {type: Number, required: true},
    efficiency: {type: Number, required: true},
    satisfaction: {type: Number, required: true},
    time: {type: Number, required: true},
    additional_comments: String,
});

const sessionSchema = new Schema({
    email: {type: String, required: true},
    start_time: {type: Date, default: Date.now},
    end_time: {type: Date},
    survey: surveySchema,
    related_tickets: [ticketSchema],
});

const Session =
    mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default Session;
