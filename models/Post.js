import { Schema, model, models, Types } from "mongoose";

const PostSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDraft: {
      type: Boolean,
      required: true,
      default: false,
    },
    shortDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
