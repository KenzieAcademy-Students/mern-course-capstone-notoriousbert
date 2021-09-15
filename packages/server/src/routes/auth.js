import express from "express";
const router = express.Router();


router.route('/').get((req, res, next) => {
  res.send('auth endpoint')
})

router.post('/signup', async (req, res) => {
  const { username, password, profile_image } = req.body

  if (!password || !username) {
    return res.status(422).json({ error: 'please add all the fields' })
  }

  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({error: ' password must be between 8 and 20 characters.'})
  }

  User.findOne({ username: username })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'user already exists with that name' })
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          username,
          passwordHash: hashedpassword,
          profile_image: profile_image,
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

module.exports = router;
