const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    storyImg: {
      type: String,
    },
    viwedBy: [
      {
        view: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        reaction: { type: String },
      },
    ],
  },
  { timestamps: { createdAt: "createdAt" } }
);

let Story = mongoose.model("stories", storySchema);
module.exports = Story;
