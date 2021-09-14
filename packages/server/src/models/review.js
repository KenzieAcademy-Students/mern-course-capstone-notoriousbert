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
        type: ObjectID,
        ref: "User",
      },
    ],
    petsAllowed: [
      {
        pet: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema)

export default Review;

