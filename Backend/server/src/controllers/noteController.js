const asyncHandler = require("../utils/asyncHandler");
const service = require("../services/noteService");

const getLessonNote = asyncHandler(async (req, res) => {
  const data = await service.getNote(req.user.userId, req.params.courseId, req.params.lessonId);
  res.status(200).json({ status: "success", data });
});

const saveLessonNote = asyncHandler(async (req, res) => {
  const data = await service.saveNote(
    req.user.userId,
    req.params.courseId,
    req.params.lessonId,
    req.body.content
  );
  res.status(200).json({ status: "success", data });
});

module.exports = { getLessonNote, saveLessonNote };
