import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app, db) {
  const dao = QuestionsDao(db);

  const findQuestionsForQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const questions = await dao.findQuestionsForQuiz(qid);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findQuestionById = async (req, res) => {
    try {
      const { questionId } = req.params;
      const question = await dao.findQuestionById(questionId);
      if (!question) {
        res.sendStatus(404);
        return;
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const createQuestionForQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const questionData = req.body || {};
      const newQuestion = await dao.createQuestionForQuiz(qid, questionData);
      res.json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const updates = req.body || {};
      const updated = await dao.updateQuestion(questionId, updates);
      if (!updated) {
        res.sendStatus(404);
        return;
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteQuestion = async (req, res) => {
    try {
      const { questionId } = req.params;
      const status = await dao.deleteQuestion(questionId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  app.get("/api/courses/:cid/quizzes/:qid/questions", findQuestionsForQuiz);
  app.get("/api/courses/:cid/quizzes/:qid/questions/:questionId", findQuestionById);
  app.post("/api/courses/:cid/quizzes/:qid/questions", createQuestionForQuiz);
  app.put("/api/courses/:cid/quizzes/:qid/questions/:questionId", updateQuestion);
  app.delete("/api/courses/:cid/quizzes/:qid/questions/:questionId", deleteQuestion);
}
