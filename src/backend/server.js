const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const log = require("./log");
const {notFound,errorHandler} = require('./middlewares/errorMiddleware');
const appRouter = require("./router");

var cors = require('cors');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(cors()) // Use this after the variable declaration

app.use(appRouter);
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8080
app.listen(8080, function(){
  log.info("Server started on PORT:"+PORT)
});