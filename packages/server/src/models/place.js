import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const placeSchema = new mongoose.Schema({
  typeOfPlace: {
    type: String,
    required: true,
  },
  placeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aptOrSuiteNumber: {
    type: Number,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },

  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: false,
  },
  petsAllowed: [
    {
      type: ObjectId,
      ref: "Pet",
    },
  ],
  reviews: [
    {
      type: ObjectId,
      ref: "Review",
    },
  ],
});

const Place = mongoose.model("Place", placeSchema);

export default Place;

//test
