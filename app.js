const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//connexion to database

mongoose.connect('mongodb://127.0.0.1:27017/Forum').then((x) => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
})
.catch((err) => {
  console.error('Error connecting to mongo', err.reason)
})
;
const app = express();

app.use(cors())

// Serve static resources
app.use('/public', express.static('public'))

// Define PORT
//changement de port pour tester
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Connected to port ' + port)
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
  });



// Import Routes
const userRoutes = require('../backend/routes/user_route')
const quesRoute = require('./routes/question_route')
const resRoute = require('./routes/response_route')

app.use("/users", userRoutes);
app.use("/question",quesRoute);
app.use("/response", resRoute);

module.exports = app;
