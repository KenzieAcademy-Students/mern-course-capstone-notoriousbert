import express from 'express'
import { Place, Review} from '../models'

const router = express.Router()

//Sanity Check
router.get('/', (req, res) => {
    res.status(200).send('places connected')
})

//Get all Places
router.get("/all", async (req, res, next) => {
    const place = await Place.find({})
    try {
      res.json(place.map((place) => map.toJSON()));
    } catch (error) {
      next(error);
    }
  });
  

//get PLACE by ID
router.get("/:id", async (req,res) => {
    console.log("dog",req.params.id)
    let place = await Place.findById(req.params.id)
    console.log(place)
    if (place){
        res.json(place.toJSON())
    } else {
        res.status(400).end
    }
})

//get REVIEW
router.get("/:id", async(req,res) => {
    let review = await Review.findbyId(req.params.id)
    if (review) {
        res.json(review.json())
    } else {  
        res.status(400).end
    }
})

//post REVIEW
router.post("/", async (req,res)=>{
    let {text} = request.body
    let {user} = request

    const review = new Review({
        text:text,
        author: user._id,
    })
    let savedReview = await review.save()

    if (savedReview) {
        res.json(savedReview.tojson())
    } else {
        res.status(400).end
    }
})
   
module.exports = router
