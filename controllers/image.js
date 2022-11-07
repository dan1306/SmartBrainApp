const User = require("../models/user");

module.exports = {
  image,
};

async function image(req, res) {
  const { id } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      user.entries = (await user.entries) + 1;
      await user.save();
      res.json(user.entries);
    }
  } catch (err) {
    res.status(400).json("unable to increment");
  }

}
