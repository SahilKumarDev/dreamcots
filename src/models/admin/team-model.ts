import { EPlan, ITeam } from "@/types/admin/team-types";
import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    plan: {
      type: String,
      enum: Object.values(EPlan),
      default: EPlan.FREE,
    },
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);
export default Team;
