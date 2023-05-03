
const express = require('express');

const cors = require('cors');

const { connection } = require('./Config/db');

require('dotenv').config();



const app = express();



app.use(express.json());

app.use(cors());


app.listen(process.env.Port, async (req,res)=>{

    try {

        await connection;

        console.log(`DB connected. `);

    } catch (error) {

        console.log(error);

    }

    console.log(`server is running on port ${process.env.Port}`);
    
})
