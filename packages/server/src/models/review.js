import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    petsAllowed: [
      {
        type: ObjectId,
        ref: "Pet",
      },
    ],
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
