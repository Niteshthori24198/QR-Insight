const express = require("express");
const { feedmodel } = require("../Models/feedback.medel");
const feedbackRouter = express.Router();
feedbackRouter.use(express.json());
feedbackRouter.post("/savefeedback", async (req, res) => {
  try {
    const newQuery = new feedmodel(req.body);
    await newQuery.save();
    res.send({ok:true});
  } catch (err) {
    res.send({ mes: err.message });
  }
});

module.exports = { feedbackRouter };