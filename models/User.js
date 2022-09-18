import { Schema, model, models } from "mongoose";

const UserSchema = Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
