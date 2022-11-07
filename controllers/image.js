const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  },
});


module.exports = {
    image,
  };
  

function image(req, res){
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        console.log(entries[0].entries);
        res.json(entries[0].entries);
      })
      .catch((err) => {
        res.status(400).json("unable to increment");
      });
  }