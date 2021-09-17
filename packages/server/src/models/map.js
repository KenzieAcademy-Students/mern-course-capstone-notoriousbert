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
  placeMarkers: [
    {
      place: {
        type: ObjectId,
        ref: "Place",
      },
      radiusDistance: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Map = mongoose.model("Map", mapSchema);

export default Map;
