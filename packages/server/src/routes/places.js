import express from "express";
import { Place, Review } from "../models";
const router = express.Router();
import { requireAuth } from "../middleware";

//Sanity Check
// router.get('/', (req, res) => {
//     res.status(200).send('places connected')
// })

router.get("/", async (req, res) => {
  const populateQuery = [
    {
      path: "petsAllowed",
      select: ["category"],
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

//   Sanity Check for Review
//   router.get('/review', (req, res) => {
//       res.status(200).send('reviews connected')
//   })

//get PLACE by ID
router.get("/:id", async (req, res) => {
  const populateQuery = [{ path: "petsAllowed" }];
  let place = await Place.findById(req.params.id)
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
    lat,
    lng
  } = request.body;

  const regZipCode = /^\d{5}(?:[-\s]\d{4})?$/


  if (!(placeName) || placeName.length === 0) {
    return response.status(401).json({
      error: "Please provide a place name.",
    });
  } else if (!(address) || address.length === 0) {
    return response.status(401).json({
      error: "Please provide an address.",
    });
  } else if (!(city) || city.length === 0) {
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
    lat,
    lng
  });

  const populatedPlace = await place.populate({ path: "petsAllowed" });

  try {
    const savedPlace = await populatedPlace.save();
    // savedPlace = await savedPlace.populate({path: 'petsAllowed' })
    response.json(savedPlace);
  } catch (error) {
    next(error);
  }
});

//put REVIEW
router.put("/review", async (req, res) => {
  console.log("fish", req.body);
  const { text, userId, placeId } = req.body;

  const review = new Review({
    text: text,
    author: userId,
  });

  // const populateQuery = [
  //   { path: "comments.author", select: ["username", "profile_image"] },
  // ];

  Place.findByIdAndUpdate(
    placeId,
    {
      $push: { reviews: review },
    },
    {
      new: true,
    }
  );

  try {
    const savedReview = await review.save();
    res.json(savedReview.toJSON());
  } catch (error) {
    res.status(400).end;
  }
});

module.exports = router;
