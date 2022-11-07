const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const Clarifai = require("clarifai");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const { use } = require("express/lib/application");
const logger = require("morgan");
const path = require("path");
const favicon = require("serve-favicon");

const db = knex({
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "admin",
      database: "postgres",
    },
  });


require("dotenv").config();
require("dotenv").config();






app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));


const clara = new Clarifai.App({
  apiKey: process.env.ApiKey,
});

app.use("/api", require("./routes/api/getImage"));
app.use("/api", require("./routes/api/register"));
app.use("/api", require("./routes/api/signIn"));
app.use("/api", require("./routes/api/image"));
app.use("/api", require("./routes/api/getImage"));
app.use("/api", require("./routes/api/profile"));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
