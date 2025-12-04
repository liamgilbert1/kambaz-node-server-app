import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao(db) {
  const findQuizzesForCourse = (courseId) => {
    return model
      .find({ course: courseId })
      .sort({ availableDate: 1, createdAt: 1 });
  };

  const findQuizById = (quizId) => model.findById(quizId);

  const createQuizForCourse = async (courseId, quiz = {}) => {
    const now = new Date();
    const newQuiz = {
      _id: uuidv4(),
      course: courseId,
      title: quiz.title || "New Quiz",
      description: quiz.description || "",
      quizType: quiz.quizType || "Graded Quiz",
      assignmentGroup: quiz.assignmentGroup || "Quizzes",
      points: quiz.points ?? 0,
      shuffleAnswers: quiz.shuffleAnswers ?? true,
      timeLimit: quiz.timeLimit ?? 20,
      multipleAttempts: quiz.multipleAttempts ?? false,
      maxAttempts: quiz.maxAttempts ?? 1,
      showCorrectAnswers: quiz.showCorrectAnswers || "never",
      accessCode: quiz.accessCode || "",
      oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
      webcamRequired: quiz.webcamRequired ?? false,
      lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
      availableDate: quiz.availableDate || null,
      untilDate: quiz.untilDate || null,
      dueDate: quiz.dueDate || null,
      published: quiz.published ?? false,
      createdBy: quiz.createdBy || null,
      createdAt: now,
      updatedAt: now,
    };

    return model.create(newQuiz);
  };

  const updateQuiz = async (quizId, updates) => {
    const quizUpdates = {
      ...updates,
      updatedAt: new Date(),
      _id: undefined,
      course: updates.course,
    };

    await model.updateOne({ _id: quizId }, { $set: quizUpdates });
    return model.findById(quizId);
  };

  const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuizForCourse,
    updateQuiz,
    deleteQuiz,
  };
}
