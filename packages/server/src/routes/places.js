import express from "express";
import { Place, Review, User } from "../models";
const router = express.Router();
import { requireAuth } from "../middleware";

router.get("/", async (req, res) => {
  const populateQuery = [
    {
      path: "petsAllowed",
      select: ["category"],
    },
    {
      path: "reviews",
      populate: {
        path: "author",
      },
    },
  ];
  const places = await Place.find({}).sort({}).populate(populateQuery).exec();
  try {
    res.json(places.map((place) => place.toJSON()));
  } catch (error) {
    next(error);
  }
});

//get REVIEW by ID
router.get("/review/:id", async (req, res) => {
  let review = await Review.findById(req.params.id);
  try {
    res.json(review.toJSON());
  } catch (error) {
    res.status(400).end;
  }
});

//get PLACE by ID
router.get("/:id", async (req, res) => {
  const populateQuery = [
    {
      path: "petsAllowed",
      select: ["category"],
    },
    {
      path: "reviews",
      populate: {
        path: "author",
      },
    },
  ];

  const place = await Place.findById(req.params.id)
    .populate(populateQuery)
    .exec();
  try {
    res.json(place.toJSON());
  } catch (error) {
    res.status(400).end;
  }
});

//post a new place
router.post("/", async (request, response, next) => {
  const {
    typeOfPlace,
    placeName,
    address,
    aptOrSuitNumber,
    city,
    state,
    zipcode,
    pricePerNight,
    petsAllowed,
    description,
    lat,
    lng,
  } = request.body;

  const regZipCode = /^\d{5}(?:[-\s]\d{4})?$/;

  if (!placeName || placeName.length === 0) {
    return response.status(401).json({
      error: "Please provide a place name.",
    });
  } else if (!address || address.length === 0) {
    return response.status(401).json({
      error: "Please provide an address.",
    });
  } else if (!city || city.length === 0) {
    return response.status(401).json({
      error: "Please provide a city.",
    });
  } else if (!regZipCode.test(zipcode)) {
    return response.status(422).json({
      error: "Please provide a valid Zip Code.",
    });
  }

  const place = new Place({
    typeOfPlace: typeOfPlace,
    placeName: placeName,
    address: address,
    aptOrSuitNumber: aptOrSuitNumber,
    city: city,
    state: state,
    zipcode: parseInt(zipcode),
    pricePerNight: pricePerNight,
    petsAllowed: petsAllowed,
    description: description,
    lat,
    lng,
  });

  const populatedPlace = await place.populate({ path: "petsAllowed" });

  try {
    const savedPlace = await populatedPlace.save();
    response.json(savedPlace);
  } catch (error) {
    next(error);
  }
});

//put REVIEW
router.put("/review", requireAuth, async (req, res) => {
  const { text, userId, placeId, rating } = req.body;

  const review = new Review({
    text: text,
    author: userId,
    location: placeId,
    rating: rating,
  });
  try {
    const placeResult = await Place.findByIdAndUpdate(
      placeId,
      {
        $push: { reviews: review },
      },
      {
        new: true,
      }
    );
    res.json(placeResult);
  } catch (error) {
    res.status(404).end();
  }

  try {
    const userResult = await User.findByIdAndUpdate(
      userId,
      {
        $push: { reviews: review },
      },
      {
        new: true,
      }
    );
    res.json(userResult);
  } catch (error) {
    res.status(404).end();
  }

  try {
    const savedReview = await review.save();
    res.json(savedReview.toJSON());
  } catch (error) {
    res.status(400).end;
  }
});

module.exports = router;
