import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) =>
        !(enrollment.user === userId && enrollment.course === courseId)
    );
    return { status: "unenrolled" };
  }

  function findCoursesForUser(userId) {
    const { courses, enrollments } = db;
    const userEnrollments = enrollments.filter(
      (enrollment) => enrollment.user === userId
    );
    const userCourses = courses.filter((course) =>
      userEnrollments.some((enrollment) => enrollment.course === course._id)
    );
    return userCourses;
  }
  return { enrollUserInCourse, unenrollUserFromCourse, findCoursesForUser };
}
