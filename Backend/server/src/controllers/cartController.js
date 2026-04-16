const Cart = require('../models/Cart');

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('courses');
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, courses: [] });
  }
  res.status(200).json({ status: 'success', data: cart });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, courses: [courseId] });
  } else {
    if (!cart.courses.includes(courseId)) {
      cart.courses.push(courseId);
      await cart.save();
    }
  }
  res.status(200).json({ status: 'success', data: cart });
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { courses: req.params.courseId } },
    { new: true }
  ).populate('courses');
  res.status(200).json({ status: 'success', data: cart });
});