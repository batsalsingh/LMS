const LearningProgress = require("../models/LearningProgress");
const Course = require("../models/Course");
const AppError = require("../utils/appError");

const ensureCourse = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new AppError("Course not found", 404);
  return course;
};

const getByCourse = async (userId, courseId) => {
  await ensureCourse(courseId);
  const progress = await LearningProgress.findOne({ user: userId, course: courseId });
  if (!progress) {
    return { completedLessonIds: [], lastLessonId: "" };
  }
  return progress;
};

const updateLessonState = async (userId, courseId, lessonId, completed, lastLessonId) => {
  await ensureCourse(courseId);
  const progress =
    (await LearningProgress.findOne({ user: userId, course: courseId })) ||
    (await LearningProgress.create({ user: userId, course: courseId, completedLessonIds: [] }));

  if (lessonId) {
    const exists = progress.completedLessonIds.includes(lessonId);
    if (completed && !exists) progress.completedLessonIds.push(lessonId);
    if (!completed && exists) {
      progress.completedLessonIds = progress.completedLessonIds.filter((id) => id !== lessonId);
    }
  }

  if (lastLessonId !== undefined) {
    progress.lastLessonId = lastLessonId || "";
  }

  await progress.save();
  return progress;
};

const getCertificateData = async (userId, courseId) => {
  const course = await ensureCourse(courseId);
  const progress = await LearningProgress.findOne({ user: userId, course: courseId });
  const completedIds = progress?.completedLessonIds || [];

  const allLessonIds = (course.modules || []).flatMap((moduleItem) =>
    (moduleItem.lessons || []).map((lesson) => String(lesson._id))
  );

  const completedCount = allLessonIds.filter((id) => completedIds.includes(id)).length;
  const totalLessons = allLessonIds.length;
  const progressPct = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;
  const unlocked = totalLessons > 0 && completedCount >= totalLessons;

  return {
    unlocked,
    progressPct,
    completedCount,
    totalLessons,
    courseTitle: course.title
  };
};

module.exports = { getByCourse, updateLessonState, getCertificateData };
