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

    const populateQuery = [
      {
        path: 'reviews',
        populate: { path: 'author', select: ['username'] },
        // populate: { path: 'location',},
      },
      // {
      //   path: 'reviews',

      //   populate: {
      //     path: 'location',
      //     populate: {
      //       path: 'place'
      //     }
      //   },
      //   // populate: { path: 'location',},
      // },
    ]
    try {
      const user = await User.findOne({ username: req.params.id })
        .populate(populateQuery)
        .exec()
      if (user) {
        res.json(user.toJSON())
      }
    } catch (err) {
      res.status(404).end()
    }
  })
  .put(async (req, res) => {
    const { username, email, newPassword, oldPassword, pets } = req.body
    const { id } = req.params

    console.log(id, username, email)

    const thisUser = await User.findById(id);

    console.log(thisUser)

    if (newPassword.length > 0 && oldPassword.length > 0) {
      const passwordCorrect = await bcrypt.compare(
        oldPassword,
        thisUser.passwordHash
      )

      const hashedpasswordold = await bcrypt.hash(oldPassword, 12)
      console.log("frog", hashedpasswordold)

      if (!(thisUser && passwordCorrect)) {
        console.log("invalid password");
        return res.status(401).json({
          error: "invalid password",
        });
      }

      const hashedpassword = await bcrypt.hash(newPassword, 12)

      try {
        const userUpdate = await User.findByIdAndUpdate(
          id,
          {
            username: username,
            email: email,
            passwordHash: hashedpassword,
            // pets: pets
          },
          {
            new: true,
            strict: false,
          }
        )
        userUpdate.save()
        res.json(userUpdate.toJSON())
      } catch (error) {
        res.status(404).end()
      }
    }
  })

module.exports = router