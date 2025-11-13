import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);
  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const list = dao.findAssignmentsForCourse(courseId);
    res.json(list);
  };
  const createAssignmentForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignment = { ...req.body, course: courseId };
    const newAssignment = dao.createAssignment(assignment);
    res.json(newAssignment);
  };
  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const updates = req.body;
    const status = dao.updateAssignment(assignmentId, updates);
    res.send(status);
  };
  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.send(status);
  };
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
