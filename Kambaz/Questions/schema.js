import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, required: true },
    type: {
      type: String,
      enum: ["multiple-choice", "true-false", "fill-in-blank"],
      default: "multiple-choice",
    },
    title: { type: String, default: "" },
    points: { type: Number, default: 0 },
    question: { type: String, default: "" },

    // For multiple-choice questions
    choices: [
      {
        text: String,
        isCorrect: Boolean,
      },
    ],

    // For true or false questions
    correctAnswer: { type: Boolean, default: null },

    // For fill in the blank questions
    possibleAnswers: [String],
    caseSensitive: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "questions" }
);

export default questionSchema;
