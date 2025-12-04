import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  const findQuizzesForCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesForCourse(cid);
    res.json(quizzes);
  };

  const createQuizForCourse = async (req, res) => {
    const { cid } = req.params;
    const currentUser = req.session["currentUser"];
    const quizData = req.body || {};
    if (currentUser && !quizData.createdBy) {
      quizData.createdBy = currentUser._id;
    }
    const newQuiz = await dao.createQuizForCourse(cid, quizData);
    res.json(newQuiz);
  };

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const updates = req.body || {};
    const updated = await dao.updateQuiz(qid, updates);
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.json(updated);
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.json(status);
  };

  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:cid/quizzes", createQuizForCourse);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
}
