import { IGender, ISchoolCollege } from "@/types/admin/school-college-types";
import mongoose, { Schema } from "mongoose";

const SchoolCollegeSchema: Schema<ISchoolCollege> = new Schema(
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
    link: {
      type: String,
    },
    about: {
      type: String,
    },
    yearOfEstablishment: {
      type: String,
    },
    parentInstitution: {
      type: String,
    },
    modeOfStudy: {
      type: String,
    },
    admissionProcess: {
      type: String,
    },
    teacherCount: {
      type: String,
    },
    highestEducation: {
      type: String,
    },
    typeOfEducation: {
      type: String,
    },
    facilities: {
      type: String,
    },
    competitions: {
      type: String,
    },
    events: {
      type: String,
    },
    interests: {
      type: String,
    },
    sportAndFitness: {
      type: String,
    },
    infrastructure: {
      type: String,
    },
    advancedFacilities: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SchoolCollege =
  mongoose.models.SchoolCollege ||
  mongoose.model("SchoolCollege", SchoolCollegeSchema);
export default SchoolCollege;
