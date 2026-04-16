const asyncHandler = require("../utils/asyncHandler");
const service = require("../services/progressService");

const getCourseProgress = asyncHandler(async (req, res) => {
  const data = await service.getByCourse(req.user.userId, req.params.courseId);
  res.status(200).json({ status: "success", data });
});

const updateCourseProgress = asyncHandler(async (req, res) => {
  const { lessonId, completed, lastLessonId } = req.body;
  const data = await service.updateLessonState(
    req.user.userId,
    req.params.courseId,
    lessonId,
    completed,
    lastLessonId
  );
  res.status(200).json({ status: "success", data });
});

const getCertificate = asyncHandler(async (req, res) => {
  const data = await service.getCertificateData(req.user.userId, req.params.courseId);
  res.status(200).json({ status: "success", data });
});

module.exports = { getCourseProgress, updateCourseProgress, getCertificate };
