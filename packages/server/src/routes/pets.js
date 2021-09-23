import express from "express";
import { Pet } from "../models";

const router = express.Router();

router.get("/create", async (req, res, next) => {
    const pet = new Pet({
      type: req.query.type,
      size: req.query.size,
    });
  
    try {
      await pet.save();
      res.send(req.query);
    } catch (error) {
      next(new Error("Error Creating Pet"));
    }
  });

  module.exports = router