import express from 'express'
import { Places } from '../models'

const router = express.Router()

router.put("/", async (req,res,next)=>{

    let place = await Place.findOne({}).exec()

    if (!place) {
        const newPlace = new Place({
          username: "Freddie",
        })
        place = await newPlace.save()
      }

})