const express = require("express");
const Redis = require("ioredis");

const app = express();

require("dotenv").config()
const configuration={
    host:process.env.redisurl,
    port:19701,
    username:"default",
    password: process.env.redispassword


}
const client=new Redis(configuration)
app.use(express.json());

module.exports={
    client
}