const Clarifai = require("clarifai");
const clara = new Clarifai.App({
  apiKey: process.env.ApiKey,
});

module.exports = {
  getImage,
};

async function getImage(req, res) {
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
}
