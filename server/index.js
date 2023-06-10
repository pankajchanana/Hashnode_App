const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");


const PORT=8000;

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

app.use("/test", (req, res) => {
    res.send("Hello world!");
  });
  
  const searchData=require('./controller/searchEngine')
  
  app.use("/search", searchData);

app.listen(PORT,()=>{
    console.log(`PORT running on ${PORT}`)
});

