import express from "express";
const router = express.Router();
import { Map } from "../models";

router.get("/", async (req, res, next) => {
  const maps = await Map.find({}).sort({}).populate("placeMarkers").exec()
  try {
    res.json(maps.map((map) => map.toJSON()));
  } catch (error) {
      next(error)
  }
});

router.get("/:city", async (request, response) => {
  const map = Map.findOne({ city: request.params.city })
    .populate("placeMarkers")
    .exec();

  if (map) {
    response.json(map.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = router;
