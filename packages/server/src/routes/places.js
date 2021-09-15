import express from 'express'
import { Place, Review} from '../models'

const router = express.Router()


//get PLACE
router.get("/:id", async (req,res) => {
    let place = await Place.findById(req.params.id)
    if (place){
        res.json(place.json())
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
router.post("/", requireauth, async (req,res)=>{
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