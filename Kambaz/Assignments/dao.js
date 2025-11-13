import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((a) => a.course === courseId);
  }

  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function updateAssignment(assignmentId, updates) {
    db.assignments = db.assignments.map((a) =>
      a._id === assignmentId ? { ...a, ...updates } : a
    );
    return { status: "OK" };
  }

  function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return { status: "OK" };
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
