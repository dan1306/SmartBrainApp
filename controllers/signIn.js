const bcrypt = require("bcrypt"); // import bcrypt
const User = require("../models/user");

module.exports = {
  signIn,
};

async function signIn(req, res) {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form inputs");
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);

    const valid = await bcrypt.compare(req.body.password, user.hash);

    if (valid) {
      res.status(200).json(user);
    } else {
      res.status(400).json("wrong credentials");
    }
  } catch (err) {
    console.log(err);
  }

}
