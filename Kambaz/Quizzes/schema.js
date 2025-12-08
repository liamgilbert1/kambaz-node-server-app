import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, required: true },
    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },

    points: { type: Number, default: 0 },

    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },

    dueDate: { type: Date, default: null },
    availableDate: { type: Date, default: null },
    untilDate: { type: Date, default: null },

    published: { type: Boolean, default: false },

    createdBy: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "quizzes" }
);

export default quizSchema;
