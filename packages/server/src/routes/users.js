import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User endpoint working");
});

router.get("/username/:id", async (req, res) => {
  const populateQuery = [
    {
      path: "reviews",
      populate: { path: "author", select: ["username"] },
    },
    {
      path: "reviews",
      populate: { path: "location" },
    },
    {
      path: "favorites",
    },
  ];
  try {
    const user = await User.findOne({ username: req.params.id })
      .populate(populateQuery)
      .exec();
    if (user) {
      res.json(user.toJSON());
    }
  } catch (err) {
    res.status(404).end();
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const populateQuery = [
    {
      path: "reviews",
      populate: { path: "author", select: ["username"] },
    },
    {
      path: "reviews",
      populate: { path: "location" },
    },
    {
      path: "favorites",
    },
  ];
  try {
    const user = await User.findById(id).populate(populateQuery).exec();
    if (user) {
      res.json(user.toJSON());
    }
  } catch (err) {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res) => {
  const { username, email, newPassword, oldPassword, pets } = req.body;
  const { id } = req.params;

  const thisUser = await User.findById(id);

  if (newPassword.length > 0 && oldPassword.length > 0) {
    const passwordCorrect = await bcrypt.compare(
      oldPassword,
      thisUser.passwordHash
    );

    if (!(thisUser && passwordCorrect)) {
      console.log("invalid password");
      return res.status(401).json({
        error: "invalid password",
      });
    }

    const hashedpassword = await bcrypt.hash(newPassword, 12);

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
      );
      userUpdate.save();
      res.json(userUpdate.toJSON());
    } catch (error) {
      res.status(422).json({
        error: "A user already exists with that username or email address.",
      });
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
      );
      userUpdate.save();
      res.json(userUpdate.toJSON());
    } catch (error) {
      res.status(422).json({
        error: "A user already exists with that username or email address.",
      });
      res.status(404).end();
    }
  }
});

router.all("/favorites/:id", async (request, response) => {
  const { id } = request.params;
  console.log("frog", id);
  const user = await User.findById(id);
  const { favPlace } = request.body;
  console.log(favPlace);
  if (!user) {
    return response.status(422).json({ error: "cannot find user" });
  }
  try {
    if (user.favorites.includes(favPlace)) {
      const result = await user.updateOne({
        $pull: { favorites: favPlace },
      });
      response.json(result);
    } else {
      const result = await user.updateOne({
        $push: { favorites: favPlace },
      });
      response.json(result);
    }
  } catch (error) {
    response.status(404).end();
  }
});

module.exports = router;

// router.all('/like/:postId', requireAuth, async (request, response) => {
//   const { postId } = request.params
//   const { user } = request
//   const post = await Post.findOne({ _id: postId })

//   if (!post) {
//     return response.status(422).json({ error: 'Cannot find post' })
//   }
//   try {
//     if (post.likes.includes(user.id)) {
//       const result = await post.updateOne({
//         $pull: { likes: user.id },
//       })

//       response.json(result)
//     } else {
//       const result = await post.updateOne({
//         $push: { likes: user.id },
//       })

//       response.json(result)
//     }
//   } catch (err) {
//     return response.status(422).json({ error: err })
//   }
// })
