import express from "express";
import { Pet } from "../models";

const router = express.Router();

router.get('/', async (req, res, next) => {

  const pets = await Pet.find({})
    .sort({ created: -1 })

  res.json(pets.map((pet) => pet.toJSON()));

})

  module.exports = router

router.get("/create", async (req, res, next) => {
    const pet = new Pet({
      category: req.query.type,
      size: req.query.size,
    });
  
    try {
      await pet.save();
      res.send(req.query);
    } catch (error) {
      next(new Error("Error Creating Pet"));
    }
  });

router.get('/', async (req, res, next) => {

  const pets = await Pet.find({})
    .sort({ created: -1 })

  res.json(pets.map((pet) => pet.toJSON()));

})

  module.exports = router
