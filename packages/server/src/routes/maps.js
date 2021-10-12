import express from "express";
const router = express.Router();
import requireAuth from "../middleware";
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
router.use(cors(corsOptions));

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get(
  "/https://maps.googleapis.com/maps/api/geocode/json",
  function (req, res, next) {
    console.log(res.toJSON());
  }
);

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
