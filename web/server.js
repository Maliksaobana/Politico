require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors')
const authroute = require("./routers/authroute.js")
const partyroute = require("./routers/partyroute.js")
const path = require('path');
const page = require('./page.js')
const connectDB = require('./db/db.js');
const port = process.env.PORT || 5080;

const method = ['GET','POST','PATCH','PUT','DELETE'];

// Url path and appropriate file path

app.use(express.static(path.join(__dirname,"UI")))

app.use("/",page)



// connect Database

connectDB()



// middleware base
app.use(
  cors({
    origin: '*',
    methods: method,
    allowedHeaders: ['Content-Type','Authorization']

  })
)

app.use(express.json())

// route link/page


app.use('/api/v1/auth', authroute) // use route for authentication
app.use('/party', partyroute) // use route for party data


app.listen(port, () => {
  console.log(`Developing on port ${port}`);
});