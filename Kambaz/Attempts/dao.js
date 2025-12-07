import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AttemptsDao(db) {
  const findAttemptsForQuiz = (quizId) => {
    return model.find({ quizId }).sort({ submittedAt: -1 });
  };

  const findAttemptsForStudent = (quizId, studentId) => {
    return model.find({ quizId, studentId }).sort({ submittedAt: -1 });
  };

  const findAttemptById = (attemptId) => model.findById(attemptId);

  const countAttemptsForStudent = async (quizId, studentId) => {
    return model.countDocuments({ quizId, studentId });
  };

  const createAttempt = async (attempt = {}) => {
    const now = new Date();
    const newAttempt = {
      _id: uuidv4(),
      quizId: attempt.quizId,
      studentId: attempt.studentId,
      attemptNumber: attempt.attemptNumber || 1,
      answers: attempt.answers || [],
      score: attempt.score ?? 0,
      maxScore: attempt.maxScore ?? 0,
      submittedAt: now,
      completedAt: now,
    };

    return model.create(newAttempt);
  };

  const getLatestAttempt = async (quizId, studentId) => {
    return model.findOne({ quizId, studentId }).sort({ submittedAt: -1 });
  };

  return {
    findAttemptsForQuiz,
    findAttemptsForStudent,
    findAttemptById,
    countAttemptsForStudent,
    createAttempt,
    getLatestAttempt,
  };
}
