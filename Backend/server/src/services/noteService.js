const LessonNote = require("../models/LessonNote");

const getNote = async (userId, courseId, lessonId) => {
  const note = await LessonNote.findOne({ user: userId, course: courseId, lessonId });
  return note || { content: "" };
};

const saveNote = async (userId, courseId, lessonId, content) =>
  LessonNote.findOneAndUpdate(
    { user: userId, course: courseId, lessonId },
    { user: userId, course: courseId, lessonId, content: content || "" },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

module.exports = { getNote, saveNote };
