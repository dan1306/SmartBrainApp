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
  register,
};

async function register(req, res) {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form inputs");
  }

  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        hash,
        email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          })
          .then(trx.commit)
          .catch(trx.rollback)

          .catch((err) => {
            res.status(400).json("unable to join");
          });
      });
  }).catch((err) => res.status(400).json("unable to register"));
}
