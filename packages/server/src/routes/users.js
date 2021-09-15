import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'

const router = express.Router()

router.get('/', (req, res) => {
  res.send("User endpoint working")
})

router
  .route('/:id')
  .get(async (req, res) => {
    const {id} = req.params

    const populateQuery = [
      {
        path: 'reviews',
        populate: { path: 'author', select: ['username'] },
      },
    ]
    try {
    const user = await User.findById(id)
      .populate(populateQuery)
      .exec()
    if (user) {
      res.json(user.toJSON())
    }
  } catch(err) {
      res.status(404).end()
    }
  })
  .put(async (req, res) => {
    const { username, email, password, profile_image, pets } = req.body
    const { id } = req.params

    const hashedpassword = await bcrypt.hash(password, 12)

    try {
      const userUpdate = await User.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          username: username, 
          email: email,
          passwordHash: hashedpassword,
          profile_image: profile_image,
          // pets: pets
        },
        {
          new: true,
          strict: false,
        }
      )

      res.json(userUpdate.toJSON())
    } catch (error) {
      res.status(404).end()
    }
  })

module.exports = router