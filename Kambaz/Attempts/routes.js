import AttemptsDao from "./dao.js";
import QuestionsDao from "../Questions/dao.js";

export default function AttemptsRoutes(app, db) {
  const dao = AttemptsDao(db);
  const questionsDao = QuestionsDao(db);

  const findAttemptsForQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const attempts = await dao.findAttemptsForQuiz(qid);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findAttemptsForStudent = async (req, res) => {
    try {
      const { qid } = req.params;
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      const attempts = await dao.findAttemptsForStudent(qid, currentUser._id);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getLatestAttempt = async (req, res) => {
    try {
      const { qid } = req.params;
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      const attempt = await dao.getLatestAttempt(qid, currentUser._id);
      res.json(attempt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const submitQuizAttempt = async (req, res) => {
    try {
      const { qid } = req.params;
      const currentUser = req.session["currentUser"];

      if (!currentUser) {
        res.sendStatus(401);
        return;
      }

      const { answers } = req.body;

    const questions = await questionsDao.findQuestionsForQuiz(qid);

    const attemptCount = await dao.countAttemptsForStudent(qid, currentUser._id);
    const attemptNumber = attemptCount + 1;

    let totalScore = 0;
    let maxScore = 0;
    const gradedAnswers = [];

    for (const question of questions) {
      maxScore += question.points;
      const studentAnswer = answers.find((a) => a.questionId === question._id);

      let isCorrect = false;
      let pointsEarned = 0;

      if (studentAnswer) {
        if (question.type === "multiple-choice") {
          const selectedChoice = question.choices.find((c) => c.text === studentAnswer.answer);
          if (selectedChoice && selectedChoice.isCorrect) {
            isCorrect = true;
            pointsEarned = question.points;
          }
        } else if (question.type === "true-false") {
          if (studentAnswer.answer === question.correctAnswer) {
            isCorrect = true;
            pointsEarned = question.points;
          }
        } else if (question.type === "fill-in-blank") {
          const studentAnswerStr = String(studentAnswer.answer || "");
          const matches = question.possibleAnswers.some((possible) => {
            if (question.caseSensitive) {
              return studentAnswerStr === possible;
            } else {
              return studentAnswerStr.toLowerCase() === possible.toLowerCase();
            }
          });
          if (matches) {
            isCorrect = true;
            pointsEarned = question.points;
          }
        }
      }

      totalScore += pointsEarned;

      gradedAnswers.push({
        questionId: question._id,
        answer: studentAnswer ? studentAnswer.answer : null,
        isCorrect,
        pointsEarned,
      });
    }

      const attempt = await dao.createAttempt({
        quizId: qid,
        studentId: currentUser._id,
        attemptNumber,
        answers: gradedAnswers,
        score: totalScore,
        maxScore,
      });

      res.json(attempt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  app.get("/api/courses/:cid/quizzes/:qid/attempts", findAttemptsForQuiz);
  app.get("/api/courses/:cid/quizzes/:qid/attempts/student", findAttemptsForStudent);
  app.get("/api/courses/:cid/quizzes/:qid/attempts/latest", getLatestAttempt);
  app.post("/api/courses/:cid/quizzes/:qid/attempts", submitQuizAttempt);
}
