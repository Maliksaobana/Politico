require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors')
const authroute = require("./routers/authroute.js")
const partyroute = require("./routers/partyroute.js")
const officeroute = require("./routers/officeroute.js")
const officeRegisterRoute = require("./routers/registerRoute.js")
const voteFair = require("./routers/voteroute.js")
const petition = require("./routers/petitionroute.js")
const winner = require("./routers/winnerroute.js")
const path = require('path');
const connectDB = require('./db/db.js');
const port = process.env.PORT || 5080;

const method = ['GET','POST','PATCH','PUT','DELETE'];

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
app.use('/api/v1/party', partyroute) // use route for party data
app.use('/api/v1/office',officeroute) // use route for office data
app.use('/api/v1/office/register',officeRegisterRoute) // use route for office candidate registeration
app.use('/api/v1/vote',voteFair) // use route for voting in election
app.use('/api/v1/petition',petition) // use route for making petition in election
app.use('/api/v1/winner',winner) // use route for knowing winners of an election 


app.listen(port, () => {
  console.log(`Running`);
});