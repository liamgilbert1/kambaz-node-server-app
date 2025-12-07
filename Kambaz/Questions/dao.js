import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuestionsDao(db) {
  const findQuestionsForQuiz = (quizId) => {
    return model.find({ quizId }).sort({ createdAt: 1 });
  };

  const findQuestionById = (questionId) => model.findById(questionId);

  const createQuestionForQuiz = async (quizId, question = {}) => {
    const now = new Date();
    const newQuestion = {
      _id: uuidv4(),
      quizId,
      type: question.type || "multiple-choice",
      title: question.title || "",
      points: question.points ?? 0,
      question: question.question || "",
      choices: question.choices || [],
      correctAnswer: question.correctAnswer ?? null,
      possibleAnswers: question.possibleAnswers || [],
      caseSensitive: question.caseSensitive ?? false,
      createdAt: now,
      updatedAt: now,
    };

    return model.create(newQuestion);
  };

  const updateQuestion = async (questionId, updates) => {
    const questionUpdates = {
      ...updates,
      updatedAt: new Date(),
      _id: undefined,
      quizId: updates.quizId,
    };

    await model.updateOne({ _id: questionId }, { $set: questionUpdates });
    return model.findById(questionId);
  };

  const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId });

  return {
    findQuestionsForQuiz,
    findQuestionById,
    createQuestionForQuiz,
    updateQuestion,
    deleteQuestion,
  };
}
