const bcrypt = require("bcrypt"); // import bcrypt
const User = require("../models/user");

module.exports = {
  register,
};

async function register(req, res) {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form inputs");
  }

  try {
    const hash = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const user = await User.create({
      name: name,
      email: email,
      hash: hash,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json("unable to register");
  }
}
