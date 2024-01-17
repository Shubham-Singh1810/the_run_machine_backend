const mongoose = require("mongoose");

const tempUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    otp: {
      type: Number,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

let tempUser = mongoose.model("tempUsers", tempUserSchema);
module.exports = tempUser;
