const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "TutorProfile", required: true },
    status: { type: String, enum: ["booked", "completed", "cancelled"], default: "booked" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TutorSession", schema);
