import { IGender, IRoom, IWhoIsUsing, IStatus } from "@/types/admin/room-types";
import mongoose, { Schema } from "mongoose";

const RoomSchema: Schema<IRoom> = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: Object.values(IGender),
      required: true,
    },
    dob: {
      type: String,
    },
    profession: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(IStatus),
    },
    whoIsUsing: {
      type: String,
      enum: Object.values(IWhoIsUsing),
      required: true,
    },
    roomPrice: {
      type: String,
    },
    roomType: {
      type: String,
    },
    roomMember: {
      type: String,
    },
    roomImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
export default Room;
