const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

  },
  { timestamps: true }
);

schema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", schema);
