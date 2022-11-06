const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Clarifai = require("clarifai");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const { use } = require("express/lib/application");

require("dotenv").config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "admin",
    database: "postgres",
  },
});

app.use(bodyParser.json());
app.use(cors());

const clara = new Clarifai.App({
  apiKey: process.env.ApiKey,
});

app.post("/getImage", async (req, res) => {
  const { imageUrl } = req.body;
  console.log("DANIEL", imageUrl);

  try {
    console.log(process.env.ApiKey);
    const resp = await clara.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      imageUrl
    );
    console.log("respppp", resp.outputs[0].data.regions);

    res.json(resp);
  } catch (err) {
    console.log(err);
  }
});

app.post("/register", (req, res) => {
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
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({
      id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch((err) => {
      res.status(400).json("error getting user");
    });
});

app.post("/signin", (req, res) => {
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
});

app.put("/image", (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
