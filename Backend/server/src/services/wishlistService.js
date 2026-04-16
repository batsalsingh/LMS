const Wishlist = require("../models/Wishlist");

const list = async (userId) =>
  Wishlist.find({ user: userId }).populate({
    path: "course",
    populate: { path: "instructor", select: "name email role" }
  });

const add = async (userId, courseId) =>
  Wishlist.findOneAndUpdate(
    { user: userId, course: courseId },
    { user: userId, course: courseId },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

const remove = async (userId, courseId) =>
  Wishlist.findOneAndDelete({ user: userId, course: courseId });

module.exports = { list, add, remove };
