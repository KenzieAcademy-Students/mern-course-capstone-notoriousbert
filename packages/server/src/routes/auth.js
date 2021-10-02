import express from "express";
import { User } from '../models'
import keys from '../config/keys'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router();

router.get('/', (req, res) => {
  res.send('auth endpoint')
})

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body

  if (!password || !username || !email) {
    return res.status(422).json({ error: 'please add all the fields' })
  }

  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({error: 'password must be between 8 and 20 characters.'})
  }

  User.findOne({ email: email}).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: 'A user already exists with that email address.' })
    }
  })

  User.findOne({ username: username })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'A user already exists with that name.' })
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          username,
          email,
          passwordHash: hashedpassword,
          email: email,
        })

        user
          .save()
          .then((user) => {
            res.json({ message: 'saved successfully' })
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(422).json({ error: "missing username  or password" })
    }
  
    const user = await User.findOne({ username: username })
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, keys.jwt.secret)
    res
      .status(200)
      .send({ token, username, uid: user.id })
  })

module.exports = router;
