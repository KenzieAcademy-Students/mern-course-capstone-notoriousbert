import express from "express";
const router = express.Router();
import { Map } from "../models";
import requireAuth from "../middleware";

router.get("/", async (req, res, next) => {
  const populateQuery = [
    { 
      path: "place",
      populate: {
        path: "petsAllowed", select: ["category"]
      }
    },
  ];
  const maps = await Map.find({}).sort({}).populate(populateQuery)
  .exec();
  console.log(maps[0].place.petsAllowed)
  try {
    res.json(maps.map((map) => map.toJSON()));
  } catch (error) {
    next(error);
  }
});

router.get("/:city", async (request, response) => {
  const populateQuery = [
    {
      path: "placeMarkers",
      populate: { path: "place" },
    },
  ];
  const map = await Map.findOne({ city: request.params.city })
    .populate(populateQuery)
    .exec();

  if (map) {
    response.json(map);
  } else {
    response.status(404).end();
  }
});

router.post("/", async (request, response, next) => {
  const { lat, lng, place } = request.body;
  const map = new Map({
    lat: lat,
    lng: lng,
    place: place,
  });

  try {
    const savedMap = await map.save();
    response.json(savedMap);
  } catch (error) {
    next(error);
  }
});

router.put("/placeMarkers", async (request, response, next) => {
  const { radius, placeId, mapId } = request.body;
  const placeMarker = {
    radiusDistance: radius,
    place: placeId,
  };

  const populateQuery = [
    {
      path: "placeMarkers.place",
    },
  ];

  Map.findByIdAndUpdate(
    mapId,
    {
      $push: { placeMarkers: placeMarker },
    },
    {
      new: true,
    }
  )
    .populate(populateQuery)
    .exec((err, result) => {
      if (err) {
        next(err);
      } else {
        response.json(result);
      }
    });
});

module.exports = router;
