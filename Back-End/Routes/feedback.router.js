const express = require("express");
const { feedmodel } = require("../Models/feedback.model");

const feedbackRouter = express.Router();
feedbackRouter.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     feedSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /feed/savefeedback:
 *  post:
 *      summary: To add a new feedback to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/feedSchema'
 *      responses:
 *          200:
 *              description: feedback added successfull we will contact you soon
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/feedSchema'
 *          500:
 *              description: Some server error
 */
feedbackRouter.post("/savefeedback", async (req, res) => {
  console.log(req.body);
  try {
    const newQuery = new feedmodel(req.body);
    await newQuery.save();

    console.log(newQuery);
    res.send({ok:true});
  } catch (err) {
    console.log(err);
    res.send({ mes: err.message });
  }
});

/**
 * @swagger
 *   /feed/getdata:
 *   get:
 *     summary: This route will show all the feedback 
 *     tags: [get]
 *     responses:
 *       200:
 *         description: vefified the mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/feedSchema'
 */
feedbackRouter.get("/getdata",async(req,res)=>{
  try {
    let feedback=await feedmodel.find()
    res.status(200).send({"msg":feedback})
  } catch (error) {
    res.send(error)
  }
})

module.exports = { feedbackRouter };