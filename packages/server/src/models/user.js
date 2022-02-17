import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  // profile_image:{
  //   type: String,
  //   required: true,
  // },
  reviews: [
    {
      type: ObjectId,
      ref: "Review",
    },
  ],
  reviewLikes: [
    {
      type: ObjectId,
      ref: "Review",
    },
  ],
  favorites: [
    {
      type: ObjectId,
      ref: "Place",
    },
  ],
  pets: [
    {
      pet: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema)

export default User;
