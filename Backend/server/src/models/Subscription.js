const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Basic", "Professional", "Premium"], required: true },
    price: { type: Number, required: true },
    billingCycle: { type: String, enum: ["monthly"], default: "monthly" },
    status: { type: String, enum: ["active", "cancelled"], default: "active" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", schema);
