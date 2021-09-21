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
  zipcode: {
    type: Number,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: false,
  },
  // petsAllowed: [
  //   {
  //     pet: {
  //       type: String,
  //       required: true,
  //     },
  //     allowed: {
  //       type: Boolean,
  //       required: true,
  //     },
  //   },
  // ],
});

const Place = mongoose.model('Place', placeSchema)

export default Place;

//test
