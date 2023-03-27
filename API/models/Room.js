import mongoose from "mongoose";

const BookedBySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  documentType: {
    type: String,
    enum: ["passport", "national id", "driver's license", "other"],
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
});

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: {
          type: [Date],
        },
        bookedBy: {
          type: BookedBySchema,
          required: false,
        },
      },
    ],
    
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);