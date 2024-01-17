const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
    },
    commentLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: { createdAt: "createdAt" } }
);

let Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
