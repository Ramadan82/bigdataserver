const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const authroutes = require("./src/routes/authroutes");
const serviceroutes = require("./src/routes/serviceroutes");

const app = express();
const uri = process.env.DB_URI;

mongoose.connect(uri).then(() => {
  app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`server listening on port ${port}`);
  });
});
app.use(express.json());
app.use("/user", authroutes);
app.use("/services", serviceroutes);
