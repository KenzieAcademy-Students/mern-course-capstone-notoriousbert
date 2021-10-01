import express from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'


const router = express.Router()

router.get('/', (req, res) => {
  res.send("User endpoint working")
})

  router.get('/username/:id', async (req, res) => {

    const populateQuery = [
      {
        path: 'reviews',
        populate: { path: 'author', select: ['username'] },
      },
      {
        path: 'reviews',
        populate: { path: 'location' },
      },
      {
        path: 'favorites'
      },
    ]
    try {
      const user = await User.findOne({ username: req.params.id})
        .populate(populateQuery)
        .exec()
      if (user) {
        res.json(user.toJSON())
      }
    } catch (err) {
      res.status(404).end()
    }
  })

  router.get('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params)

    const populateQuery = [
      {
        path: 'reviews',
        populate: { path: 'author', select: ['username'] },
      },
      {
        path: 'reviews',
        populate: { path: 'location' },
      },
      {
        path: 'favorites'
      },
    ]
    try {
      const user = await User.findById(id)
        .populate(populateQuery)
        .exec()
      if (user) {
        res.json(user.toJSON())
      }
    } catch (err) {
      res.status(404).end()
    }
  })

  router.put('/:id', async (req, res) => {
    const { username, email, newPassword, oldPassword, pets } = req.body
    const { id } = req.params

    console.log(id, username, email)
    console.log("oldPassword", oldPassword)
    console.log("newPassword", newPassword)

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
    } else {
      try {
        const userUpdate = await User.findByIdAndUpdate(
          id,
          {
            username: username,
            email: email,
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