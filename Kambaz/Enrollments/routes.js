import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.params;

    const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.params;

    const status = await dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  };

  const findCoursesForCurrentUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const courses = await dao.findCoursesForUser(currentUser._id);
    res.json(courses);
  };

  app.post("/api/enrollments/:courseId", enrollUserInCourse);
  app.delete("/api/enrollments/:courseId", unenrollUserFromCourse);
  app.get("/api/enrollments/current", findCoursesForCurrentUser);
}
