import express from "express";
import { Place } from "../models";
const router = express.Router();


router.post("/", async (request, response, next) => {
  const { typeOfPlace, placeName, address, aptOrSuitNumber,city, state, zipcode, pricePerNight, petsAllowed } = request.body;
  const place = new Place({
    typeOfPlace: typeOfPlace,
    placeName: placeName,
    address: address,
    aptOrSuitNumber: aptOrSuitNumber,
    city: city,
    state: state,
    zipcode: zipcode,
    pricePerNight: pricePerNight,
    petsAllowed: petsAllowed,

  });

  try {
    const savedPlace = await place.save();
    response.json(savedPlace);
  } catch (error) {
    next(error);
  }
});


module.exports = router;