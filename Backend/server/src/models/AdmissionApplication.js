const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    experience: { type: String, required: true },
    message: { type: String, default: "" },
    status: { type: String, enum: ["pending", "reviewed", "accepted", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdmissionApplication", schema);
