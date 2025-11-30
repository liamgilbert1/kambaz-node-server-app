import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    course: { type: String, required: true },
    description: { type: String, default: "" },
    points: { type: Number, default: 100 },
    due: { type: String, default: "" },
    availableFrom: { type: String, default: "" },
    availableUntil: { type: String, default: "" },
  },
  { collection: "assignments" }
);

export default assignmentsSchema;
