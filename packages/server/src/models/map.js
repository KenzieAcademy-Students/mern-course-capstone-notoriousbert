import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const mapSchema = new mongoose.Schema({
  city: {
    type: String,
    required: false,
  },
  zipCode: {
    type: Number,
    required: false,
  },
  fullAddress: {
    type: String,
    required: false,
  },
  lat: {
    type: Number,
    required: false,
  },
  lng: {
    type: Number,
    required: false,
  },
  // placeMarkers: [
  //   {
  place: {
    type: ObjectId,
    ref: "Place",
  },
  time: {
    type: Date,
    default: Date.now,
  },
  // radiusDistance: {
  //   type: Number,
  //   required: false,
  // },
  //   },
  // ],
});

const Map = mongoose.model("Map", mapSchema);

export default Map;
