const express = require("express");
const { querymodel } = require("../Models/chatbot.model");
const queryRouter = express.Router();
queryRouter.use(express.json());
queryRouter.post("/savedata", async (req, res) => {
  try {
    const newQuery = new querymodel(req.body);
    await newQuery.save();
    res.send({ok:true});
  } catch (err) {
    res.send({ mes: err.message });
  }
});

module.exports = { queryRouter };