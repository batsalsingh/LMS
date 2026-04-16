const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    students: { type: Number, default: 0 },
    experience: { type: String, default: "2+ years" },
    image: { type: String, default: "👨‍🏫" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TutorProfile", schema);
