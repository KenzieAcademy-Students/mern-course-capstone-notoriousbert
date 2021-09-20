import express from 'express'
import { Place, Review} from '../models'

const router = express.Router()

//Sanity Check
// router.get('/', (req, res) => {
//     res.status(200).send('places connected')
// })

  //get REVIEW by ID
  router.get("/review/:id", async(req,res) => {
      let review = await Review.findById(req.params.id)
      try{
        res.json(review.toJSON()) 
      } catch (error) {
        res.status(400).end 
      }
  })

//   Sanity Check for Review  
//   router.get('/review', (req, res) => {
//       res.status(200).send('reviews connected')
//   })

//get PLACE by ID
router.get("/:id", async (req,res) => {
    let place = await Place.findById(req.params.id)
    try{
        res.json(place.toJSON())  
    } catch (error) {
        res.status(400).end
    }
})

//post REVIEW
router.post("/review", async (req,res)=>{
    console.log("fish",req.body)
    const {text, userId} = req.body

    const review = new Review({
        text:text,
        author:userId
    })

    try {
    const savedReview = await review.save()
    res.json(savedReview.toJSON())
    } catch (error) {
        res.status(400).end 
    }
})
   
module.exports = router
