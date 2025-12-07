import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app, db) {
  const dao = QuestionsDao(db);

  const findQuestionsForQuiz = async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findQuestionsForQuiz(qid);
    res.json(questions);
  };

  const findQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.findQuestionById(questionId);
    if (!question) {
      res.sendStatus(404);
      return;
    }
    res.json(question);
  };

  const createQuestionForQuiz = async (req, res) => {
    const { qid } = req.params;
    const questionData = req.body || {};
    const newQuestion = await dao.createQuestionForQuiz(qid, questionData);
    res.json(newQuestion);
  };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const updates = req.body || {};
    const updated = await dao.updateQuestion(questionId, updates);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.json(updated);
  };

  const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.deleteQuestion(questionId);
    res.json(status);
  };

  app.get("/api/courses/:cid/quizzes/:qid/questions", findQuestionsForQuiz);
  app.get("/api/courses/:cid/quizzes/:qid/questions/:questionId", findQuestionById);
  app.post("/api/courses/:cid/quizzes/:qid/questions", createQuestionForQuiz);
  app.put("/api/courses/:cid/quizzes/:qid/questions/:questionId", updateQuestion);
  app.delete("/api/courses/:cid/quizzes/:qid/questions/:questionId", deleteQuestion);
}
