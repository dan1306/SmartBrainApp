const knex = require("knex");

const bcrypt = require("bcrypt-nodejs");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
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
  }).catch((err) => {
    // console.log()
    res.status(400).json(process.env.DATABASE_URL)
  });
}
