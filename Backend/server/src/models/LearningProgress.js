const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessonIds: [{ type: String }],
    lastLessonId: { type: String, default: "" }
  },
  { timestamps: true }
);

schema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("LearningProgress", schema);
