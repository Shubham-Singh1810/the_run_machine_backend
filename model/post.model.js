const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    caption: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postImg: {
      type: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "comments"}],
  },
  { timestamps: { createdAt: "createdAt" } }
);

let Post = mongoose.model("posts", postSchema);
module.exports = Post;
