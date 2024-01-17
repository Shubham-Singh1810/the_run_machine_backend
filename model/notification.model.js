const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    consumedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

let Notification = mongoose.model("notifications", notificationSchema);
module.exports = Notification;
