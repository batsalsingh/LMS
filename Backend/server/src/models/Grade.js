const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    score: { type: Number, required: true, min: 0, max: 100 }
  },
  { timestamps: true }
);

schema.index({ student: 1, assignment: 1 }, { unique: true });

module.exports = mongoose.model("Grade", schema);
