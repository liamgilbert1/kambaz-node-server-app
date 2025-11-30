import model from "./model.js";

export default function AssignmentsDao() {
  async function findAssignmentsForCourse(courseId) {
    return await model.find({ course: courseId });
  }

  async function createAssignment(assignment) {
    return await model.create(assignment);
  }

  async function updateAssignment(assignmentId, updates) {
    return await model.updateOne({ _id: assignmentId }, { $set: updates });
  }

  async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
