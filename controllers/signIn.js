const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");

const db = knex({
    client: "pg",
    connection: {
      host: "postgresql-trapezoidal-11938",
      user: "postgres",
      password: "",
      database: "postgres",
    },
});
  
module.exports = {
    signIn,
  };

async function signIn(req, res) {
  console.log("donda", req.body)
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form inputs");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      console.log(data);
      const valid = bcrypt.compareSync(req.body.password, data[0].hash);

      if (valid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
}
