import mongoose, { Schema } from "mongoose";
import {
  ITeacher,
  IAddress,
  ITeacherGender,
  ITeacherCoaching,
} from "@/types/admin/teacher-types";

const AddressSchema: Schema<IAddress> = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },
});

const CoachingSchema: Schema<ITeacherCoaching> = new Schema({
  isCoaching: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
  },
  fees: {
    type: Number,
  },
  time: {
    type: String,
  },
});

const TeacherSchema: Schema<ITeacher> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uniqueName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      required: true,
      type: Number,
    },
    profilePicture: {
      type: String,
    },
    coaching: {
      type: CoachingSchema,
    },
    skills: {
      type: [String],
    },
    yearsOfExperience: {
      type: String,
    },
    isFullTime: {
      type: Boolean,
    },
    emergencyContact: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ITeacherGender,
    },
    teachingSubjects: {
      type: [String],
    },
    highestQualification: {
      type: String,
    },
    teachingSchoolOrCollege: {
      type: String,
    },
    languages: {
      type: [String],
    },
    socialMedia: {
      type: [String],
    },
    highestTeachingClassOrDegree: {
      type: String,
    },
    availability: {
      type: String,
      enum: ["part time", "full time"],
    },
    address: { type: AddressSchema },
  },
  {
    timestamps: true,
  }
);

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);
export default Teacher;
