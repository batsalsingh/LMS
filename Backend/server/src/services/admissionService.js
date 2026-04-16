const AdmissionApplication = require("../models/AdmissionApplication");

const create = async (userId, payload) =>
  AdmissionApplication.create({
    user: userId,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    course: payload.course,
    experience: payload.experience,
    message: payload.message || ""
  });

const listMine = async (userId) =>
  AdmissionApplication.find({ user: userId }).sort({ createdAt: -1 });

module.exports = { create, listMine };
