import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, required: true },
    studentId: { type: String, required: true },
    attemptNumber: { type: Number, default: 1 },
    answers: [
      {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        pointsEarned: Number,
      },
    ],
    score: { type: Number, default: 0 },
    maxScore: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: Date.now },
  },
  { collection: "attempts" }
);

export default attemptSchema;
