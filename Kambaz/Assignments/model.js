import mongoose from "mongoose";
import assignmentsSchema from "./schema.js";

const AssignmentModel = mongoose.model("AssignmentModel", assignmentsSchema);
export default AssignmentModel;
