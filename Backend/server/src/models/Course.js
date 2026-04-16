const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String, default: "" },
  durationMin: { type: Number, default: 10 }
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [lessonSchema]
});

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, default: "General" },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    durationWeeks: { type: Number, default: 4 },
    studentsCount: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5 },
    price: { type: Number, default: 0 },
    thumbnailEmoji: { type: String, default: "📚" },
    modules: [moduleSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", schema);
