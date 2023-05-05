const express = require("express");
const Redis = require("ioredis");
require("dotenv").config()

const app = express();

require("dotenv").config()
const configuration={
    host:process.env.redisurl,
    port:19701,
    username:"default",
    password: process.env.redispassword


}
const redisclient=new Redis(configuration)
app.use(express.json());

module.exports={
    redisclient
}