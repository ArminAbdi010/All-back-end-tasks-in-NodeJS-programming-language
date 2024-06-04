const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const router=require("./router/routeCUD")
require("dotenv").config();

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);


const port = process.env.PORT || 8080;

app.listen(port, (e) => {
  if (e) {
    console.log(e.message);
  } else {
    console.log(`listening on port ${port}`);
  }
});
