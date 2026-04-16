const TutorProfile = require("../models/TutorProfile");
const TutorSession = require("../models/TutorSession");
const AppError = require("../utils/appError");

const defaultTutors = [
  { name: "John Smith", speciality: "Web Development", rating: 4.9, students: 2450, experience: "8+ years", image: "👨‍🏫" },
  { name: "Sarah Johnson", speciality: "React & JavaScript", rating: 4.8, students: 1890, experience: "6+ years", image: "👩‍💼" },
  { name: "Mike Chen", speciality: "Data Science", rating: 5.0, students: 3120, experience: "10+ years", image: "👨‍🔬" },
  { name: "Emma Davis", speciality: "UI/UX Design", rating: 4.7, students: 1560, experience: "7+ years", image: "👩‍🎨" },
  { name: "Dr. Alex Kumar", speciality: "Machine Learning", rating: 4.9, students: 3280, experience: "12+ years", image: "👨‍🔭" },
  { name: "Lisa Anderson", speciality: "Mobile Development", rating: 4.8, students: 2670, experience: "9+ years", image: "👩‍💻" }
];

const ensureTutors = async () => {
  const count = await TutorProfile.countDocuments();
  if (count === 0) {
    await TutorProfile.insertMany(defaultTutors);
  }
};

const listTutors = async () => {
  await ensureTutors();
  return TutorProfile.find().sort({ rating: -1, students: -1 });
};

const bookSession = async (userId, tutorId) => {
  const tutor = await TutorProfile.findById(tutorId);
  if (!tutor) throw new AppError("Tutor not found", 404);
  return TutorSession.create({ user: userId, tutor: tutorId });
};

module.exports = { listTutors, bookSession };
