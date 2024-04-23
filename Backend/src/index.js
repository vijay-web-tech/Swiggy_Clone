const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");

// mongoDB url
// localhost db url : mongodb://127.0.0.1:27017/swiggy
// Cloud mongo db url :mongodb+srv://vijay:6sjTb$a5V6FDUf@cluster0.1eltbr1.mongodb.net/swiggy
const mongoString = "mongodb+srv://vijay:6sjTb$a5V6FDUf@cluster0.1eltbr1.mongodb.net/swiggy";


const corsOpts = {
  origin: '*',
  //domain : * means for all

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};



// router files
const locationRouter = require('./routes/location');
const restaurentRouter = require('./routes/restaurents');
const mealtypeRouter = require('./routes/mealtypes');


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log('database not connected',error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.use(cors(corsOpts));

app.use('/api/location', locationRouter)
app.use('/api/restaurent', restaurentRouter)
app.use('/api/mealtype', mealtypeRouter)


app.use((req, res, next) => {
  res.status(404).send({ "status": 404, "message": "API URL Not Found", "error": true });
});

app.listen(3002, () => {
  console.log(`Server Started at ${3002}`)
})