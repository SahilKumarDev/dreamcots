import { IGender, IStudent } from "@/types/admin/student-types";
import mongoose, { Schema } from "mongoose";

const StudentSchema: Schema<IStudent> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(IGender),
      required: true,
    },
    profilePicture: {
      type: String,
    },
    age: {
      type: String,
    },
    qualification: {
      type: String,
    },
    schoolOrCollege: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
export default Student;
