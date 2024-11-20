import { ICoaching, IGender, ITeacher } from "@/types/admin/teacher-types";
import mongoose, { Schema } from "mongoose";

const TeacherSchema: Schema<ITeacher> = new Schema(
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
    coaching: {
      type: String,
      enum: Object.values(ICoaching),
      required: true,
    },
    experience: {
      type: String,
    },
    qualification: {
      type: String,
    },
    schoolOrCollege: {
      type: String,
    },
    teachingSubject: {
      type: String,
    },
    teachingLanguage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);
export default Teacher;
